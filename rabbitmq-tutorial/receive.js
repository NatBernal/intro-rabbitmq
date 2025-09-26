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

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
