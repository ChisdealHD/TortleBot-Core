/**
 * Created by TortleWortle on 3/31/2017.
 */

const goplay = function(ShayneBot) {
        ShayneBot.addCommand("go play", message => {
            var messageArray = message.content.split(" ")
            messageArray.shift()
            messageArray.shift()
            messageArray.shift()

            var newGame = messageArray.join(" ")
            message.reply("Ok, I'm gonna play " + newGame)
            bot.user.setGame(newGame)
        })
    }

module.exports = goplay