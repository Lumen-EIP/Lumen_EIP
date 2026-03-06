import { Worker } from "bullmq";
import type { DomainEvent } from "../../types/event-bus.interface";
import { QUEUESDOMAINs } from "../constants/domains";
import { redisConnection } from "../config/redis";



export class WorkerAdapter{
    private worker : Worker

    constructor(eventHandler : (event : DomainEvent) => Promise<any>){
        this.worker = new Worker(
            QUEUESDOMAINs.AUTH,
            async(job)=>{
                const event = job.data as DomainEvent;
                await eventHandler(event)
            },
            {
                connection : redisConnection
            }
        )
    }
}