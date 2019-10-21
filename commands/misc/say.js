const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "say",
    category: "misc",
    description: "Says your message through the bot",
    usage: "<input>",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" ")); // creates a variable with the user information
        
        // Member variables
        const joined = formatDate(member.joinedAt);
        const role = member.roles
            .filter(r => r.id !== message.guild.id) // prefents @everyone appearing at the list
            .map(r => r)
            .join(", ") || "No roles";

        // User variables
        const created = formatDate(member.user.createdAt); 

        if(message.deletable) message.delete(); //check if the message is deletable and delete it
        if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));

        if(args[0].toLowerCase() === "embed"){
            const embed = new RichEmbed() // create a new embed
                .setColor(rolecolor)
                .setDescription(args.slice(1).join(" "))
                .setAuthor(`${member.tag}`, member.displayAvatarURL)
                .setTimestamp()
                .setFooter(`© 2019 - Developed by Mantoan`,"https://www.iconbunny.com/icons/media/catalog/product/4/2/4265.9-robot-ii-icon-iconbunny.jpg");
            
            message.channel.send(embed); // send embed message
        }else {
            message.channel.send(`${args.join(" ")}\nAuthor: \`${member.tag}\``);
        }
    }
}