/**
 * Created by TortleWortle on 3/29/2017.
 */

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const dispatchers = []
const queue = []

const music = function(ShayneBot) {
    this.joinVoice = function(message) {
        if (!message.member.voiceChannel) return message.channel.sendMessage('Bitch please')
        message.member.voiceChannel.join()
    }

    this.verifyURL = function(url) {
        if(!url.includes("https://" || "http://" || "youtube.com" || "youtu.be")) {
            return false
        }
        return true
    }

    this.processQueue = function(message) {
        let id = message.guild.id
        //if the dispatcher hasn't ended, return

        if(typeof dispatchers[id] !== 'undefined' && !dispatchers[id].ended) return
        if(!message.guild.voiceConnection) return


        const stream = ytdl(queue[id][0].url, {filter : 'audioonly'});

        stream.on('error', function(error) {
            return message.channel.sendMessage("Something went wrong playing the video.");
        })

        const dispatcher = message.guild.voiceConnection.playStream(stream, streamOptions);


        dispatchers[id] = {
            ended: false,
            dispatcher
        }

        dispatcher.on("end", () => {
            nextSong(message)
        })
    }

    this.nextSong = function(message) {
        let id = message.guild.id
        if(typeof queue[id] == 'undefined' || queue[id] == null) {
            message.channel.sendMessage("Queue is empty")
            return
        }
        if(queue[id].length <= 1) {
            //Pause video if it's being skipped while it's the only one playing and remove it from the queue
            dispatchers[id].dispatcher.pause()
            queue[id].shift()
            return
        }
        queue[id].shift()
        dispatchers[id].ended = true
        setTimeout(()=> {
            processQueue(message)
        }, 200)
    }

    ShayneBot.addTraditionalCommand('np', message => {
        if(queue[message.guild.id].length) {
            message.reply("Now playing: " + queue[message.guild.id][0].url)
        }else {
            message.reply("Queue is empty :c")
        }
    })

    ShayneBot.addTraditionalCommand('skip', message => {
        if (!message.member.voiceChannel) return message.reply("YOU'RE NOT EVEN LISTENING!")

        if(typeof dispatchers[message.guild.id] !== 'undefined') {
            dispatchers[message.guild.id].dispatcher.end()
            dispatchers[message.guild.id].ended = true
            message.reply("Lmao fuck this song, right?")
            return
        }

        message.reply("I'm not even playing anything.")
    })

    ShayneBot.addTraditionalCommand('queue', message => {
        if(typeof queue[message.guild.id] !== 'undefined' && queue[message.guild.id].length) {
            var replyMsg = "Current playlist: \`\`\`"

            for (var i = 0; i < queue[message.guild.id].length; i++) {
                replyMsg += queue[message.guild.id][i].url + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }else {
            message.reply("Playlist is empty :c")
        }
    })


    ShayneBot.addCommand("come here", this.joinVoice)

    ShayneBot.addCommand("play", message => {
        if(message.guild.voiceConnection) {
            var messageArray = message.content.split(" ")
            messageArray.shift()
            messageArray.shift()

            var link = messageArray[0]

            if(!verifyURL(link)) {
                return message.channel.sendMessage("Invalid Youtube URL")
            }

            if(typeof queue[message.guild.id] == 'undefined') {
                queue[message.guild.id] = []
            }

            queue[message.guild.id].push({
                url: link,
            })

            processQueue(message);

        }else {
            message.reply("Lure me in first, Daddy pls")
        }
    })

    ShayneBot.addCommand("pause", message => {
        if(message.guild.voiceConnection && dispatchers[message.guild.id] != null) {
            dispatchers[message.guild.id].dispatcher.pause()
        }
    })

    ShayneBot.addCommand("resume", message => {
        if(message.guild.voiceConnection && dispatchers[message.guild.id] != null) {
            dispatchers[message.guild.id].dispatcher.resume()
        }
    })

    ShayneBot.addCommand("go away", message => {
        if(message.guild.voiceConnection) {
            if(typeof dispatchers[message.guild.id] !== 'undefinedWhy') {
                dispatchers[message.guild.id].dispatcher.end()
                dispatchers[message.guild.id] = null
                delete dispatchers[message.guild.id]
            }
            message.guild.voiceConnection.disconnect()
        }
    })
}
module.exports = music