const WebSocket=require('ws');

const WebSocketServer=WebSocket.Server;

//实例化
const wss=new WebSocketServer({
    port:3000
});

//wss对象处理websocket
wss.on('connection',function(ws){
    console.log(`[SERVER] Received:${message}`);
    ws.send(`ECHO:${message}`,(err)=>{
        if(err){
            console.log(`[SERVER] error:${error}`);
        }
    })
});