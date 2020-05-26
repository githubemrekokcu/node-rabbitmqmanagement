const amqp = require("amqplib");

connectRabbit();

async function connectRabbit(){
    try {
        const connectionRabbit = await amqp.connect("amqp://localhost:5672");
        const channel = await connectionRabbit.createChannel();
        await channel.assertQueue("messageQueue");

        channel.consume("messageQueue",message => {
            console.log("Readed Message",message.content.toString());
            channel.ack(message);
        });
    } catch (error) {
        console.error("Error", error);
    }
}