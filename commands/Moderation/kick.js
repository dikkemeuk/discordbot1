const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['KICK_MEMBERS'],
			runIn: ['text'],
			description: 'Kicks a mentioned user. Currently does not require reason (no mod-log).',
			usage: '<member:member> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [member, ...reason]) {
		if (member.id === message.author.id) throw 'Why would you kick yourself?';
		if (member.id === this.client.user.id) throw 'Have I done something wrong?';

		if (member.roles.highest.position >= message.member.roles.highest.position) throw 'You cannot kick this user.';
		if (!member.kickable) throw 'I cannot kick this user.';

		reason = reason.length > 0 ? reason.join(' ') : null;

		const { logChannel } = member.guild.settings;

        if(!logChannel) return;
		let channel = message.guild.channels.cache.get(logChannel)
		
		return member.kick(reason).catch(() => null);
		
		
	}

};
