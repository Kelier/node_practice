var fs=require('fs');
var url=require('url');
var http=require('http');
var path=require('path');
var express=require('express');
var app=express();
var server=http.createServer(app);
var io=require('socket.io').listen(server);
var root=__dirname;

app.use(function(req,res,next){
    req.on('static',function(){
        //注册由static中间件发送的static事件
        var flie=url.parse(req.url).pathname;
        var mode='stylesheet';
        if(file[file.length-1]=='/'){
            file+='nope.html';
            mode='reload';
        }
        createWatcher(file,mode);//确定要提供的文件名并调用createWatcher
        
    });
    next();
});

app.use(express.static(root));//将服务器设置为基本的静态文件服务器

var watchers={};

function createWatcher(file,event){
    var absolute=path.join(root,file);
    
    if(watchers[absolute]){
        return;
    }
    fs.watchFile(absolute,function(curr,prev){
        //开始检测文件发生的所有变化
        if(curr.mtime!=prev.mtime){
            //检测mtime最后修改时间是否发生变化
            io.sockets.emit(event,file);
        }
    });
    
    watchers[absolute]=true;//将文件标记为检测对象
}

server.listen(8000);






















