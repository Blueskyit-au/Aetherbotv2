const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot'); // ✅ Match the class name in bot.js

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\nBot is listening on ${server.url}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

const bot = new EchoBot(); // ✅ Match class name

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
