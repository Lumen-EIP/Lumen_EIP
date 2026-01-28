import { Controller, Post, Body, BadRequestException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';
import { createEventValidatorPipe } from 'src/pipes/EventValidator';

@Controller('http-ingest')
export class HttpIngestController {
  constructor(private readonly httpIngestService: HttpIngestService) {}

  @Post('/events/identity')
  async ingestIdentityEvents(@Body(createEventValidatorPipe('IdentityEvents')) data: unknown): Promise<any> {
    try {
      await this.httpIngestService.ProcessEvent(data);
      return { message : 'Event Data Received' , status : HttpStatus.OK}
    } catch (error) {
      throw new InternalServerErrorException("Error " , error.message)
    }
  }
}
