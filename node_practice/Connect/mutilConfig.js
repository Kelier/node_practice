//实现可配置的logger中间件组件
var app=connect().use(logger(':method :url')).use(hello);

function setup(format){
    //此函数可以用不同的配置调用多次
    var regexp=/:(\w+)/g;
    
    return function logger(req,res,next){
        var str=format.replace(regexp,function(match,property){
            return req(property);
            //用正则表达式格式化请求的条目
        });
        console.log(str);
        next();
    }
}

module.exports=setup;//直接导出logger的setup函数