import { AMQPBrokerConsumerAdapter } from '@common/event-broker';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { loggingConsumer, loggingConsumerBindingKey } from 'src/constants/consumer';
import { DomainEvent } from '../../../../packages/common/event-broker/types/event-bus.interface';

@Injectable()
export class LedgerService implements OnModuleInit, OnModuleDestroy{
    private readonly logger = new Logger(LedgerService.name)
    private readonly processedEvents = new Set<string>();  // in memory map for idempotency
    constructor(
        @Inject(loggingConsumer) private readonly LoggingConsumer : AMQPBrokerConsumerAdapter,
    ){}

    async onModuleInit() {
        this.LoggingConsumer.subscribe(loggingConsumerBindingKey, this.bilingEventHandler);

        await this.LoggingConsumer.start();
        this.logger.log("Ledger Service started and subscribed to Logging Events")

    }

    async onModuleDestroy() {
        await this.LoggingConsumer.stop();
        this.logger.log("Ledger Service gracefull shut down")
    }

    bilingEventHandler = async(event : DomainEvent)=>{
        //handle printing event
        const id = event.id;
        if(this.processedEvents.has(id)){
            this.logger.warn(`Event with id ${id} has already been processed. Skipping.`);
            return;
        } 


        // //stimulating failure
        // if(event.payload.amount < 100.0){
        //     throw new Error("Amount cannot be processed")
        // }


        try {
            console.info("Received event for billing ledger:", event);
            // process it
            this.processedEvents.add(id)
        } catch (error) {
            throw new Error(error)
        }

        
    }

}


