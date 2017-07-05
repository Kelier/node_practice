var connect=require('connect');
var cookieParser=require('cookie-parser');
var app=connect().use(cookieParser('tobi is a cool ferret')).use(function(req,res){
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('hello\n');
}).listen(3000);

//设定在req.cookies和req.signedCookies属性上的对象是随请求发送过来的请求头 Cookie的解析结果。如果请求中没有cookie，这两个对象都是空的。 

