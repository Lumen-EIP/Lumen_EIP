import { Module } from '@nestjs/common';
import {AMQPEventBusAdapter} from '@common/event-broker'
import type {EventBus} from '@common/event-broker'
import { EVENT_BUS } from 'src/constants/event-bus.token';

@Module({
    providers: [{
        provide : EVENT_BUS,
        useFactory : () : EventBus => {
            return new AMQPEventBusAdapter()
        }
    }],
    exports : [EVENT_BUS]
})
export class EventBusModule {}
