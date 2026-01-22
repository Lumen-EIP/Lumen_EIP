import { Controller, Post, Body, BadRequestException, HttpStatus } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';

@Controller('http-ingest')
export class HttpIngestController {
  constructor(private readonly httpIngestService: HttpIngestService) {}

  @Post('/user-event/created')
  async ingestData(@Body() data: unknown): Promise<any> {
    try {
      await this.httpIngestService.ProcessEvent(data);
      return { message : 'Event Data Received' , status : HttpStatus.OK}
    } catch (error) {
      throw new BadRequestException("Error " , error.message)
    }
  }
}
