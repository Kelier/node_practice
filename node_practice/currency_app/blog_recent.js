//获取json文件中的标题并渲染web页面

var http=require('http');
var fs=require('fs');

http.createServer(function(req,res){
    if(req.url=='/'){
        fs.readFile('./title.json',function(err,data){
            if(err){
                console.error(err);
                res.end('Server Error');
            }else{
                var titles=JSON.parse(data.toString());
                
                fs.readFile('./template.html',function(err,data){
                    if(err){
                        console.error(err);
                        res.end('Server broken');
                    }else{
                        var tmpl=data.toString();
                        
                        var html=tmpl.replace('%',titles.join('<li></li>'));
                        res.writeHead(200,('Content-Type':'text/html'));
                        res.end(html);//将html发送给用户
                    }
                });
            }
        });
    }
}).listen(8889,"127.0.0.1");