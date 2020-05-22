const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'snipe',
            enabled: true,
            runIn: ['text'],
            cooldown: 120,
            deletable: false,
            hidden: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'I will find a message that got deleted by the user you mentioned, if you don\'t mention anyone i\'ll look for the last message in this channel!',
            quotedStringSupport: false,
            usage: '[member:mention] [channel:channel]',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [member, channel]) {
        
        
        
        if(!member && !channel) {
            let channelSnipes = this.client.channelSnipes.get(message.channel.id)
            if(!channelSnipes) return message.send("No deleted messages found!")
            let snipes = channelSnipes
            
            if(!snipes[0]) return message.send("No deleted messages found!")


            let snipeEmbed = new MessageEmbed()
            .setTitle("**Get Sniped m8**")
            .setColor("RANDOM")
            .setThumbnail('https://gifimage.net/wp-content/uploads/2018/11/intervention-gif-mw2-1.gif')
            .setDescription(`**Message sent by**: <@${snipes[0].author.id}>\nIn this channel: <#${snipes[0].channel.id}>\n\n**Content**:\n${snipes[0].content}`)
            .setFooter(`This message got deleted on ${snipes[0].date}`)
            if(!snipes[0].image) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            else if(snipes[0].image === null) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            if(snipes[0].image) {snipeEmbed.addField(`**Image**:`, snipes[0].image)
            snipeEmbed.setImage(`${snipes[0].image}`) 
            }

            return message.send(snipeEmbed)

        }
        if(member) {

        if(member.bot) return message.send("Bots cannot be sniped!")
        let userSnipes = this.client.userSnipes.get(member.id)
    
        let snipes = userSnipes
            
            if(!snipes[0]) return message.send("No deleted messages found!")


            let snipeEmbed = new MessageEmbed()
            .setTitle("**Get Sniped m8**")
            .setColor("RANDOM")
            .setThumbnail('https://gifimage.net/wp-content/uploads/2018/11/intervention-gif-mw2-1.gif')
            .setDescription(`**Message sent by**: <@${snipes[0].author.id}>\nIn this channel: <#${snipes[0].channel.id}>\n\n**Content**:\n${snipes[0].content}`)
            .setFooter(`This message got deleted on ${snipes[0].date}`)
            if(!snipes[0].image) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            else if(snipes[0].image === null) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            if(snipes[0].image) {snipeEmbed.addField(`**Image**:`, snipes[0].image)
            snipeEmbed.setImage(`${snipes[0].image}`) 
            }

            return message.send(snipeEmbed)


        } if(channel){

            let channelSnipes = this.client.channelSnipes.get(channel.id)
            
            if(!channelSnipes) return message.send(`No deleted messages found!`)
            
            let snipes = await channelSnipes.filter(obj => {
                return obj.channel === channel
            })
            
            if(!snipes[0]) return message.send("No deleted messages found!")


            let snipeEmbed = new MessageEmbed()
            .setTitle("**Get Sniped m8**")
            .setColor("RANDOM")
            .setThumbnail('https://gifimage.net/wp-content/uploads/2018/11/intervention-gif-mw2-1.gif')
            .setDescription(`**Message sent by**: <@${snipes[0].author.id}>\nIn this channel: <#${snipes[0].channel.id}>\n\n**Content**:\n${snipes[0].content}`)
            .setFooter(`This message got deleted on ${snipes[0].date}`)
            if(!snipes[0].image) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            else if(snipes[0].image === null) snipeEmbed.addField(`**Image**:`, 'No image deleted!')
            if(snipes[0].image) {snipeEmbed.addField(`**Image**:`, snipes[0].image)
            snipeEmbed.setImage(`${snipes[0].image}`) 
            }

            return message.send(snipeEmbed)

        }
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};