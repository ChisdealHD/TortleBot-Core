/**
 * Created by TortleWortle on 3/31/2017.
 */
// This is an example bot
const TortleBot = require('../TortleBot')
const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });

client.login(process.env.BOT_TOKEN || process.argv[2])

const bot = new TortleBot(client)

// bot.registerModule(require('../modules/channellink.js'))
bot.registerModule(require('tortlebot-music'))
bot.registerModule(require('../modules/goplay.js'))
bot.registerModule(require('../modules/utilities.js'))

process.on('unhandledRejection', console.error);