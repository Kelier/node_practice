var ejs=require('ejs');
var fs=require('fs');
var http=require('http');
var filename='./template/students.ejs';

var students=[
    {name:'Rick LaRue',age:23},
    {name:'Sarah Cathands',age:25},
    {name:'Bob Dobbs',age:37}
];

var server=http.createServer(function(req,res){
    if(req.url=='/'){
        fs.readFile(filename,function(err,data){
            var template=data.toString();
            var context={students:students};
            var output=ejs.render(template,context);
            
            //在生产环境中启用缓存机制
//            var cache=process.env.NODE_ENV==='production';
//            var output=ejs.render(template,{students:students,cache:cache,filename:filename});
            
            res.setHeader('Content-Type','text/html');
            res.end(output);
        });
    }else{
        res.statusCode=404;
        res.end('Not Found');
    }
});

server.listen(8000);