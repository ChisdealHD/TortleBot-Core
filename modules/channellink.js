/**
 * Created by TortleWortle on 3/31/2017.
 */

const nuggetsServerId = "188384423085998080"
const retardoCardoServerId = "295227929804275715"

const nuggetsChannelId = "296387556864557058"
const retardoCardoChannelId = "296386088199651328"

const channellink = function(TortleBot) {

    bot = TortleBot.client
    bot.on('ready', () => {
        bot.user.setGame("!halp")
    });

    bot.on('message', msg => {

        let prefix = msg.guild.member(bot.user).displayName
        if(msg.author.bot) {
            return
        }
        if (msg.channel.id == retardoCardoChannelId)
        {
            bot.channels.get(nuggetsChannelId).sendMessage(msg.author.username + ": " + msg.content)
        }
        if (msg.channel.id == nuggetsChannelId)
        {
            msg.rely("This is a one-way chat now.")
        }
    });

    bot.on('typingStart', (channel, user) => {
        if(!user.bot) {
            if(channel.id == retardoCardoChannelId) {
                bot.channels.get(nuggetsChannelId).startTyping()
            }
        }
    })
    bot.on('typingStop', (channel, user) => {
        if(!user.bot) {
            if (channel.id == retardoCardoChannelId) {
                bot.channels.get(nuggetsChannelId).stopTyping()
            }
        }
    })
}

module.exports = channellink