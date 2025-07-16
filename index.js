console.log("ENV: MicrosoftAppId =", process.env.MicrosoftAppId);
console.log("ENV: MicrosoftAppPassword is", process.env.MicrosoftAppPassword ? "SET" : "NOT SET");

const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot'); // ✅ Match the class name

// ✅ Create the Restify server
const server = restify.createServer();

const port = process.env.PORT || 3978;
server.listen(port, () => {
  console.log(`\nBot is listening on port ${port}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

const bot = new EchoBot();

server.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
