var fs=require('fs');
var request=require('request');
var htmlparser=require('htmlparser');
var configFilename='./rss_feeds.txt';

function checkForRSSFile(){
    fs.exists(configFilename,function(exists){
        //确保包含RSS源列表的文件存在
        if(!exists)
            return next(new Error('Missing RSS file:'+configFilename));
            //有错误就返回
        next(null,configFilename);
    });
}

function readRSSFile(configFilename){
    //读取并解析文件
    fs.readFile(configFilename,function(err,feedList){
        if(err) return next(err);
        
        feedList=feedList.toString().replace(/^\s+|\s+$/g,'').split("\n");//正则消除空格
        
        var random=Math.floor(Math.random()*feedList.length);
        next(null,feedList[random]);
    });
}

function downloadRSSFeed(feedUrl){
    //向选定的源地址发送http请求获取数据
    request({uri:feedUrl},function(err,res,body){
        if(err)return next(err);
        if(res.statusCode!=200)
            return next(new Error('Abnormal response status code'));
        next(null,body);
    });
}

function parseRSSFeed(rss){
    //将预订源数据解析到一个条目数组中
    var handler=new htmlparser.RssHandler();
    var parser=new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    
    if(!handler.dom.items.length)
        return next(new Error('No RSS items found'));
    
    var item=handler.dom.items.shift();//返回第一个元素的值
    console.log(item.title);
    console.log(item.link);
}

var tasks=[checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed];
//将需要做的任务放入一个数组中

function next(err,result){
    if(err) throw err;
    
    var currentTask=tasks.shift();
    
    if(currentTask){
        currentTask(result);
    }
}
next();








