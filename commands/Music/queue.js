const { Command, RichDisplay } = require('klasa');
const Discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'queue',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['next'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'I will show the current queue',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {

        if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
        if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
        
        if (!msg.member.voice.channel)
        return await msg.channel.send('How \'bout you join a voicechannel first?');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('Wrong voicechannel...');

        
        let num = 1

        let resp = ""
        
        dispatcher.queue.forEach(entry => {
            if(num === 11) {
                
             return;
            }
            resp += `**${num++}**  -  *${entry.info.title}*\nRequested by: <@${entry.requester}>\n\n`
        })

       let queueEmbed = new Discord.MessageEmbed()
        .setTitle("**Queue**")
        .setDescription(`**Here is the queue**\nAmount of songs in the queue (not counting the song that is currently playing) = ${dispatcher.queue.length}\n\n**Now Playing:**\n${dispatcher.current.info.title}\n\n${resp}`)
        .setColor("RANDOM")
        msg.send(queueEmbed)
        
        
    }   

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};