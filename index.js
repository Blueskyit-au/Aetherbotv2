const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot'); // ✅ Match the class name in bot.js

// Create HTTP server
const server = restify.createServer(); // <-- THIS LINE WAS MISSING

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`\nBot is listening on port ${port}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Create bot
const bot = new EchoBot(); // ✅ Match class name

// Listen for incoming requests
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});
