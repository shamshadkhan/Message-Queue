const amqp = require('amqplib/callback_api');
amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
    if (err) {
        console.log(`Error ${err}`);
    }
       
    conn.createChannel((error, channel) => {
        if (error) {
            console.log(`Error ${err}`);
        }
        var exchange = 'topic_my';
        var exchange1 = 'topic_my';
        var key = 'my.o';
        var key1 = 'my.i';
        channel.assertExchange(exchange, 'topic', {
            durable: false
            });
            channel.assertQueue('', {
                exclusive: true
              }, function(error2, q) {
                if (error2) {
                    console.log(`Error ${error2}`);
                }
                channel.bindQueue(q.queue, exchange, key);
                channel.consume(q.queue, function(msg) {
                    setTimeout(() => {
                        channel.publish(exchange1, key1, Buffer.from('Got ' + msg.content));
                        console.log(" [x] Got %s:%s", key1, msg.content);
                    }, 1000);
                }, {
                  noAck: true
                });
              });
        
    });
    // setTimeout(function() { 
    //     conn.close(); 
    //     process.exit(0) 
    // }, 3000);    
});
