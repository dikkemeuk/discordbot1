const { Command } = require('klasa');

let skip = [];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'skip',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Skip a song!',
            quotedStringSupport: false,
            usage: '[force:string]',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [force]) {

        if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
        if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
        
    
        if (!msg.member.voice.channel)
            return await msg.channel.send('You\'re not even in a voicechannel..');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('You\'re in the wrong channel...');
        
            if (!skip) skip = [];
    if(force === 'force') {
        if(!msg.member.roles.cache.get(msg.guild.settings.djRole)) return msg.send(`You're missing permissions to force the skip..\nYou need the DJ role`)
        msg.send(`Succesfully skipped ${dispatcher.current.info.title}`)
            skip = [];
            return await dispatcher.player.stopTrack();

    }
    else if(!force) {
            
        var amountUsers = msg.member.voice.channel.members.size;
        var amountSkip = Math.ceil(amountUsers / 2);

        if (skip.includes(msg.member.id)) return msg.send(`Sorry you already voted! ${skip.length}/${amountSkip}`);
        skip.push(msg.member.id);
        
        if(amountUsers === 2) {

            msg.send(`Succesfully skipped **${dispatcher.current.info.title}**`)
            skip = [];
            return await dispatcher.player.stopTrack();

        }

        //await dispatcher.player.stopTrack();

        if (skip.length >= amountSkip) {
 
            msg.send(`Succesfully skipped ${dispatcher.current.info.title}`)
            skip = [];
            return await dispatcher.player.stopTrack();
     
        }


        msg.send(`Added your vote. **${skip.length}/${amountSkip}**`)


    }
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};