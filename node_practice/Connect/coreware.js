var logger=require('express');
var connect=require('connect');
var favicon=require('favicon');
connect().use(favicon(__dirname+'public/favicon.ico')).use(logger()).use(function(req,res){
    res.end('Hello');
}).listen(3000);

//另外提供logger输出的自定义