import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokerConsumerModule } from './broker-consumer/broker-consumer.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [BrokerConsumerModule, LedgerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
