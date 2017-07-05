var cluster=require('cluster');
var http=require('http');
var numCPUs=require('os').cpus().length;
//确定服务器的核心数

var workers={};
var requests=0;

if(cluster.isMaster){
    for(var i=0;i<numCPUs;i++){
        workers[i]=cluster.fork();//每个内核创建一个fork分支
        
        (function(i){
            workers[i].on('message',function(message){
              //监听来自工人的消息
                if(message.cmd=='incrementRequestTotal'){
                    //增加请求总数
                    requests++;
                    for(var j=0;j<numCPUs;j++){
                        //将新的请求总数发送给所有工人
                        workers[j].send({
                            cmd:'updateOfRequestTotal',
                            requests:requests
                        });
                }
              }
            });
        })(i);  //用闭包保留工人的值
    }
    
    cluster.on('exit',function(worker,code,signal){
        console.log('Worker '+worker.process.pid+' died');
    });
}else{
    //监听来自主进程的消息
    process.on('message',function(message){
        if(message.cmd=='updateOfRequestTotal'){
            requests=message.requests;
        }
    });
    
    http.Server(function(req,res){
        res.writeHead(200);
        res.end('I am a worker running in process '+process.pid+' totals:'+numCPUs+' says cluster has responded to '+requests+' requests.');
        process.send({cmd:'incrementRequestTotal'});
    }).listen(8000);
}

//集群api提供了一种让主进程和工人彼此互通的办法