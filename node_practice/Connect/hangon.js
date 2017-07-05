var connect=require('connect');

var api=connect().use(users).use(pets).use(errorHandler).listen(3000);
var app=connect().use(hello).use('/api',api).use(errorPage);

function hello(req,res,next){
    if(req.url.match(/^\/hello/)){
                     res.end('hello world\n');
                     }else{
                         next();
                     }
}

var db={
    users:[
        {name:'tobi'},
        {name:'loki'},
        {name:'jane'}
    ]
};

/*你用正则表达式匹配req.url，然后用 match[1]检查用户索引是否存在，它是你的匹配捕获的第一组数据。如果用户存在，则被串行 化为JSON，否则将一个错误对象的notFound属性设置为true，传给next()函数，以便在后续 的错误处理组件中可以统一错误处理逻辑。 */
function users(req,res,next){
    var match=req.url.match(/^\/user\/(.+)/);
    if(match){
        var user=db.users[match[1]];
        if(user){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(user));
        }else{
            var err=new Error('User not found');
            err.notFound=true;
            next(err);
        }
    }else{
        next();
    }
}

function pets(req,res,next){
    if(req.url.match(/^\/pet\/(.+)/)){
        foo();
    }else{
        next();
    }
}

function errorHandler(err,req,res,next){
    console.error(err.stack);
    res.setHeader('Content-Type','application/json');
    if(err.notFound){
        res.statusCode=404;
        res.end(JSON.stringify({error:err.message}));
        
    }else{
        res.statusCode=500;
        res.end(JSON.stringify({error:'Internal Server Error'}));
    }
}

function errorPage(err,req,res,next){
    console.error(err.stack);
   
}
    









