//var hogan=require('hogan.js');
//var template='{{message}}';
//var context={message:'Hello template'};
//
//var template=hogan.compile(template);
//console.log(template.render(context));

//lambda区块

var hogan=require('hogan.js');
var md=require('github-flavored-markdown');//引入markdown解析器

var template='{{#markdown}}'+'**Name**:{{name}}'+'{{/markdown}}';

var context={
    name:'Rick LaRue',
    markdown:function(){
        return function(text){
              return md.parse(text);
        };
    }
};

var template=hogan.compile(template);
console.log(template.render(context));