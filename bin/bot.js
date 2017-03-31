/**
 * Created by TortleWortle on 3/31/2017.
 */
const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });
const ShayneBot = require('../ShayneBot')
const bot = new ShayneBot(client)

require('../modules/channellink.js')(bot)
require('../modules/music.js')(bot)
require('../modules/goplay.js')(bot)
require('../modules/utilities.js')(bot)

client.login(process.env.BOT_TOKEN || process.argv[2]);