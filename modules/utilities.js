/**
 * Created by TortleWortle on 3/31/2017.
 */

const halp = function(ShayneBot) {
    ShayneBot.addCommand("halp", message => {
        var commands = ShayneBot.getCommands()

        if(commands.length) {
            var replyMsg = "I listen to these words my lord: \`\`\`"

            for (var i = 0; i < commands.length; i++) {
                replyMsg += ShayneBot.getDisplayName(message) + " " + commands[i].index + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }
    })

    ShayneBot.addTraditionalCommand("halp", message => {
        var commands = ShayneBot.getTraditionalCommands()

        if(commands.length) {
            var replyMsg = "Also these: \`\`\`"

            for (var i = 0; i < commands.length; i++) {
                replyMsg += ShayneBot.getPrefix() + commands[i].index + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }
    })
}

module.exports = halp