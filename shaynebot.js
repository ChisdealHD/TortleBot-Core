const Discord = require("discord.js");
const bot = new Discord.Client({ autoReconnect: true });

require('./modules/channellink.js')(bot)
require('./modules/music.js')(bot)
require('./modules/goplay.js')(bot)

bot.login(process.env.BOT_TOKEN || process.argv[2]);