import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpIngestModule } from './http-ingest/http-ingest.module';
import { EventBusModule } from './event-bus/event-bus.module';


@Module({
  imports: [HttpIngestModule, EventBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
