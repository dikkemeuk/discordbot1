const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {

	async run(guild, user) {

        const { logChannel } = guild.settings;

        if(!logChannel) return;
        let channel = this.client.channels.cache.get(logChannel)
        let reason;
        const bans = await guild.fetchBan(user.id)

        if(bans.reason) reason = bans.reason
        else reason = "No reason provided!"

        const emb = new MessageEmbed()
        .setTitle(`**Moderator notice!**`)
        .setDescription(`**User:** ${user.tag}\n**ID:** ${user.id} has recieved a ban!\n\n**Reason:** ${reason}`)
        .setColor("#FF0000")
        .setImage("https://media1.tenor.com/images/11baffb759ae7ca9d984153cf53a7768/tenor.gif?itemid=8540510")
        .setTimestamp()

        return channel.send(emb)
		
	}

};
