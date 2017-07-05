var connect=require('connect');
var directory=require('serve-index');
var static=require('serve-static');

var app=connect();

app.use(directory('public')).use(static('public'));
app.listen(3000);