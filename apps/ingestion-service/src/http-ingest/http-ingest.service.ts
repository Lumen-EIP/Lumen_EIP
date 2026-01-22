import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserCreatedEventSchema, UserCreatedEventType } from '@common/schemas';

@Injectable()
export class HttpIngestService {
  constructor() {}

  async ProcessEvent(data: unknown): Promise<any> {
    const parsedEvent  = UserCreatedEventSchema.parse(data) as UserCreatedEventType;
    if (!parsedEvent) {
      throw new Error('Invalid event data')
    }

    console.log('Processsing Event .... :', parsedEvent);
  }
}
