/**
 * Created by TortleWortle on 3/31/2017.
 */

const halp = function(TortleBot) {
    TortleBot.addCommand("halp", message => {
        var commands = TortleBot.getCommands()

        if(commands.length) {
            var replyMsg = "I listen to these words my lord: \`\`\`"

            for (var i = 0; i < commands.length; i++) {
                replyMsg += TortleBot.getDisplayName(message) + " " + commands[i].index + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }
    })

    TortleBot.addTraditionalCommand("halp", message => {
        var commands = TortleBot.getTraditionalCommands()

        if(commands.length) {
            var replyMsg = "U in need, I halp! \`\`\`"

            for (var i = 0; i < commands.length; i++) {
                replyMsg += TortleBot.getPrefix() + commands[i].index + "\n"
            }

            replyMsg += "\`\`\`"
            message.reply(replyMsg)
        }
    })
}

module.exports = halp