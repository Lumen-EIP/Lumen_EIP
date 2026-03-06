import { Queue} from "bullmq";
import { QUEUESDOMAINs } from "../constants/domains";
import type { DomainEvent, EventBus } from "../../types/event-bus.interface";
import { redisConnection } from "../config/redis";



export class EventBusAdapter implements EventBus {
    private queue: Queue<DomainEvent>


    constructor() {
        this.queue = new Queue<DomainEvent>(
            QUEUESDOMAINs.AUTH,
            {
                connection: redisConnection
            }
        )
    }

    publish = async (event: DomainEvent) => {
        try {

            await this.queue.add(event.name, event);
            console.log("Event published to bus : ", event)
            return {message : "Successfull Event Bus write", success : true};
        } catch (error) {
            console.log(error);
            throw new Error("Internal Event Bus Error")
        }
    }

    publishBatch = async (events: DomainEvent[]) => {
        const jobs = events.map((event) => {
            return{
                name : event.name,
                data: event
            }
        })

        try {
            await this.queue.addBulk(jobs);
            return {message : "Successfull Batch Event Bus write", success : true};
        } catch (error) {
            console.log(error);
            throw new Error("Internal Event Bus Error")
        }
    };
}
