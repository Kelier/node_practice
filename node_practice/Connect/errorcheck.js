var connect=require('connect');
connect.use(function hello(req,res){
    foo();
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
}).listen(3000);

function errorHandler(){
    var env=process.env,NODE_ENV||'development';
    return function(err,req,res,next){
        res.statusCode=500;
        
        switch(env){
            case 'develpoment':
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('Server error');
        }
    }
}

//注：node_env设定程序的模式