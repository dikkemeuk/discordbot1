const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {

	async run(member) {
		const { autoAssignRole } = member.guild.settings;
		const { welcomeChannel } = member.guild.settings;
		
		if(!welcomeChannel) return null;
		if(member.user.bot) return null;

		let channel = this.client.channels.cache.get(welcomeChannel)
		let embed = new MessageEmbed()
		.setTitle("**Welcome!**")
		.setDescription(`Welcome <@${member.id}> to **${member.guild.name}**!\n\nWe hope you have a great time 😄`)
		.setThumbnail(member.user.displayAvatarURL())
		.setTimestamp()
		.setColor("#09ff00")
		.setFooter(`You are member ${member.guild.memberCount}`, member.guild.iconURL())
		
		channel.send(embed)
		
		
		if (!autoAssignRole) return null;

		const hasManageRoles = member.guild.me.hasPermission('MANAGE_ROLES');

		if (!hasManageRoles) return null;

		return member.roles.add(autoAssignRole);
	}

};
