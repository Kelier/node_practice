var net=require('net');

var server=net.createServer(function(socket){
    socket.on('data',function(data){
        socket.write(data);//数据被写回客户端
    });
});

server.listen(8891);