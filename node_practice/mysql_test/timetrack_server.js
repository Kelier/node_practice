//包含Node的http api，程序特定的逻辑以及mysql api
var http=require('http');
var work=require('./lib/timetrack');
var mysql=require('mysql');
var db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'timetrack'
});


//接下来定义web程序的行为
var server=http.createServer(function(req,res){
    switch(req.method){
        case 'POST':
            switch(req.url){
                case '/':
                    work.add(db,req,res);
                    break;
                case '/archive':
                    work.archive(db,req,res);
                    break;
                case '/delete':
                    work.delete(db,req,res);
                    break;
            }
            break;
        case 'GET':
            switch(req.url){
                case '/':
                    work.show(db,res);
                    break;
                case 'archived':
                    work.showArchived(db,res);
            }
            break;
    }
});

//接下来创建一个数据库表
db.query("CREATE TABLE IF NOT EXISTS work ("+
        "id INT(10) NOT NULL AUTO_INCREMENT,"+"hours DECIMAL(5,2) DEFAULT 0,"+"date DATE,"+"archived INT(1) DEFAULT 0,"+"description LONGTEXT,"+"PRIMARY KEY(id))",function(err){
    if(err) throw err;
    console.log('Server started');
    server.listen(3000,'127.0.0.1');
});












