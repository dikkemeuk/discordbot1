const { Command } = require('klasa');
const Discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'volume',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['vol'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Adjust the volume of this song.',
            quotedStringSupport: false,
            usage: '<vol:integer>',
            usageDelim: undefined,
            extendedHelp: 'Default volume = 100.'
        });
    }

    async run(msg, [vol]) {

        if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
        if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
        
        if (!msg.member.voice.channel)
            return await msg.channel.send('How \'bout you join a voicechannel first?');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('Wrong voicechannel...');
        if (!vol || isNaN(vol)) 
            return await msg.channel.send(`Currently playing at **${dispatcher.player.volume}%**`);
        const volume = Number(vol);
        if (volume < 10 || volume > 105){
            let nuhEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("**Nah**")
            .setImage("https://media1.tenor.com/images/c5308dbb1739929f698eaf13fb16759b/tenor.gif?itemid=13950022")

            return await msg.channel.send(nuhEmbed);
        }
            
        await dispatcher.player.setVolume(volume);
        await msg.channel.send(`The playback volume is now set to **${volume}%**`);

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};