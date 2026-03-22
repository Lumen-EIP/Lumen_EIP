import type { EventBus} from '@common/event-broker';
import type{BaseEventType, EventRegistryType} from '@common/schemas'
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EVENT_BUS } from 'src/constants/event-bus.token';
import { DomainEvent } from '../../../../packages/common/event-broker/types/event-bus.interface';

@Injectable()
export class HttpIngestService {
  constructor(
    @Inject(EVENT_BUS) private readonly HTTPEventBus : EventBus
  ) {}

  private domainEventMapper<T extends BaseEventType>(rawevent : T) : DomainEvent<typeof rawevent.data>{
    return {
      name : rawevent.eventName,
      id : rawevent.eventId,
      domain : rawevent.domain,
      payload : rawevent.data,
      timestamp : Date.now(),
    }
  }
 
  async processIdentityEvent(data: EventRegistryType['IdentityEvents']): Promise<any> {
    console.log('Processing Identity event : ', data);
    try {
      const identityEventPayload = this.domainEventMapper<EventRegistryType['IdentityEvents']>(data)
      await this.HTTPEventBus.safePublish(identityEventPayload)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async processAuthEvents(data: EventRegistryType['AuthEvents']): Promise<any> {
    console.log('Processing Auth Event : ', data);
    try {
      
      const authEventPayload = this.domainEventMapper<EventRegistryType['AuthEvents']>(data);
      console.log(authEventPayload.payload)

      await this.HTTPEventBus.safePublish(authEventPayload)
      
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message)
    }
  }

  async processBilingEvents(data: EventRegistryType['BilingEvents']): Promise<any> {
    console.log('Processing Biling Event : ', data);
    try {
      const bilingEventPayload = this.domainEventMapper<EventRegistryType['BilingEvents']>(data);
      await this.HTTPEventBus.safePublish(bilingEventPayload);
    } catch (error) {
      throw new InternalServerErrorException(error.message)
      
    }

  }
}
