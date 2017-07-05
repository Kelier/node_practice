//用Node实现netcat命令的简单复制品

var net=require('net');
var host=process.argv[2];
var port=Number(process.argv[3]);
//解析出端口和主机

var socket=net.connect(port,host);
 socket.on('connect',function(){
     process.stdin.pipe(socket);//将进程的stdin传给socket
     socket.pipe(process.stdout);//将socket数据传给进程的stdout
     process.stdin.resume();//开始读取数据
 });

socket.on('end',function(){
    process.stdin.pause();
});