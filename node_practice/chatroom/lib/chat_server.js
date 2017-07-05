var socketio=require('socket.io');
var io;
var guestNumber=1;
var nickNames={};
var namesUsed=[];
var currentRoom={};

exports.listen=function(server){
    io=socketio.listen(server);
    io.set('log level',1);
    io.sockets.on('connection',function(socket){
        guestNumber=assignGuestName(socket,guestNumber,nickNames,namesUsed);//给连接上的用户赋予一个名字
        
        joinRoom(socket,'Lobby');//放入聊天室lobby
        
        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);//处理用户的消息，更名，以及聊天室的创建和变更
        
        socket.on('rooms',function(){
            socket.emit('rooms',io.sockets.manager.rooms);//用户发出请求时，向其提供已被占用的聊天室列表
        });
        
        handleClientDisconnection(socket,nickNames,namesUsed);
        //定义用户断开连接时清除的逻辑
        
    });
};

//分配用户昵称
function assignGuestName(socket,guestNumber,nickNames,namesUsed){
    var name='Guest'+guestNumber;
    nickNames[socket.id]=name;//生成昵称并绑定一个id
    socket.emit('nameResult',{
        success:true,
        name:name
    });
    namesUsed.push(name);//已占用的队列
    return guestNumber+1;//计数器
}

//进入聊天室
function joinRoom(socket,room){
    socket.join(room);//让用户进入房间
    currentRoom[socket.id]=room;
    socket.emit('joinResult',{room:room});
    socket.broadcast.to(room).emit('message',{text:nickNames[socket.id]+' has joined '+room+'.'});
    //告诉房间里其他用户有人进入了房间
    
    var usersInRoom=io.sockets.clients(room);
    if(usersInRoom.length>1){
        var usersInRoomSummary='Users currently in'+room+':';
        for(var index in usersInRoom){
            var userSocketId=usersInRoom[index].id;
            if(userSocketId!=socket.id){
                if(index>0){
                    usersInRoomSummary+=', ';
                }
                usersInRoomSummary+=nickNames[userSocketId];
            }
        }
        usersInRoomSummary+='.';
        socket.emit('message',{text:usersInRoomSummary});//将其他用户的信息汇总发给这个新进来的用户
    }
    
}


//处理昵称变更请求（客户端发送字符串数据的nameAttempt事件，服务器返回有json数据的nameResult事件）
function handleNameChangeAttempts(socket,nickNames,namesUsed){
    socket.on('nameAttempt',function(name){
        if(name.indexOf('Guest')==0){
            socket.emit('nameResult',{
                success:false,
                message:'Name cannot begin with "Guest".'//昵称不能以Guest开头
            });
        }else{
            if(namesUsed.indexOf(name)==-1){
                var previousName=nickNames[socket.id];//如果昵称还没有注册，就赶紧注册呗
                var previousNameIndex=namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id]=name;
                delete namesUsed[previousNameIndex];//删除之前用的昵称，让其他用户可以使用
                socket.emit('nameResult',{
                    success:true,
                    name:name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message',{
                  text:previousName+' is now known as '+name+  '.'
                });
            }else{
                socket.emit('nameResult',{
                    success:false,
                    message:'That name is already in use.'
                });
            }
        }
    });
}

//发送聊天信息（用户发射一个事件，表明消息是从哪个房间发出来的，以及消息的内容是什么，然后服务器将信息转发给其他用）

function handleMessageBroadcasting(socket){
    socket.on('message',function(message){
        socket.broadcast.to(message.room).emit('message',{
            text:nickNames[socket.id]+': '+message.text
        });
    });
}

//创建房间（用户加入已存在的房间，如果没有则创建）
function handleRoomJoining(socket){
    socket.on('join',function(room){
        socket.leave(currentRoom[socket.id]);//离开旧房间
        joinRoom(socket,room.newRoom);//加入新房间
    })
}


//用户断开连接（宕机时移除离线的用户）
function handleClientDisconnection(socket){
    socket.on('disconnect',function(){
        var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}

//至此，服务器逻辑完毕
