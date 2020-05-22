const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'clearqueue',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['cq', 'clear'],
            guarded: false,
            nsfw: false,
            permissionLevel: 3,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Clear the queue..',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, number) {

        if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
        if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
        
        if (!msg.member.voice.channelID)
            return await msg.channel.send('You are not in a voice channel..');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('Wrong voicechannel, not gonna do that...');
        
        
        
            await msg.send(`The queue is now empty..`)
            dispatcher.queue.length = 0;
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};