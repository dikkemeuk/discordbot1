const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['MANAGE_MESSAGES'],
			runIn: ['text'],
			aliases: ['purge', 'nuke'],
			description: 'Prunes a certain amount of messages w/o filter.',
			usage: '[limit:integer] [link|invite|bots|you|me|upload|user:user]',
			usageDelim: ' '
		});
	}

	async run(message, [limit = 50, filter = null]) {
		let messages = await message.channel.messages.fetch({ limit: 100 });
		if (filter) {
			const user = typeof filter !== 'string' ? filter : null;
			const type = typeof filter === 'string' ? filter : 'user';
			messages = messages.filter(this.getFilter(message, type, user));
		}
		messages = messages.array().slice(0, limit);
		await message.channel.bulkDelete(messages);
		return message.sendMessage(`Successfully deleted ${messages.length} messages from ${limit}.`);
	}

	getFilter(message, filter, user) {
		switch (filter) {
			case 'link': return mes => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
			case 'invite': return mes => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
			case 'bots': return mes => mes.author.bot;
			case 'you': return mes => mes.author.id === this.client.user.id;
			case 'me': return mes => mes.author.id === message.author.id;
			case 'upload': return mes => mes.attachments.size > 0;
			case 'user': return mes => mes.author.id === user.id;
			default: return () => true;
		}
	}

};
