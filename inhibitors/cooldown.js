const { Inhibitor } = require('klasa');
const Discord = require("discord.js")
module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	run(message, command) {
		if (message.author === this.client.owner || command.cooldown <= 0) return;

		const existing = command.cooldowns.get(message.levelID);

		if (existing && existing.limited) {

			const time = existing.remainingTime / 1000

                var hours = ~~(time / 3600);
                var minutes = ~~((time % 3600) / 60);
                var seconds = ~~time % 60;

                var ret = "";

                if (hours > 0) {
                    ret += "" + hours + " hours " + (
                        minutes < 10
                            ? "0"
                            : ""
                    );
                }

                ret += "" + minutes + " minutes " + (
                    seconds < 10
                        ? "0"
                        : ""
                );
                ret += "" + seconds;

			let coolEmbed = new Discord.MessageEmbed()
			.setTitle("**Cooldown!**")
			.setDescription(`You have just used this command!\n\nTry again in:\n**${ret} seconds**`)
			.setColor("RANDOM")
			
			return message.send(coolEmbed)

		};
	}

};


