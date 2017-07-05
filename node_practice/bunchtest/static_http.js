var http=require('http');
var parse=require('url').parse;
var join=require('path').join;//放入一个字符串
var fs=require('fs');

var root=__dirname;
var server=http.createServer(function(req,res){
    var url=parse(req.url);
    var path=join(root,url.pathname);//构造绝对路径
    
    fs.stat(path,function(err,stat){
        if(err){
            if('ENOENT'==err.code){
                res.statusCode=404;
                res.end('Not Found');
            }else{
                res.statusCode=500;
                res.end('Internal Server Error');
            }
        }else{
            res.setHeader('Content-Length',stat.size);
            var stream=fs.createReadStream(path);
            stream.pipe(res);//res.end会在其内部调用
            stream.on('error',function(err){
                res.statusCode=500;
                res.end('Internal Server Error');
            });
        }
    });
//    
//    res.end(root);
   
//    stream.on('data',function(chunk){
//        res.write(chunk);//将文件数据写进响应中
//    });
//    stream.on('end',function(){
//        res.end();
//    })
    
});
server.listen(3000);