import { Controller, Post, Body, BadRequestException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';
import { createEventValidatorPipe } from 'src/pipes/EventValidator';

@Controller('http-ingest')
export class HttpIngestController {
  constructor(private readonly httpIngestService: HttpIngestService) {}

  @Post('/events/identity')
  async ingestIdentityEvents(@Body(createEventValidatorPipe('IdentityEvents')) data: unknown): Promise<any> {
    try {
      await this.httpIngestService.processIdentityEvent(data);
      return { message : 'Event Data Received' , status : HttpStatus.OK}
    } catch (error) {
      throw new InternalServerErrorException("Error " , error.message)
    }
  }

  @Post('/events/auth')
  async ingestAuthEvents(@Body(createEventValidatorPipe('AuthEvents')) data : unknown) : Promise<any>{

    try {
      await this.httpIngestService.processAuthEvents(data);
      return { message : 'Event Data Received' , status : HttpStatus.OK}
    } catch (error) {
      throw new InternalServerErrorException("Error " , error.message)
    }

  }

  @Post('/events/biling')
  async ingestBilingEvents(@Body(createEventValidatorPipe('BilingEvents')) data : unknown) : Promise<any>{

    try {
      await this.httpIngestService.processBilingEvents(data);
      return { message : 'Event Data Received' , status : HttpStatus.OK}
    } catch (error) {
      throw new InternalServerErrorException("Error " , error.message)
    }

  }
}
