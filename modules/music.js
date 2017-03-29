/**
 * Created by TortleWortle on 3/29/2017.
 */

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const dispatchers = []

const music = function(bot) {

    bot.on('message', msg => {

        let prefix = msg.guild.member(bot.user).displayName

        if(msg.author.bot) {
            return
        }

        if(msg.content.startsWith(prefix + " come here")) {
            if (!msg.guild.voiceConnection) {
                if (!msg.member.voiceChannel) return msg.channel.sendMessage('Bitch please')
                msg.member.voiceChannel.join()
            }
        }

        if(msg.content.startsWith(prefix + " play")) {
            if(msg.guild.voiceConnection) {
                var messageArray = msg.content.split(" ")
                messageArray.shift()
                messageArray.shift()

                var link = messageArray[0]

                if(!link.includes("https://" || "http://" || "youtube.com" || "youtu.be")) {
                    return msg.channel.sendMessage("pls gib yt link.");
                }
                const stream = ytdl(link, {filter : 'audioonly'});

                stream.on('error', function(error) {
                    return msg.channel.sendMessage("Could not play video.");
                })

                const dispatcher = msg.guild.voiceConnection.playStream(stream, streamOptions);
                dispatchers[msg.channel.id] = dispatcher
            }
        }

        if(msg.content.startsWith(prefix + " pause")) {
            if(msg.guild.voiceConnection && dispatchers[msg.channel.id] != null) {
                dispatchers[msg.channel.id].pause()
            }
        }

        if(msg.content.startsWith(prefix + " resume")) {
            if(msg.guild.voiceConnection && dispatchers[msg.channel.id] != null) {
                dispatchers[msg.channel.id].resume()
            }
        }

        if(msg.content.startsWith(prefix + " fuck off")) {
            if(msg.guild.voiceConnection) {
                if(dispatchers[msg.channel.id] != null) {
                    dispatchers[msg.channel.id].end()
                    dispatchers[msg.channel.id] = null
                    delete dispatchers[msg.channel.id]
                }
                msg.guild.voiceConnection.disconnect()
            }
        }
    });
}

module.exports = music