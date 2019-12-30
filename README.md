# kafka-producer-consumer
Run Kafka-Producer and Kafka-consumer in node js using docker containers

Step 1: Check you have docker in your local system
Step 2:Go to the kafka-producer-consumer folder and run docker-compose up -d
Step 3:Run npm install in the command line
Step 4:Run producer and consumer like node producer.js and node consumer.js in different terminals.
Step 5: Install postman
Step 6: Use postman to publish messages to kafka with payload like 
{
	"topic":"Posts",
	"message":"Ashok is testing"
}
Step 7: This payload will get published to kafka and you can see in consumer terminal
