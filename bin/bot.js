/**
 * Created by TortleWortle on 3/31/2017.
 */
// This is an example bot
const TortleBot = require('../TortleBot')
const bot = new TortleBot(process.env.BOT_TOKEN || process.argv[2])

require('../modules/channellink.js')(bot)
require('../modules/music.js')(bot)
require('../modules/goplay.js')(bot)
require('../modules/utilities.js')(bot)

process.on('unhandledRejection', console.error);