//koa2中，导入的是一个class
const Koa=require('koa');

//注意router返回的是一个函数
const router=require('koa-router')();

//假如bodyparser处理原始的request请求，解析body
const bodyParser=require('koa-bodyparser');

const fs=require('fs');

//创建一个Koa对象
const app=new Koa();

////异步处理请求
//app.use(async(ctx,next)=>{
//    await next();
//    ctx.response.type='text/html';
//    ctx.response.body='<h1>Hello,koa2!</h1>';
//    //参数ctx为koa传入的res和req的封装变量,next是下一个要处理的异步函数
//});
//
////监听
//app.listen(3000);
//console.log('app started');
//
////注意node版本要在7以上，因为koa2是以es7为标准的


//log request url
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method}  ${ctx.request.url}...`);
    await next();
});

//add url-route;
router.get('/hello/:name',async(ctx,next)=>{
    var name=ctx.params.name;
    ctx.response.body=`<h1>Hello,${name}!</h1>`;
});


router.get('/',async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>`;
});

//add router middleware
app.use(bodyParser());

//先导入fs模块，然后列出文件
var files=fs.readdirSync(__dirname+'/');

//过滤出.js
var js_files=files.filter((f)=>{
    return f.endsWith('.js');
});

//处理每个js文件
for(var f of js_files){
    console.log(`process controller: ${f}...`);
    //导入js文件
    let mapping=require(__dirname+'/'+f);
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path=url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST')){
            var path=url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
}




app.use(router.routes());

app.listen(3000);
console.log('app started');




















