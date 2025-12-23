<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kanye Quote Bot</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background: #f9f9f9; color: #333; }
    h1, h2 { color: #444; }
    pre { background: #eee; padding: 10px; overflow-x: auto; }
    code { background: #eee; padding: 2px 4px; }
    ul { margin-left: 20px; }
  </style>
</head>
<body>

  <h1>Kanye Quote Bot</h1>
  <p>A super minimal bot for <a href="https://hack.chat">hack.chat</a> that sends Kanye quotes to users when they join the chat.</p>

  <h2>Features</h2>
  <ul>
    <li>Sends a Kanye quote automatically when a new user joins.</li>
    <li>Lightweight and minimal code.</li>
    <li>No extra commands or clutter.</li>
  </ul>

  <h2>Setup</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/yourusername/kanye-quote-bot.git
cd kanye-quote-bot</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install ws</code></pre>
    </li>
    <li>Run the bot:
      <pre><code>node index.js</code></pre>
    </li>
  </ol>

  <h2>Configuration</h2>
  <p>Change the channel or bot name by editing this line in <code>index.js</code>:</p>
  <pre><code>ws.send(JSON.stringify({ cmd: 'join', channel: 'lounge', nick: 'Kanye' }));</code></pre>
  <ul>
    <li><code>channel</code>: The chat channel to join.</li>
    <li><code>nick</code>: The bot's name.</li>
  </ul>

  <h2>Usage</h2>
  <p>Start the bot. When a new user joins the chat, the bot automatically sends a Kanye quote.</p>

  <h2>License</h2>
  <p>MIT License</p>

</body>
</html>
