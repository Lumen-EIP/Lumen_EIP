import { Module } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';
import { HttpIngestController } from './http-ingest.controller';

@Module({
  controllers: [HttpIngestController],
  providers: [HttpIngestService],
})
export class HttpIngestModule {}
