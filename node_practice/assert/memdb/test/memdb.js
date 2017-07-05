//mocha基本架构

var memdb=require('..');
var assert=require('assert');

describe('memdb',function(){
    
    //添加beforeach挂钩
    beforeEach(function(){
        memdb.clear();
    })
    //在每个测试用例前都要清理数据库，保持测试的无状态性
    
    describe('.save(doc)',function(){
        it('should save the document',function(){
            var pet={name:'Tobi'};
            memdb.save(pet);
            var ret=memdb.first({name:'Tobi'});
            assert(ret==pet);
        })
    })
    
    describe('.first(obj)',function(){
        it('should return the first matching doc',function(){
            var tobi={name:'Tobi'};
            var loki={name:'Loki'};
            
            memdb.save(tobi);
            memdb.save(loki);
            
            var ret=memdb.first({name:'Tobi'});
            assert(ret==tobi);
            
            var ret=memdb.first({name:'Loki'});
            assert(ret==loki);
        })
        
        //对.first的第二个期望
        it('should return null when no doc matches',function(){
            var ret=memdb.first({name:'Manny'});
            
            assert(ret==null);
        })
        
        
    })
    
    
    describe('.save(doc)',function(){
        it('should save the document',function(done){
            var pet={name:'Tobi'};
            memdb.save(pet,function(){
                var ret=memdb.first({name:'Tobi'});
                assert(ret==pet);
                done();//告知完成用例
            })
        })
    })
    
})










