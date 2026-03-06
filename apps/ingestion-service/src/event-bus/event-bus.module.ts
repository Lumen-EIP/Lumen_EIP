import { Module } from '@nestjs/common';
import {EventBusAdapter} from '@common/event-broker'
import type {EventBus} from '@common/event-broker'
import { EVENT_BUS } from 'src/constants/event-bus.token';

@Module({
    providers: [{
        provide : EVENT_BUS,
        useFactory : () : EventBus => {
            return new EventBusAdapter()
        }
    }],
    exports : [EVENT_BUS]
})
export class EventBusModule {}
