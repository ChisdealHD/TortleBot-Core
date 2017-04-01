/**
 * Created by TortleWortle on 3/29/2017.
 */

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const dispatchers = []
const nowPlaying = []
const queue = []

const music = function(TortleBot) {
    this.joinVoice = function(message) {
        if (!message.member.voiceChannel) return message.channel.sendMessage('Bitch please')
        message.member.voiceChannel.join()
    }

    this.endCurrentSong = function(message) {
        if(typeof dispatchers[message.guild.id] !== 'undefined') {
            dispatchers[message.guild.id].dispatcher.end()
            return true
        }
        return false
    }

    this.removeDispatcher = function(message) {
        if(typeof dispatchers[message.guild.id] !== 'undefined') {
            dispatchers[message.guild.id].dispatcher.end()
            dispatchers[message.guild.id] = null
            delete dispatchers[message.guild.id]
            return true
        }
        return false
    }

    this.verifyURL = function(url) {
        if(!url.includes("https://" || "http://" || "youtube.com" || "youtu.be")) {
            return false
        }
        return true
    }

    this.addSongToQueue = function(message, url, force) {
        if(!verifyURL(url)) return message.channel.sendMessage("Invalid Youtube URL")

        if(typeof queue[message.guild.id] == 'undefined') {
            queue[message.guild.id] = []
        }

        var payload = {
            url: url,
            from: message.author.username
        }

        if(force) {
            queue[message.guild.id].unshift(payload, nowPlaying[message.guild.id])
            this.endCurrentSong(message)
        }else {
            queue[message.guild.id].push(payload)
        }
        this.processQueue(message);
    }


    this.processQueue = function(message) {
        let id = message.guild.id

        if(typeof dispatchers[id] !== 'undefined' && !dispatchers[id].ended) return
        if(!message.guild.voiceConnection) return

        let next = queue[id].shift()

        const stream = ytdl(next.url, {filter : 'audioonly'});
        nowPlaying[id] = next

        stream.on('error', function(error) {
            return message.channel.sendMessage("Something went wrong playing the video.");
        })

        const dispatcher = message.guild.voiceConnection.playStream(stream, streamOptions);


        dispatchers[id] = {
            ended: false,
            dispatcher
        }

        dispatcher.on("end", () => {
            dispatchers[id].ended = true
            nowPlaying[id] = null
            if(queue[id].length) {
                setTimeout(()=> {
                    this.processQueue(message)
                }, 200)
            }else {
                this.removeDispatcher(message)
            }
        })
    }

    TortleBot.addTraditionalCommand('np', message => {
        if(typeof nowPlaying[message.guild.id] !== 'undefined' && typeof nowPlaying[message.guild.id] !== null && message.guild.voiceConnection) {
            message.reply("Now playing: " + nowPlaying[message.guild.i].url)
        }else {
            message.reply("Currently idle.")
        }
    })

    TortleBot.addTraditionalCommand('skip', message => {
        if (!message.member.voiceChannel) return message.reply("YOU'RE NOT EVEN LISTENING!")

        if(endCurrentSong(message)) return message.reply("Lmao fuck this song, right?")
        message.reply("I'm not even playing..")
    })

    TortleBot.addTraditionalCommand('queue', message => {
        if(typeof queue[message.guild.id] !== 'undefined' && queue[message.guild.id].length) {
            var replyMsg = "Up next: \`\`\`"

            for (var i = 0; i < queue[message.guild.id].length; i++) {
                replyMsg += i + 1 + queue[message.guild.id][i].url + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }else {
            message.reply("Playlist is empty :c")
        }
    })


    TortleBot.addTraditionalCommand("spawn", this.joinVoice)

    TortleBot.addTraditionalCommand("play", message => {
        if(message.guild.voiceConnection) {
            var messageArray = message.content.split(" ")
            messageArray.shift()

            var link = messageArray[0]

            addSongToQueue(message, link)

        }else {
            message.reply("I'm not in a voice channel please spawn me in first")
        }
    })

    TortleBot.addTraditionalCommand("forceplay", message => {
        if(message.guild.voiceConnection) {
            var messageArray = message.content.split(" ")
            messageArray.shift()

            var link = messageArray[0]

            this.addSongToQueue(message, link, true)

        }else {
            message.reply("I'm not in a voice channel please spawn me in first")
        }
    })

    TortleBot.addTraditionalCommand("pause", message => {
        if(message.guild.voiceConnection && dispatchers[message.guild.id] != null) {
            dispatchers[message.guild.id].dispatcher.pause()
        }
    })

    TortleBot.addTraditionalCommand("resume", message => {
        if(message.guild.voiceConnection && dispatchers[message.guild.id] != null) {
            dispatchers[message.guild.id].dispatcher.resume()
        }
    })

    TortleBot.addTraditionalCommand("leave", message => {
        if(message.guild.voiceConnection) {
            removeDispatcher(message)
            message.guild.voiceConnection.disconnect()
        }
    })
}
module.exports = music