var amqp = require("amqplib/callback_api");

const host = process.env.RABBITMQ_HOST;
const port = process.env.RABBITMQ_PORT;
const rabbitUrl = `amqp://${host}:${port}`;

amqp.connect(rabbitUrl, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "hello";
    var msg = "Hello world";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
