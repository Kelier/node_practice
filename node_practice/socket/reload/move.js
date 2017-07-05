var fs=require('fs');

module.exports=function move(oldPath,newPath,callback){
    fs.rename(oldPath,newPath,function(err){
        //调用fs.rename并希望他2可用
        if(err){
            if(err.code==='EXDEV'){
                copy();
            }else{
                callback(err);
            }
            return;
        }
        callback();
    });
    
    function copy(){
        var readStream=fs.createReadStream(oldPath);
        //读取原来的文件并将之输出到目标路径
        var writeStream=fs.createWriteStream(newPath);
        readStream.on('error',callback);
        writeStream.on('error',callback);
        readStream.on('close',function(){
            fs.unlink(oldPath,callback);
            //复制完成后断链
        });
        readStream.pipe(writeStream);
    }
}

//跨磁盘重命名文件