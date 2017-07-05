//包含node querystring api ，定义了辅助函数，用来接收web页面html
var qs=require('querystring');

//发送http响应
exports.sendHtml=function(res,html){
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData=function(req,cb){
    //解析post数据
    var body='';
    req.setEncoding('utf8');
    req.on('data',function(chunk){
        body+=chunk;
    });
    req.on('end',function(){
        var data=qs.parse(body);
        cb(data);
    });
};

exports.actionForm=function(id,path,label){
    //渲染简单的表单
    var html='<form method="POST" action="'+path+'">'+'<input type="hidden" name="id" value="'+id+'">'+'<input type="submit" value="'+label+'">'+'</form>';
    return html;
};


//往数据库里添加工作记录
exports.add=function(db,req,res){
    exports.parseReceivedData(req,function(work){
        db.query("INSERT INTO work (hours,date,description)"+" VALUES(?,?,?)",[work.hours,work.date,work.description],function(err){
            if(err) throw err;
            exports.show(db,res);//给用户显示工作记录清单
        });
    });
};


//删除工作记录
exports.delete=function(db,req,res){
    exports.parseReceivedData(req,function(work){
        db.query("DELETE FROM work WHERE id=?",[work.id],function(err){
            if(err) throw err;
            exports.show(db,res);
        });
    });
};


//更新归档一条工作记录
exports.archive=function(db,req,res){
    //解析http 数据
    exports.parseReceivedData(req,function(work){
        db.query("UPDATE work SET archived=1 WHERE id=?",[work.id],function(err){
            if(err) throw err;
            exports.show(db,res);
        });
    });
};


//查询得到工作记录
exports.show=function(db,res,showArchived){
    var query="SELECT * FROM work "+"WHERE archived=? "+"ORDER BY date DESC";
    var archiveValue=(showArchived)?1:0;
    db.query(query,[archiveValue],function(err,rows){
        if(err) throw err;
        html=(showArchived)?'':'<a href="/archived"> Archived Work</a></br>';
        html+=exports.workHitlistHtml(rows);//结果格式化为html表格
        html+=exports.workFormHtml();
        exports.sendHtml(res,html);//给用户发送响应
        
    });
};
exports.showArchived=function(db,res){
    exports.show(db,res,true);//只显示归档的工作记录
}


//渲染mysql记录
exports.workHitlistHtml=function(rows){
    var html='<table>';
    for(var i in rows){
        html+='<tr>';
        html+='<td>'+rows[i].date+'</td>';
        html+='<td>'+rows[i].hours+'</td>';
        html+='<td>'+rows[i].description+'</td>';
        if(!rows[i].archived){
          //如果记录没被归档，显示按钮
            html+='<td>'+exports.workArchiveForm(rows[i].id)+'</td>';
        }
        html+='<td>'+exports.workDeleteForm(rows[i].id)+'</td>';
        html+='</tr>';
    }
    html+='</table>';
    return html;
};

//渲染html表单
exports.workFormHtml=function(){
    var html='<form method="POST" action="/">'+'<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"></p>'+'<p>Hours worked:<br/><input name="hours" type="text"></p>'+'<p>Description:<br/>'+'<textarea name="description"></textarea></p>'+'<input type="submit" value="Add" />'+'</form>';
    return html;
};

//渲染归档按钮表单
exports.workArchiveForm=function(id){
    return exports.actionForm(id,'/archive','Archive');
};

//渲染删除按钮表单
exports.workDeleteForm=function(id){
    return exports.actionForm(id,'delete','Delete');
};














