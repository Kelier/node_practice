
let ws=new WebSocket('ws://localhost:3000/test');

ws.on('open',function(){
    console.log(`[CLIENT] open()`);
    ws.send('hello');
});

//响应收到的信息
ws.on('message',function(message){
    console.log(`[CLIENT] Received:${message}`);
});