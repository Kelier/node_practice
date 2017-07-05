var net=require('net');

//net.createServer(function(socket){
//    socket.write('Hello World!\r\n');
//    socket.end();
//}).listen(8000);
//
//console.log('listening on port 8000');

//这个服务器不支持http协议

net.createServer(function(socket){
    console.log('socket connected!');
    socket.on('data',function(data){
        console.log('"data" event',data);
    });
    socket.on('end',function(){
        console.log('"end" event');
    });
    socket.on('close',function(){
        console.log('"close" event');
    });
    socket.on('error',function(e){
        console.log('"error" event',e)
    });
    socket.pipe(socket);
}).listen(8000);
