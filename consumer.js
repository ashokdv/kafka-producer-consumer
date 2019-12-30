var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;
const client = new Client({
    autoConnect: true,
    KafkaHost: 'localhost:9092'
});
var consumer = new Consumer(client,
    [{ topic: 'Posts', offset: 0}],
    {
        autoCommit: true
    }
);
client.on('ready', function() {
    console.log('consumer is ready');
})


consumer.on('message', function (message) {
    // console.log('Hi --> going to this ');
    console.log(message);
});

consumer.on('error', function (err) {
    console.log('Error:',err);
});

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
});