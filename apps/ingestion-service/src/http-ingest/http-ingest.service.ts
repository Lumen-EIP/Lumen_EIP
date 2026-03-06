import type { EventBus} from '@common/event-broker';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EVENT_BUS } from 'src/constants/event-bus.token';
import { DomainEvent } from '../../../../packages/common/event-broker/types/event-bus.interface';

@Injectable()
export class HttpIngestService {
  constructor(
    @Inject(EVENT_BUS) private readonly authEventBus : EventBus
  ) {}

  async processIdentityEvent(data: any): Promise<any> {
    console.log('//parsing event : ', data);
  }

  async processAuthEvents(data: any): Promise<any> {
    console.log('Processing Auth Event : ', data);
    try {
      const authEventPayload : DomainEvent = {
        name : data.eventName,
        id : crypto.randomUUID(),
        domain : 'AuthEvents',
        payload : data.data,
        timestamp : Date.now()
      } 

      await this.authEventBus.publish(authEventPayload)
      
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message)
    }
  }

  async processBilingEvents(data: any): Promise<any> {
    console.log('Processing Biling Event : ', data);
  }
}
