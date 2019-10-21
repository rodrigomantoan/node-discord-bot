const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "userinfo",
    aliases: ["whois", "user", "who"],
    category: "mod",
    description: "Returns user information",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" ")); // creates a variable with the user information
        
        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id) // prefents @everyone appearing at the list
            .map(r => r)
            .join(", ") || "No roles";

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setTitle(`${member.displayName} info. Requested by ${message.member.displayName}`)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor("#007d13")

            .addField("Member information", stripIndents`**Diplay name:** ${member.displayName}
            **Joined At:** ${joined}
            **Roles:** ${roles}`, true)

            .addField("User Information", stripIndents`**ID:** ${member.user.id}
            **Username:** ${member.user.tag}
            **Created At:** ${created}`, true)

            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            if(member.user.presence.game) {
                let presenceType = 'Playing'
                if(member.user.presence.game.type == 1){ presenceType = 'Playing'; }
                    else if (member.user.presence.game.type == 2){ presenceType = 'Streaming'; }
                    else if(member.user.presence.game.type == 3){ presenceType = 'Watching'; }
                embed.addField(`Currently`, `${presenceType} ${member.user.presence.game.name}`);
            }

        message.channel.send(embed);
    }
}