/**
 * Created by TortleWortle on 3/29/2017.
 */

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const dispatchers = []

const music = function(ShayneBot) {
    this.joinVoice = function(message) {
        if (!message.guild.voiceConnection) {
            if (!message.member.voiceChannel) return message.channel.sendMessage('Bitch please')
            message.member.voiceChannel.join()
        }
    }

    ShayneBot.addCommand("come here", this.joinVoice)

    ShayneBot.addCommand("play", message => {
        if(message.guild.voiceConnection) {
            var messageArray = message.content.split(" ")
            messageArray.shift()
            messageArray.shift()

            var link = messageArray[0]

            if(!link.includes("https://" || "http://" || "youtube.com" || "youtu.be")) {
                return message.channel.sendMessage("pls gib yt link.");
            }
            const stream = ytdl(link, {filter : 'audioonly'});

            stream.on('error', function(error) {
                return message.channel.sendMessage("Could not play video.");
            })

            const dispatcher = message.guild.voiceConnection.playStream(stream, streamOptions);
            dispatchers[message.channel.id] = dispatcher
        }else {
            message.reply("Lure me in first, Daddy pls")
        }
    })

    ShayneBot.addCommand("pause", message => {
        if(message.guild.voiceConnection && dispatchers[message.channel.id] != null) {
            dispatchers[message.channel.id].pause()
        }
    })

    ShayneBot.addCommand("resume", message => {
        if(message.guild.voiceConnection && dispatchers[message.channel.id] != null) {
            dispatchers[message.channel.id].resume()
        }
    })

    ShayneBot.addCommand("fuck off", message => {
        if(message.guild.voiceConnection) {
            if(dispatchers[message.channel.id] != null) {
                dispatchers[message.channel.id].end()
                dispatchers[message.channel.id] = null
                delete dispatchers[message.channel.id]
            }
            message.guild.voiceConnection.disconnect()
        }
    })
}
module.exports = music