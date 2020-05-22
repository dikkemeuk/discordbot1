const { Command } = require('klasa');
const Discord = require("discord.js")
const ytdl = require("ytdl-core")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'np',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['nowplaying', 'thissong'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Get the position of the song you\'re in',
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
        const time = dispatcher.player.position / 1000
            var hours = ~~(time / 3600);
            var minutes = ~~((time % 3600) / 60);
            var seconds = ~~time % 60;

            var ret = "";

            if (hours > 0) {
                ret += "" + hours + ":" + (
                    minutes < 10
                        ? "0"
                        : ""
                );
            }

            ret += "" + minutes + ":" + (
                seconds < 10
                    ? "0"
                    : ""
            );
            ret += "" + seconds;

            const timee = dispatcher.current.info.length / 1000
            var hour = ~~(timee / 3600);
            var minute = ~~((timee % 3600) / 60);
            var second = ~~timee % 60;

            var res = "";

            if (hour > 0) {
                res += "" + hour + ":" + (
                    minute < 10
                        ? "0"
                        : ""
                );
            }

            res += "" + minute + ":" + (
                second < 10
                    ? "0"
                    : ""
            );
            res += "" + second;
        
        const info = await ytdl.getInfo(dispatcher.current.info.uri);

        let img = info.video_id
        let url = info.video_url
        let songname = info.title

        
        

        let embed = new Discord.MessageEmbed()
        .setTitle(`**${songname}**`)
        .setImage(`https://img.youtube.com/vi/${img}/maxresdefault.jpg`)
        .setDescription(`You're currently listening to:\n**${dispatcher.current.info.title}**\n\n\nYou're at this time in the song: **${ret}**.\nThe song duration is: **${res}**.`)
        .setColor("RANDOM")
        .setURL(url)
        .setFooter(`Channelname: ${info.author.name}`, info.author.avatar)
        await msg.send("Getting some info, sit tight!").then(message => message.delete()).then(msg.send(embed))
         return;    
    }

    
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};