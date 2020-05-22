const { Command } = require('klasa');
const Discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'play',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['p'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Play a song..',
            quotedStringSupport: false,
            usage: '<searchquery:string>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [searchquery]) {

    if(msg.guild.settings.voiceCmds === undefined) return msg.send("You need to set the defaultchannel for voicecommands first!\n`(!conf set voiceCmds <#channel>)`")
    if(msg.channel.id !== msg.guild.settings.voiceCmds) return msg.send(`Voicecommands only work in <#${msg.guild.settings.voiceCmds}>`)
    
    function checkURL(string) {
            try {
                new URL(string);
                return true;
            } catch (error) {
                return false;
            }
        }

        if (!msg.member.voice.channelID)
        return await msg.channel.send('You are not in a voice channel');
    if (!searchquery)
        return await msg.channel.send('You did not specify a link or searchquery');
    const node = this.client.shoukaku.getNode();
    const query = searchquery
    if (checkURL(query)) {
        const result = await node.rest.resolve(query);
        if (!result)
            return await msg.channel.send('Admiral, I didn\'t find anything in the query you gave me');
        const { type, tracks, playlistName } = result;
        const track = tracks.shift();

        track.requester = msg.author.id

        const isPlaylist = type === 'PLAYLIST';
        const res = await this.client.queue.handle(node, track, msg);
        if (isPlaylist) {
            track.requester = msg.author.id
            for (const track of tracks) {
                track.requester = msg.author.id
                await this.client.queue.handle(node, track, msg);
            }
        }   
        await msg.channel.send(isPlaylist ? `Added the playlist **${playlistName}** in queue!` : `Added the track **${track.info.title}** in queue!`)
            .catch(() => null);
        if (res) await res.play();
        return;
    }
    const searchData = await node.rest.resolve(query, 'youtube');
    if (!searchData.tracks.length)
        return await msg.channel.send('Admiral, I didn\'t find anything in the query you gave me');
    const track = searchData.tracks.shift();
    track.requester = msg.author.id
    const res = await this.client.queue.handle(node, track, msg);
    await msg.channel.send(`Added the track **${track.info.title}** in queue!`).catch(() => null);
    if (res) await res.play();
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};