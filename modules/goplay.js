/**
 * Created by TortleWortle on 3/31/2017.
 */

const goplay = function(TortleBot) {
        TortleBot.addCommand("go play", message => {
            var messageArray = message.content.split(" ")
            messageArray.shift()
            messageArray.shift()
            messageArray.shift()

            var newGame = messageArray.join(" ")
            message.reply("Ok, I'm gonna play " + newGame)
            TortleBot.client.user.setGame(newGame)
        })
    }

module.exports = goplay