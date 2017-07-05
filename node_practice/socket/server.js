var app=require('http').createServer(handler);
var io=require('socket.io').listen(app);
//将http服务器升级为socket.io服务器
var fs=require('fs');
var html=fs.readFileSync('index.html','utf-8');

function handler(req,res){
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html,'utf8'));
    res.end(html);
}

function tick(){
    var now=new Date().toUTCString();//取得当前时间的UTC表示
    io.sockets.send(now);//将时间发送给送给所有连接上来的客户端
}

setInterval(tick,1000);//每秒运行一次tick函数

app.listen(8000);