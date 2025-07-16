const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot'); // ✅ Match the class name in bot.js

const port = process.env.PORT || 3978;
server.listen(port, () => {
  console.log(`\nBot is listening on port ${port}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

const bot = new EchoBot(); // ✅ Match class name

server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});
