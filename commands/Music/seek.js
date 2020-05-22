const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'seek',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['skipto'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'skip to a certain time in the song.',
            quotedStringSupport: false,
            usage: '<time:string>',
            usageDelim: undefined,
            extendedHelp: ''
        });
    }

    async run(msg, [time]) {
        
        if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
        if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
        
        if (!msg.member.voice.channel)
            return await msg.channel.send('How \'bout you join a voicechannel first?');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('Wrong voicechannel...');
        const choiceDur = time.split(":");
        if (choiceDur.length < 2) return msg.channel.send("That does not look like a duration to me..");
        const optDurr = (parseInt(choiceDur[0], 10) * 60000) + ((parseInt(choiceDur[1], 10) % 60000) * 1000);

        if(optDurr > dispatcher.current.info.length) return msg.send("That's past the end of this song..")

        await dispatcher.player.seekTo(optDurr)
        await msg.channel.send(`Seeking to: ${time}`);
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};