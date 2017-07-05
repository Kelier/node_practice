//对代码进行重构，整合逻辑


var fn_index=async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>
    <form action="/signin" method="post">
    <p>Name:<input name="name" value="koa"></p>
    <p>Password:<input name="password" type="password"></p>
    <p><input type="submit" value="Submit"></p>
    </form>`;
};

var fn_siginin=async(ctx,next)=>{
    var name=ctx.response.body.name||'',
        password=ctx.response.body.password||'';
    console.log(`signin with name: ${name},password: ${password}`);
    if(name==='koa'&&password==='12345'){
        ctx.response.body=`<h1>Welcome,${name}!</h1>`
    }else{
        ctx.response.body=`<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};


//暴露两个函数
module.exports={
    'GET /':fn_index,
    'POST /signin':fn_siginin
};