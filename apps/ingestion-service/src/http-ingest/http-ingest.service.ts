import {  Injectable } from '@nestjs/common';
import {EventsRegistry} from '@common/schemas'

@Injectable()
export class HttpIngestService {
  constructor() {}

  async ProcessEvent(data: unknown): Promise<any> {
    const parsedEvent  = EventsRegistry.UserCreated.parse(data)
    console.log('Processsing Event .... :', parsedEvent);
  }
}
