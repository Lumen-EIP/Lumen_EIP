import {  Injectable } from '@nestjs/common';
import {EventsRegistry} from '@common/schemas'
import { BaseEventSchema } from '../../../../packages/common/schemas/src/events/baseEvent';
import { IdentityEvents } from '../../../../packages/common/schemas/src/events/identity/main';

@Injectable()
export class HttpIngestService {
  constructor() {}

  async ProcessEvent(data: unknown): Promise<any> {
    const {domain,eventName} = BaseEventSchema.parse(data);


    if(!eventName || domain !== 'IDENTITY'){
      throw new Error("Event Name is not a valid Identity Event");
    }
    const eventSchema = EventsRegistry.IdentityEvents[eventName as keyof typeof IdentityEvents]

    if(!eventSchema){
      throw new Error("No schema found for the given event Name")
    }

    const parsedEvent = eventSchema.parse(data);

    console.log("//parsing event : " , parsedEvent);

  }
}