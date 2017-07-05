//使用router中间组件
var connect=require('connect');
var router=require('./middleware/router');//路由器组件，稍侯定义
var routes={
    //定义路由对象
    GET:{
        '/users':function(req,res){
            res.end('tobi,loki,ferret');
        },
        '/user/:id':function(req,res,id){
            res.end('user '+id);
            //其中每一项都是请求url的映射
    }
},
    DELETE:{
        '/user/:id':function(req,res,id){
            res.end('deleted user '+id);
        }
    }
};



connect().use(router(require('./routes/user'))).use(router(require('./routes.admin'))).listen(3000);