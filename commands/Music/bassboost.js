const { Command } = require('klasa');
let bassboost = false
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'bassboost',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['bboost'],
            guarded: false,
            nsfw: false,
            permissionLevel: 3,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Boost the bass in a song.',
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
        
        if(!bassboost) {

        
        // [0, 0.30, 1, 0.20]
        dispatcher.player.setEqualizer([
            { band: 0, gain: 0.17 },
            { band: 1, gain: 0.15 },
            { band: 2, gain: 0.01}
            
        ])
        dispatcher.player.setVolume(80);

        bassboost = true
        return msg.reply("Bassboost enabled!");

        } else if(bassboost) {

            
        // [0, 0.30, 1, 0.20]
        await dispatcher.player.setEqualizer([
            { band: 0, gain: 0 },
            { band: 1, gain: 0 },
            { band: 2, gain: 0}
        ])
        msg.reply("Bassboost disabled!")
        return bassboost = false
        
        }
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};