

  <h1>Kanye Quote Bot</h1>
  <p>
    A **super minimal bot** for <a href="https://hack.chat">hack.chat</a> that automatically sends Kanye West quotes to users when they join the chat.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Sends a Kanye quote automatically to new users.</li>
    <li>Minimal and lightweight code (~19 lines).</li>
    <li>No unnecessary commands or clutter.</li>
    <li>Easy to customize channel, bot name, and behavior.</li>
  </ul>

  <h2>How It Works</h2>
  <p>
    The bot connects to <a href="https://hack.chat">hack.chat</a> via WebSocket, joins a specific channel, and listens for new users joining the chat. 
    When a new user joins, the bot fetches a random Kanye quote from the <a href="https://api.kanye.rest/">Kanye Rest API</a> and sends it to that user.
  </p>

  <h3>Flow Overview:</h3>
  <ol>
    <li>Bot connects to hack.chat WebSocket server.</li>
    <li>Bot joins a specific channel using a chosen nickname.</li>
    <li>Bot listens for "onlineAdd" events, which signal a new user joining.</li>
    <li>When a new user joins, the bot calls the Kanye Rest API (<code>https://api.kanye.rest/</code>) to get a random quote.</li>
    <li>The bot sends a chat message to the new user with the quote.</li>
  </ol>

  <h2>Setup</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/RandomUsernames1/ye-bot.git
cd ye-bot</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install ws</code></pre>
    </li>
    <li>Run the bot:
      <pre><code>node ye.js </code></pre>
    </li>
  </ol>

  <h2>Customization</h2>
  <p>You can easily customize the bot by editing the connection settings in <code>index.js</code>:</p>
  <pre><code>ws.send(JSON.stringify({ cmd: 'join', channel: 'lounge', nick: 'Kanye' }));</code></pre>

  <ul>
    <li><strong>channel</strong>: The chat channel to join (e.g., <code>lounge</code>).</li>
    <li><strong>nick</strong>: The bot's display name (e.g., <code>Kanye</code>).</li>
  </ul>

  <h3>Customizing the API</h3>
  <p>The bot currently uses the <a href="https://api.kanye.rest/">Kanye Rest API</a> to fetch random quotes. If you want to use a different source:</p>
  <ul>
    <li>Replace the API URL in the bot code:</li>
    <pre><code>https.get('https://api.kanye.rest/', res => { ... });</code></pre>
    <li>Make sure the new API returns a JSON object with a <code>quote</code> property.</li>
  </ul>

  <h2>Usage</h2>
  <ul>
    <li>Start the bot with <code>node index.js</code>.</li>
    <li>When a new user joins the chat, the bot automatically sends them a Kanye quote.</li>
    <li>No extra commands are needed—the bot works automatically on user join.</li>
  </ul>

  <h2>License</h2>
  <p>MIT License</p>

</body>
</html>
