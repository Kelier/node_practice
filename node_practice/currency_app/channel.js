var events=require('events');
var net=require('net');
var channel=new events.EventEmitter();
channel.clients={};
channel.subscriptions={};

channel.on('join',function(id,client){
    //添加join事件的监听器，保存用户的client对象
    this.clients[id]=client;
    this.subscriptions[id]=function(senderId,message){
        if(id!=senderId){
            this.clients[id].write(message);//忽略发出这一广播数据的用户
        }
    }
    this.on('broadcast',this.subscriptions[id]);
});


var server=net.createServer(function(client){
    var id=client.remoteAddress+':'+client.remotePort;
    client.on('connect',function(){
        channel.emit('join',id,client);
    });
    client.on('data',function(data){
        data=data.toString();
        channel.emit('broadcast',id,data);
    });
});
server.listen(8892);




