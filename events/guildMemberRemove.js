const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {

	async run(member) {

        const { logChannel } = member.guild.settings;

        if(!logChannel) return;
        let channel = this.client.channels.cache.get(logChannel)
        
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });

        const kickLog = fetchedLogs.entries.first();

        if (!kickLog) return;

        
        if(kickLog) {

            let { executor, target } = kickLog;

            if(target.id !== member.id) return;
            
            let kickEmbed = new MessageEmbed()
            .setTitle("**Moderator Notice!**")
            .setDescription(`User ${target.tag} with ID: ${target.id} recieved a kick!`)
            .setColor("#FF0000")
            .setTimestamp()
            .setImage("https://media.giphy.com/media/qiiimDJtLj4XK/giphy.gif")
            .setFooter(`This action got performed on:`, executor.displayAvatarURL())

            return channel.send(kickEmbed)

        }
	
	}

};
