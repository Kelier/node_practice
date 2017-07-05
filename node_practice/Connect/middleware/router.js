//中间件实现
var parse=require('url').parse;
module.exports=function route(obj){
    return function(req,res,next){
        if(!obj[req.method]){
            next();
            return;
        }
        var routes=obj[req.method];//找到req.method对应的路径
        var url=parse(req.url);
        var paths=Object.keys(routes);//存放到数组中
        
        for(var i=0;i<paths.length;i++){
            var path=paths[i];
            var fn=routes[path];
            path=path.replace(/\//g,'\\/').replace(/:(\w+)/g,'([^\\/]+)');
            
            var re=new RegExp('^'+path+'$');//构造表达式
            
            //下面尝试和pathname匹配
            var captures=url.pathname.match(re);
            if(captures){
                var args=[req,res].concat(captures.slice(1));
                //传递被捕获的数组
                fn.apply(null,args);
                return;
            }
        }
        next();
    }
};