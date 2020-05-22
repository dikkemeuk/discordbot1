const { Event } = require('klasa');
const { Collection } = require('discord.js')
module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'snipeEvent',
            enabled: true,
            event: 'messageDelete',
            once: false
        });
    }

    async run(message) {
        
        if(message.author.bot) return;

		let snipes;

		let channelSnipes = this.client.channelSnipes.get(message.channel.id) || [];
		if(channelSnipes) snipes = [];
		let userSnipes = this.client.userSnipes.get(message.author.id) || [];
		if(userSnipes) snipes = [];
		
		snipes.unshift({
			content: message.content,
			author: message.author,
			channel: message.channel,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
			date: new Date().toLocaleString("en-GB", { dataStyle: "full"})
		})
		snipes.splice(50)
		this.client.channelSnipes.set(message.channel.id, snipes)
		this.client.userSnipes.set(message.author.id, snipes)

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};