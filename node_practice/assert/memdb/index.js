//添加保存功能

var db=[];

exports.save=function(doc,cb){
    db.push(doc);
    //将文档添加到数据库数组中
    
    
    //模拟异步操作
    if(cb){
        setTimeout(function(){
            cb();
        },1000);
    }
};

exports.first=function(obj){
    return db.filter(function(doc){
        //选择与obj的所有属性相匹配的文档
        for(var key in obj){
            if(doc[key]!=obj[key]){
                return false;
                //不匹配则返回false，不选择这个文档
            }
        }
        return true;
    }).shift();//只要第一个文档
};

exports.clear=function(){
    db=[];
};