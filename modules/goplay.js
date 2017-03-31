/**
 * Created by TortleWortle on 3/31/2017.
 */

const goplay = function(bot) {
    bot.on('message', msg => {
        let prefix = msg.guild.member(bot.user).displayName

        if(msg.content.startsWith(prefix + " go play ")) {
            var messageArray = msg.content.split(" ")
            messageArray.shift()
            messageArray.shift()
            messageArray.shift()

            var newGame = messageArray.join(" ")
            msg.reply("Ok, I'm gonna play " + newGame)
            bot.user.setGame(newGame)
        }
    })
}

module.exports = goplay