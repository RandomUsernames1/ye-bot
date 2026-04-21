const WebSocket = require('ws');
const https = require('https');

function connect() {
  const ws = new WebSocket('wss://hack.chat/chat-ws');
  let heartbeat;

  ws.on('open', () => {
    console.log("Connected! Joining channel...");
    ws.send(JSON.stringify({ cmd: 'join', channel: 'lounge', nick: 'Kanye' }));

    // HEARTBEAT: Send a "ping" every 30 seconds to stay online
    heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ cmd: 'ping' })); 
      }
    }, 30000);
  });

  ws.on('message', async (data) => {
    const msg = JSON.parse(data);
    
    // Respond to people joining
    if (msg.cmd === 'onlineAdd' && msg.nick !== 'Kanye') {
      https.get('https://api.kanye.rest/', res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          try {
            const quote = JSON.parse(d).quote || "I'm Kanye!";
            ws.send(JSON.stringify({ cmd: 'chat', text: `@${msg.nick} Kanye says: "${quote}"` }));
          } catch (e) { console.log("Quote error"); }
        });
      });
    }
  });

  ws.on('close', () => {
    console.log("Disconnected. Reconnecting in 5 seconds...");
    clearInterval(heartbeat);
    setTimeout(connect, 5000); // RECONNECT logic
  });

  ws.on('error', (err) => {
    console.error("Socket error:", err.message);
    ws.close();
  });
}

connect();
