//使用session的页面浏览计数器

var connect=require('connect');
var favicon=require('favicon');
var cookieParser=require('cookie-parser');
var session=require('cookie-session');

var app=connect().use(favicon()).use(cookieParser('keyboard cat')).use(session(sessionOpts)).use(function(req,res,next){
    var sess=req.session;
    if(sess.views){
        res.setHeader('Content-Type','text/html');
        res.write('<p>views:'+sess.views+'</p>');
        res.end();
        sess.views++;
    }else{
        sess.views=1;
        res.end('welcome to the session demo.refresh!');
    }
});



//设定会话有效期

var hour=3600000;
var sessionOpts={
    key:'myapp_sid',
    cookie:{maxAge:hour*24,secure:true}
};

app.listen(3000);