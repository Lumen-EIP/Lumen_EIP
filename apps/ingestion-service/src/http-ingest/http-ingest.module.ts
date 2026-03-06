import { Module } from '@nestjs/common';
import { HttpIngestService } from './http-ingest.service';
import { HttpIngestController } from './http-ingest.controller';
import { EventBusModule } from 'src/event-bus/event-bus.module';

@Module({
  imports: [EventBusModule],
  controllers: [HttpIngestController],
  providers: [HttpIngestService],
})
export class HttpIngestModule {}
