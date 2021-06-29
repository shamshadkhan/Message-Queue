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
        var key = 'my.o';
        var msgs = ['MSG_1','MSG_2','MSG_3'];

        channel.assertExchange(exchange, 'topic', {
            durable: false
            });
        var i=0;
        setInterval(function() {
            if(i<3){
                channel.publish(exchange, key, Buffer.from(msgs[i]));
                console.log(" [x] Sent %s:%s", key, msgs[i]);
                i++;
            }
            }, 3000);
        
        
    });

    setTimeout(function() { 
        conn.close(); 
        process.exit(0) 
    }, 11000);

    
});
