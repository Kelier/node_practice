function Todo(){
    this.todos=[];
    //定义待办事项数据库
}

Todo.prototype.add=function(item){
    //添加待办事项
    if(!item) throw new Error('Todo#add requires an item');
    this.todos.push(item);
}

Todo.prototype.deleteAll=function(){
    this.todos=[];
}

Todo.prototype.getCount=function(){
    return this.todos.length;
    
    //取得待办事项的数量
}

Todo.prototype.doAsync=function(cb){
    setTimeout(cb,2000,true);
}

module.exports=Todo;