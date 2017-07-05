exports.testPony=function(test){
    
    //.expect制定每个测试应该包含的断言数量
    test.expect(2);
    if(false){
        test.ok(false,'This should not have passed');
    }
    
    var isPony=true;
    test.ok(isPony,'This is not a pony');
    test.done();
}