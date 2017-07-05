function logger(req,res,next){
    console.log('%s %s',req.method,req.url);
    next();
}

function hello(req,res){
    res.setHeader('Content-Type','text.plain');
    res.end('hello world');
}

function restrict(req,res,next){
    //http请求头里有一段authorization认证信息
    var authorization=req.headers.authorization;
    if(!authorization)return next(new Error('Unauthorized'));
    
    var parts=authorization.split(' ');
    var scheme=parts[0];
    var auth=new Buffer(parts[1],'base64').toString().split(':');
    var user=auth[0];
    var pass=auth[1];
    
    authenticateWithdatabase(user,pass,function(err){
        if(err) return next(err);
        //错误处理中间件
        next();
    });
}

function admin(req,res,next){
    switch(req,url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}

var connect=require('connect');

connect().use(logger).use('/blog',blog).use('/posts',blog).use(hello).listen(3000);






