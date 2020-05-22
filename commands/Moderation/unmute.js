
const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Unmutes a mentioned user.',
			usage: '<member:member> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [member, reason]) {
		if (member.roles.highest.position >= msg.member.roles.highest.position) throw 'You cannot unmute this user.';
		if (!member.roles.cache.has(msg.guild.settings.muteRole)) throw 'This user is not muted.';

		await member.roles.remove(msg.guild.settings.muteRole);

		return msg.sendMessage(`${member.user.tag} was unmuted.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};