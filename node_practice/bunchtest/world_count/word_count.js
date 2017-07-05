var fs=require('fs');
var completedTasks=0;
var tasks=[];
var wordCounts={};
var filesDir='./text';

function checkIfComplete(){
    completedTasks++;
    if(completedTasks==tasks.length){
        for(var index in wordCounts){
            console.log(index+': '+wordCounts[index]);
            //当所有任务完成后，列出文件中每个单词出现的次数
        }
    }
}

function countWordsInText(text){
    var words=text.toString().toLowerCase().split(/\W+/).sort();//正则表示大小写
    for(var index in words){
        var word=words[index];
        if(word){
            wordCounts[word]=(wordCounts[word])?wordCounts[world]+1:1;
        }
    }
}

fs.readdir(filesDir,function(err,files){
    //得出text目录下的文件列表
    if(err) throw err;
    for(var index in files){
        var task=(function(file){
            return function(){
                fs.readFile(file,function(err,text){
                    if(err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir+'/'+files[index]);
        tasks.push(task);
        
    }
    for(var task in tasks){
        tasks[task]();
    }
});












