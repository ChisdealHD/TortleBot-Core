/**
 * Created by TortleWortle on 3/31/2017.
 */
// This is an example bot
const TortleBot = require('../TortleBot')
const bot = new TortleBot(process.env.BOT_TOKEN || process.argv[2])

bot.registerModule(require('../modules/channellink.js'))
bot.registerModule(require('../modules/music.js'))
bot.registerModule(require('../modules/goplay.js'))
bot.registerModule(require('../modules/utilities.js'))

process.on('unhandledRejection', console.error);