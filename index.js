const { Client, RichEmbed, Collection } = require("discord.js"); // import some of the components of discord.js
// const { config } = require("dotenv"); // ability to use .env files

const prefix = "."; // defines bot prefix

// create bot var and disable ability to mention @everyone
const bot = new Client({
    disableEveryone: true // disables ability to mention @everyone
});

bot.commands = new Collection(); // create new collection of commands
bot.aliases = new Collection(); // create new colletion of aliases

var app = require('http');
app.createServer().listen(process.env.PORT);

// set configuration file (needs to be created if you're using the bot)
/* config ({
    path: __dirname + "/.env" //set the path of the configuration file (if you place it at public git, make sure to gitignore)
}); */

// create the command array
["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

// functions to run when bot is ready
bot.on("ready", () => {
    console.log (`${bot.user.username} is now online, have fun!`); // log on console that the bot is ready
    // create presence to the bot 
    bot.user.setPresence({
        game: {
            name: "me getting developed", // presence message
            type: "WATCHING" // presence type
        }
    });
});

bot.on("message", async message => { // runs whenever a message is sent, conditions apply
    console.log(`${message.author.tag} said: ${message.content}`); // log every message sent
    const rolecolor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //create role color for the bot
    
    if(message.author.bot) return; // ignore if it has been sent by a bot
    if(!message.guild) return; // ignore if it was a direct message
    if(!message.content.startsWith(prefix)) return; // ignore if the message don't start with prefix
    if(!message.member) message.member = await message.guild.fetchMember(message); // if member doesn't exist fetchMember

    const args = message.content.slice(prefix.length).trim().split(/ +/g); // remove prefix and transfor in an array
    const cmd = args.shift().toLowerCase(); // transform command to lowercase
    if(cmd.length === 0) return; // ignore if the command is empty

    let command = bot.commands.get(cmd); // create command var to import commands
    if(!command) command = bot.commands.get(bot.aliases.get(cmd)); // if command doesn't exist, get aliases
    if(command) command.run(bot, message, args); // run the bot if command exists

});

bot.login(process.env.TOKEN); // login the bot using the token
