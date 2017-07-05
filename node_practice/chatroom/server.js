//此文件用来定义变量声明的
var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");
var cache={};
//接下來加入3个辅助函数以提供静态http服务
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error:404,resources not found');
    response.end();
}
//第二个辅助函数用来提供文件数据服务
function sendFile(response,filePath,fileContents){
    response.writeHead(200,{"content-type":mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}
//第三个辅助函数用来提供静态文件服务（判断缓存）

function serveStatic(response,cache,absPath){
    if(cache[absPath]){
        sendFile(response,cache,cache[absPath]);//从内存中返回文件
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data);//从硬盘中读取文件并返回
                    }
                });
            }else{
                send404(response);
            }
        });
    }
}

//创建http服务器
var server=http.createServer(function(request,response){
    var filePath=false;
    if(request.url=='/'){
        filePath='public/index.html';
    }else{
        filePath='public'+request.url;
    }
    var absPath='./'+filePath;
    serveStatic(response,cache,absPath);
});

server.listen(8888,function(){
    console.log('server listening on port 8888');
})

var chatServer=require('./lib/chat_server');
chatServer.listen(server);//启动socket.io服务器










