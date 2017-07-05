//用来显示受信内容与可疑内容
function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>'+message+'</i>');
    
}


//处理用户输入(内容以/开头处理为命令，其它为正常信息)
function processUserInput(chatApp,socket){
    var message=$('#send-message').val();
    var systemMessage;
    
    if(message.charAt(0)=='/'){
        //处理/命令
        systemMessage=chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        chatApp.sendMessage($('#room').text(),message);//将非命令輸入到廣播
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    
    $('#send-message').val('');
}



//客户端程序初始化逻辑
var socket=io.connect();
$(document).ready(function(){
    var chatApp=new Chat(socket);
    socket.on('nameResult',function(result){
        //显示更名尝试的结果
        var message;
        
        if(result.success){
            message='You are now known as '+result.name+'.';
        }else{
            message=result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });
    
    socket.on('joinResult',function(result){
        //显示房间变更结果
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    });
    
    //显示接收到的信息
    socket.on('message',function(message){
        var newElement=$('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });
    
    
    //显示可用房间列表
    socket.on('rooms',function(rooms){
        $('#room-list').empty();
        
        for(var room in rooms){
            room=room.substring(1,room.length);
            if(room!=''){
                $('#room-list').append(divEscapedContentElement(room));
            }
        }
        
        //点击房间名可以更换到对应的房间中去
        $('#room-list div').click(function(){
            chatApp.processCommand('/join'+$(this).text());
            $('#send-message').focus();
        });
    });
    
    //定期请求可用房间列表
    setInterval(function(){
        socket.emit('rooms');
    },1000);
    
    
    //提交表单可以发送信息、
    $('#send-message').focus();
    
    $('#send-form').submit(function(){
        processUserInput(chatApp,socket);
        return false;
    });
    
});







