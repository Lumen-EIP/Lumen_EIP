import { Module } from '@nestjs/common';
import { loggingConsumerQueue, loggingConsumer } from 'src/constants/consumer';
import {AMQPBrokerConsumerAdapter} from '@common/event-broker'

@Module({
    providers:[
        {
            provide : loggingConsumer,
            useFactory : async() => {
                const amqpCosumerAdapter = new AMQPBrokerConsumerAdapter(loggingConsumerQueue);
                await amqpCosumerAdapter.init();
                return amqpCosumerAdapter;
            }
        }
    ],
    exports:[loggingConsumer]
})
export class BrokerConsumerModule {}
