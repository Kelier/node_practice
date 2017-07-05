var assert=require('assert');
var Todo=require('./todo');
var todo=new Todo();
var testCompleted=0;

function deleteTest(){
    todo.add('Delete Me');
    assert.equal(todo.getCount(),1,"1 item should exist");
    //断言数据被正确添加
    
    todo.deleteAll();
    assert.equal(todo.getCount(),0,'No items should exist');
    testCompleted++;
    //记录测试已完成
}

function addTest(){
    todo.deleteAll();
    todo.add('Added');
    assert.notEqual(todo.getCount(),0,'1 item should exist');
    testCompleted++;
}

function doAsyncTest(cb){
    todo.doAsync(function(value){
        assert.ok(value,'Callback should be passed true');
        testCompleted++;
        cb();
    })
}

function throwsTest(cb){
    assert.throws(todo.add,/requires/);
    //不带参数调用todo.add
    testCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(function(){
    console.log('Completed '+testCompleted+' tests');
})




