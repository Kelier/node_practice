var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

//建立在localhost上的mongodb连接，用photo_app做数据库、
 var schema=new mongoose.Schema({
     name:String,
     path:String
 });

module.exports=mongoose.model('Photo',schema);


//招聘模型的实现