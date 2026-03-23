import type { Channel } from "amqplib";
import type { EventBrokerConsumer, EventHandler } from "../../types/event-bus.interface";
import { connectToAQMP } from "../config/amqp";
import { EXCHANGE_NAME, EXCHANGE_TYPE } from "../constants/amqp";

export class AMQPBrokerConsumerAdapter implements EventBrokerConsumer {
    private channel!: Channel;
    private HandlerMap: Map<string, EventHandler>;
    private queueName: string;

    constructor(queueName: string) {
        this.queueName = queueName;
        this.HandlerMap = new Map<string, EventHandler>();
    }




    init = async () => {
        this.channel = await connectToAQMP();
        await this.channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    }

    subscribe = (key: string, handler: EventHandler) => {
        this.HandlerMap.set(key, handler)
    };

    start = async () => {

        const q = await this.channel.assertQueue(this.queueName);

        for (const bindingKey of this.HandlerMap.keys()) {
            await this.channel.bindQueue(q.queue, EXCHANGE_NAME, bindingKey);
        }

        this.channel.consume(q.queue, async (event) => {
            if (!event) return;
            try {
                const eventData = JSON.parse(event.content.toString());
                const handler = this.getHandlerFromRoutingKKey(event.fields.routingKey)
                if (handler) {
                    await handler(eventData);
                }

                this.channel.ack(event)
            } catch (error) {
                console.log("error processing event", error);
                this.channel.nack(event, false, true);
            }
        })

    }

    getHandlerFromRoutingKKey = (routingKey: string): EventHandler | undefined => {
        //macth routing key to wildcaddrd key of Map
        const bindingKeys = Array.from(this.HandlerMap.keys());

        const matchedKey = bindingKeys.find(key => {
            const pattern = key
                .replace(/\./g, "\\.") // Escape dots
                .replace(/\*/g, "[^.]+") // * matches one word
                .replace(/#/g, ".*"); // # matches zero or more words
            return new RegExp(`^${pattern}$`).test(routingKey);
        })

        if(matchedKey) return this.HandlerMap.get(matchedKey);

        return undefined;


    }

    stop = async () => {
        await this.channel.close();
    }




}
