import {connect, type Channel, type ChannelModel} from 'amqplib'
import { amqpDomain } from '../constants/amqp';

let channel : Channel;
let connection : ChannelModel;

export const connectToAQMP = async()=>{
    if(!connection) {
        connection = await connect(amqpDomain);
    }

    if(!channel){
        channel = await connection.createChannel();
    }

    console.log("Connected to AMQP server");
    return channel;
}

