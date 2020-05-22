const { Event } = require('klasa');
const { Collection } = require("discord.js")
module.exports = class extends Event {

	

	run(message) {
		if (message.command && message.command.deletable) {
			for (const msg of message.responses) {
				msg.delete();
			}
		}

		if(message.author.bot) return;
		let snipes = this.client.channelSnipes.get(message.channel.id) || this.client.userSnipes.get(message.author.id);
		if(!snipes) snipes = [];
		snipes.unshift({
			content: message.content,
			author: message.author,
			channel: message.channel,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
			date: new Date().toLocaleString("en-GB", { dataStyle: "full"})
		})
		this.client.channelSnipes.splice(100);
		this.client.userSnipes.splice(20)
		this.client.channelSnipes.set(message.channel.id, snipes)
		this.client.userSnipes.set(message.author.id, snipes)
		

		
		

		

	}

};
