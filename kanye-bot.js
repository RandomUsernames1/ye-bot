const WebSocket = require('ws');
const https = require('https');

const CONFIG = {
  server: "wss://hack.chat/chat-ws",
  channel: "lounge",
  botName: "Kanye",
  debug: true
};

const bot = {
  ws: null,

  init() {
    this.connect();
    console.log(`[${CONFIG.botName}] Bot initialized`);
  },

  connect() {
    this.ws = new WebSocket(CONFIG.server);

    this.ws.on('open', () => {
      console.log(`[${CONFIG.botName}] Connected to server`);
      this.joinChannel();
    });

    this.ws.on('message', async (data) => {
      try {
        const msg = JSON.parse(data);
        if (CONFIG.debug) console.log(msg);

        // Handle new user joining
        if (msg.cmd === 'onlineAdd') {
          const nick = msg.nick;
          if (nick && nick !== CONFIG.botName) {
            const quote = await bot.getKanyeQuote();
            bot.sendChat(`@${nick} Kanye says: "${quote}"`);
          }
        }

        // Handle chat commands
        if (msg.cmd === 'chat') {
          const text = msg.text.trim();
          if (text === "!help") {
            bot.sendChat(`Commands: !help, !roll, !stats`);
          } else if (text === "!roll") {
            bot.sendChat(`🎲 Roll result: ${Math.floor(Math.random() * 6) + 1}`, msg.nick);
          } else if (text === "!stats") {
            bot.sendChat(`I am a Kanye quote bot!`);
          }
        }

      } catch (err) {
        console.error('Error parsing message:', err);
      }
    });

    this.ws.on('close', () => {
      console.log('Connection closed. Reconnecting in 5s...');
      setTimeout(() => this.connect(), 5000);
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  },

  joinChannel() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        cmd: "join",
        channel: CONFIG.channel,
        nick: CONFIG.botName
      }));
    }
  },

  sendChat(text, nick = null) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const message = nick ? `@${nick} ${text}` : text;
    this.ws.send(JSON.stringify({ cmd: "chat", text: message }));
  },

  getKanyeQuote() {
    return new Promise((resolve) => {
      https.get('https://api.kanye.rest/', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json.quote || "I'm Kanye!");
          } catch (e) {
            resolve("I'm Kanye!");
          }
        });
      }).on('error', () => resolve("I'm Kanye!"));
    });
  }
};

bot.init();
