var express = require('express');
var kafka = require('kafka-node');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const connectToKafka = function () {
    client = new kafka.KafkaClient({
      kafkaHost: 'localhost:9092',
      connectTimeout: 1000,
      requestTimeout: 1000,
      autoConnect: true,
      reconnectOnIdle: true,
      idleConnection: 10000,
      connectRetryOptions: {
          retries: 5,
          factor: 0,
          minTimeout: 1000,
          maxTimeout: 1000,
          randomize: true
        }
  });
  
  producer = new kafka.HighLevelProducer(client);

  client.on('ready', function () {
        console.log('Client ready');
  });
};

connectToKafka();

producer.on('ready', function () {
    console.log('Producer Ready ')
});

producer.on('error', function (err) {
    console.log('error in producer',err);
});




app.get('/',function(req,res){
    res.json({greeting:'Kafka Producer'})
});

app.listen(5001,function(){
    console.log('Kafka producer running at 5001')
})


app.post('/sendMsg',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: req.body.topic, messages:sentMessage , partition: 0 }
    ];
    // console.log('Message sent');
    producer.send(payloads, function (err, data) {
            res.json(data);
    });
    console.log('Message sent',payloads);
    
})

