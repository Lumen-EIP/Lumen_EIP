import { Controller, Post, Body } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';

@Controller('http-ingest')
export class HttpIngestController {
  constructor(private readonly httpIngestService: HttpIngestService) {}

  @Post('/event')
  async ingestData(@Body() data : any) : Promise<any>{
    console.log("Data : " , data);
    return {"Received ": data, "status" : "Success"};
  }
}
