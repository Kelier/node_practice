var connect=require('connect');
var basicAuth=require('basic-auth');
var errorHandler=require('error-handler');

var app=connect().use(basicAuth(function(user,pass,callback){
   User.authenticate({user:user,pass:pass},gotUser);
    function gotUser(err,user){
    if(err) return callback(err);
    callback(null,user);
    }
})).use(errorHandler);

app.listen(3000);