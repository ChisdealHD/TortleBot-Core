const ShayneBot = function(client) {
    this.client = client
    this.traditionalCommands = []
    this.commands = []
    this.defaultPrefix = "!"

    this.client.on('message', msg => {
        this.handleMessage(msg)
    })

    return this
}


ShayneBot.prototype.handleMessage = function(message) {
    if(message.author.bot) {
        return
    }
    var msgContent = message.content.toLowerCase()

    //If there are any tradition commands loop over them and handle them
    if(this.traditionalCommands.length) {
        for(var i = 0; i < this.traditionalCommands.length; i++) {
            var index = this.commands[i].index
            var handler = this.commands[i].handler
            if(msgContent.startsWith(index.toLowerCase() + " ")) {
                handler(message)
            }
        }
    }
    if(this.commands.length) {
        let prefix = message.guild.member(this.client.user).displayName

        for(var i = 0; i < this.commands.length; i++) {

            var index = this.commands[i].index
            var handler = this.commands[i].handler

            if(msgContent.startsWith(prefix.toLowerCase() + " " + index.toLowerCase())) {
                handler(message)
            }
        }
    }
}

//Traditional command as in !play etc
ShayneBot.prototype.addTraditionalCommand = function(index, handler) {
    this.traditionalCommands.push({
        index,
        handler
    })
}
ShayneBot.prototype.addCommand = function(index, handler) {
    this.commands.push({
        index,
        handler
    })
}

ShayneBot.prototype.getCommands = function() {
    return this.commands
}

ShayneBot.prototype.getDisplayName = function(message) {
    return message.guild.member(this.client.user).displayName
}
ShayneBot.prototype.getPrefix = function() {
    //temporary
    // Gets the defaultprefix (future is gonna be an array[DiscId] = Prefix)
    return this.defaultPrefix
}
ShayneBot.prototype.setPrefix = function(prefix) {
    // temporary
    // Sets the defaultprefix (future is gonna be an array[DiscId] = Prefix)
    return this.defaultPrefix = prefix
}
module.exports = ShayneBot