const amqp = require('amqplib/callback_api');
var fs = require('fs');
fs.writeFile('app/data.txt', '', function (err) {
    if (err) throw err;
    console.log('File Created!');
  });
amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
    if (err) {
        console.log(`Error ${err}`);
    }
       
    conn.createChannel((error, channel) => {
        if (error) {
            console.log(`Error ${err}`);
        }
        var exchange = 'topic_my';
        var key = 'my.#';
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
                    var d = new Date();
                    var n = d.toISOString();
                    var newtext = `${n} Topic ${msg.fields.routingKey}:${msg.content} \n`;
                    fs.appendFile('app/data.txt', newtext, function (err) {
                        if (err) throw err;
                        console.log('Saved!',newtext);
                      });
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
