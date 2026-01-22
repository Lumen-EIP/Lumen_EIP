import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpIngestModule } from './http-ingest/http-ingest.module';

@Module({
  imports: [HttpIngestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
