import type { DomainEvent, EventBus } from "../../types/event-bus.interface";
import { connectToAQMP } from "../config/amqp";
import { EXCHANGE_NAME, EXCHANGE_TYPE } from "../constants/amqp";



export class AMQPEventBusAdapter implements EventBus{
    publish = async(event : DomainEvent) =>{
        const channel = await connectToAQMP();

        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

        //for now usin a lightweight routing key
        const routingKey = `${event.domain}_${event.name}`;

        channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(event)))

        console.log('Event published to AMQP : ');
    }

    publishBatch = async(events : DomainEvent[]) =>{
        const channel  = await connectToAQMP();

        await channel.assertExchange(EXCHANGE_TYPE, EXCHANGE_TYPE);

        for(const event of events){
            const routingKey = `${event.domain}_${event.name}`;
            channel.publish(EXCHANGE_TYPE, routingKey, Buffer.from(JSON.stringify(event)))
        }
    };
}

