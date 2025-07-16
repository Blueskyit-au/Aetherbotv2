const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { MyBot } = require('./bot'); // or whatever your bot logic is

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\nBot is listening on ${server.url}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

const bot = new MyBot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
