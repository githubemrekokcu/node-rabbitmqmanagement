const amqp = require("amqplib");
const message = {
    description: "Test Message..."
}
connectRabbit();

async function connectRabbit(){
    try {
        const connectionRabbit = await amqp.connect("amqp://localhost:5672");
        const channel = await connectionRabbit.createChannel();
        await channel.assertQueue("messageQueue");

        channel.sendToQueue("messageQueue",Buffer.from(JSON.stringify(message)));
        console.log("Sended Message",message);
    } catch (error) {
        console.error("Error", error);
    }
}