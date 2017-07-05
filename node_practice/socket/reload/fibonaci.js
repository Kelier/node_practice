var http=require('http');

function fib(n){
    if(n<2)
        return 1;
    else
        return fib(n-2)+fib(n-1);
}

var server=http.createServer(function(req,res){
    var num=parseInt(req.url.substring(1),10);
    res.writeHead(200);
    res.end(fib(num)+"\n");
});

server.listen(8000);

//solution:为每个http请求复制node进程，让子进程做昂贵的计算工作并返回报告,cp.fork() can do it！