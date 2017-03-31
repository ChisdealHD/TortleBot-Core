const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });

const TortleBot = function(token) {
    client.login(token)
    this.client = client
    this.traditionalCommands = []
    this.commands = []
    this.data = []
    this.config = null
    this.defaultPrefix = "!"

    this.client.on('message', msg => {
        this.handleMessage(msg)
    })

    return this
}


TortleBot.prototype.handleMessage = function(message) {
    if(message.author.bot) {
        return
    }
    var msgContent = message.content.toLowerCase()

    //If there are any tradition commands loop over them and handle them
    if(this.traditionalCommands.length) {
        for(var i = 0; i < this.traditionalCommands.length; i++) {
            var index = this.traditionalCommands[i].index
            var handler = this.traditionalCommands[i].handler
            if(msgContent.startsWith(this.defaultPrefix.toLowerCase() + index.toLowerCase())) {
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
TortleBot.prototype.addTraditionalCommand = function(index, handler) {
    this.traditionalCommands.push({
        index,
        handler
    })
}
TortleBot.prototype.addCommand = function(index, handler) {
    this.commands.push({
        index,
        handler
    })
}

TortleBot.prototype.getCommands = function() {
    return this.commands
}
TortleBot.prototype.getTraditionalCommands = function() {
    return this.traditionalCommands
}
TortleBot.prototype.setGame = function (game){
    return this.client.setGame(game)
}
TortleBot.prototype.getDisplayName = function(message) {
    return message.guild.member(this.client.user).displayName
}
TortleBot.prototype.getPrefix = function() {
    //temporary
    // Gets the defaultprefix (future is gonna be an array[DiscId] = Prefix)
    return this.defaultPrefix
}
TortleBot.prototype.setPrefix = function(prefix) {
    // temporary
    // Sets the defaultprefix (future is gonna be an array[DiscId] = Prefix)
    return this.defaultPrefix = prefix
}
TortleBot.prototype.registerModule = function(module) {
    module(this)
}
TortleBot.prototype.get = function(index, defaultValue) {
    if(this.data[index] !== 'undefined') {
        return this.data[index]
    }
    return defaultValue
}
TortleBot.prototype.set = function(index, value) {
    return this.data[index] = value
}
module.exports = TortleBot