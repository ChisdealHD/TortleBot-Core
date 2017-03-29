/**
 * Created by TortleWortle on 3/29/2017.
 */

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const dispatchers = []

const music = function(bot) {


    bot.on('message', msg => {
        if(msg.author.bot) {
            return
        }

        if(msg.content.startsWith("Shayne come here")) {
            if (!msg.guild.voiceConnection) {
                if (!msg.member.voiceChannel) return msg.channel.sendMessage('Bitch please')
                msg.member.voiceChannel.join()
            }
        }

        if(msg.content.startsWith("Shayne play")) {
            if(msg.guild.voiceConnection) {
                var messageArray = msg.content.split(" ")
                messageArray.shift()
                messageArray.shift()

                var link = messageArray.join(" ")

                const stream = ytdl(link, {filter : 'audioonly'});
                const dispatcher = msg.guild.voiceConnection.playStream(stream, streamOptions);
                dispatchers[msg.channel.id] = dispatcher
            }
        }

        if(msg.content.startsWith("Shayne pause")) {
            if(msg.guild.voiceConnection && dispatchers[msg.channel.id] != null) {
                dispatchers[msg.channel.id].pause()
            }
        }

        if(msg.content.startsWith("Shayne resume")) {
            if(msg.guild.voiceConnection && dispatchers[msg.channel.id] != null) {
                dispatchers[msg.channel.id].resume()
            }
        }

        if(msg.content.startsWith("Shayne stop")) {
            if(msg.guild.voiceConnection && dispatchers[msg.channel.id] != null) {
                dispatchers[msg.channel.id].stop()
                dispatchers[msg.channel.id] = null
                delete dispatchers[msg.channel.id]
            }
        }

        if(msg.content.startsWith("Shayne fuck off")) {
            if(msg.guild.voiceConnection) {
                msg.guild.voiceConnection.disconnect()
            }
        }
    });
}

module.exports = music