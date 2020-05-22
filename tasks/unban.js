const { Task } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Task {

	async run({ guild, user }) {
        const _guild = this.client.guilds.cache.get(guild);
        
        if (!_guild) return console.log(`no Guild found!`);
        
        const tasks = this.client.schedule.tasks

        let bans = [];
        console.log("1")
        
        tasks.forEach(entry => {
            if(entry.taskName === "unban") bans.push(entry)
        })
        console.log(`Bans: ${bans}`)
        let ban = [];

        bans.forEach(entry => {
            if(entry.data.userid === user.id) ban.push(entry)
            console.log('2')
        })
        console.log(`ban:    ${ban}`)
        await _guild.members.unban(user, "Automatic unban!")
        
        const logChannel = _guild.settings.logChannel
        console.log('3')
        let channel = await _guild.channels.get(logChannel)
        if(!channel) return;



        let unbanEmbed = new MessageEmbed()
        .setTitle(`**Automatic unban!**`)
        .setColor(`#09ff00`)
        .setDescription(`${ban[0].data.userid} got automatically unbanned.\n\nThis person originally got banned for ${ban[0].data.bReason}\nBy: <@${ban[0].data.admin}>`)
        .setTimestamp()
        console.log('4')
        return channel.send(unbanEmbed)

	}

};
