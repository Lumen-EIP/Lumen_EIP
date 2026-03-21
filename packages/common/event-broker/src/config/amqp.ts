import { connect, type Channel, type ChannelModel, type ConfirmChannel } from 'amqplib'
import { amqpDomain } from '../constants/amqp';

let channel: Channel;
let connection: ChannelModel;
let confirmChannel: ConfirmChannel

export const connectToAQMP = async () => {
    try {
        if (!connection) {
            connection = await connect(amqpDomain);
        }

        if (!channel) {
            channel = await connection.createChannel();
        }

        console.log("Connected to AMQP server");
        return channel;
    } catch (err) {
        throw new Error("Error connecting to AMQP server")
    }
}

export const connectToAQMPConfirmChannel = async () => {
    try {
        if (!connection) {
            connection = await connect(amqpDomain);
        }

        if (!confirmChannel) {
            confirmChannel = await connection.createConfirmChannel();
        }

        console.log("Connected to AMQP server with confirm channel");
        return confirmChannel;
    } catch (err) {
        throw new Error("Error connecting to AMQP server : ");
    }
}

