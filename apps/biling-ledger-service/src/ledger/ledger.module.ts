import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { BrokerConsumerModule } from 'src/broker-consumer/broker-consumer.module';

@Module({
  imports: [BrokerConsumerModule],
  providers: [LedgerService],
})
export class LedgerModule {}
