import type { DomainEvent, EventBus } from "../../types/event-bus.interface";
import { connectToAQMP, connectToAQMPConfirmChannel } from "../config/amqp";
import { EXCHANGE_NAME, EXCHANGE_TYPE } from "../constants/amqp";



export class AMQPEventBusAdapter implements EventBus {
    publish = async (event: DomainEvent) => {
        const channel = await connectToAQMP();

        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

        //for now usin a lightweight routing key
        const routingKey = `${event.domain}.${event.name}`;

        channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(event)))

        console.log('Event published to AMQP : ');
    }

    safePublish = async (event: DomainEvent): Promise<void> => {
        const channel = await connectToAQMPConfirmChannel();
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        const routingKey = `${event.domain}.${event.name}`



        const payload = Buffer.from(JSON.stringify(event))
        return new Promise((resolve, reject) => {
            try {
                channel.publish(
                    EXCHANGE_NAME,
                    routingKey,
                    payload,
                    {
                        persistent: true,
                        //mandatory : true
                    },
                    (err, ok) => {
                        if (err) {
                            console.log('NACK RECEIVED')
                            return reject(new Error(err.message))
                        }
                        console.log("ACK received from Broker server for event")
                        resolve()
                    }
                )
            }
            catch (err) {
                reject(new Error("failed to publish event to AMQP"))
            }
        })
    }

    publishBatch = async (events: DomainEvent[]) => {
        const channel = await connectToAQMP();

        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

        for (const event of events) {
            const routingKey = `${event.domain}.${event.name}`;
            channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(event)))
        }
    };
}

