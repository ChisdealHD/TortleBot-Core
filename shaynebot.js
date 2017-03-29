const Discord = require("discord.js");
const bot = new Discord.Client({ autoReconnect: true });

var nuggetsServerId = "188384423085998080"
var retardoCardoServerId = "295227929804275715"

var nuggetsChannelId = "296387556864557058"
var retardoCardoChannelId = "296386088199651328"

bot.on('ready', () => {
    bot.user.setGame("with 50 shades of riven porn")
});
bot.on('message', msg => {
    if(msg.author.bot) {
        return
    }
    if (msg.channel.id == retardoCardoChannelId)
    {
        bot.channels.get(nuggetsChannelId).sendMessage(msg.author.username + ": " + msg.content)
    }
    if (msg.channel.id == nuggetsChannelId)
    {
        bot.channels.get(retardoCardoChannelId).sendMessage(msg.content)
    }
    if(msg.content.startsWith("Shayne go play ")) {
        var messageArray = msg.content.split(" ")
        messageArray.shift()
        messageArray.shift()
        messageArray.shift()

        var newGame = messageArray.join(" ")
        msg.reply("Ok, I'm gonna play " + newGame)
        bot.user.setGame(newGame)
    }
});

bot.on('typingStart', (channel, user) => {
    if(!user.bot) {
        if(channel.id == nuggetsChannelId) {
            bot.channels.get(retardoCardoChannelId).startTyping()
        }
        if(channel.id == retardoCardoChannelId) {
            bot.channels.get(nuggetsChannelId).startTyping()
        }
    }
})
bot.on('typingStop', (channel, user) => {
    if(!user.bot) {
        if (channel.id == nuggetsChannelId) {
            bot.channels.get(retardoCardoChannelId).stopTyping()
        }
        if (channel.id == retardoCardoChannelId) {
            bot.channels.get(nuggetsChannelId).stopTyping()
        }
    }
})
require('./modules/music.js')(bot)
bot.login(process.env.BOT_TOKEN);