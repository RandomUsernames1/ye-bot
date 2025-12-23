const WebSocket = require('ws');
const https = require('https');

const ws = new WebSocket('wss://hack.chat/chat-ws');

ws.on('open', () => {
  ws.send(JSON.stringify({ cmd: 'join', channel: 'lounge', nick: 'Kanye' }));
});

ws.on('message', async (data) => {
  const msg = JSON.parse(data);
  if (msg.cmd === 'onlineAdd' && msg.nick !== 'Kanye') {
    https.get('https://api.kanye.rest/', res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const quote = JSON.parse(d).quote || "I'm Kanye!";
        ws.send(JSON.stringify({ cmd: 'chat', text: `@${msg.nick} Kanye says: "${quote}"` }));
      });
    });
  }
});
