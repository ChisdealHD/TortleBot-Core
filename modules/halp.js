/**
 * Created by TortleWortle on 3/31/2017.
 */

const halp = function(ShayneBot) {
    ShayneBot.addCommand("halp", message => {
        var commands = ShayneBot.getCommands()

        if(commands.length) {
            var replyMsg = "I listen to these words my lord: \`\`\`"

            for (var i = 0; i < commands.length; i++) {
                console.log(commands[i].index)
                replyMsg += ShayneBot.getDisplayName(message) + " " + commands[i].index + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }
    })
}

module.exports = halp