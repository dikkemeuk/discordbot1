const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'restrict',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 7,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Restrict certain things from a user',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'You can choose from: `channel` `bot`.\nchannel: Will prevent the mentioned user from speaking in the mentioned channel!\nbot: I will no longer listen to this person!'
        });
    }

    async run(message) {

        const db = this.client.providers.get('mysql')
       
        const arggs = message.content.slice(1).trim().split(/ +/g);
        const args = arggs.splice(1)
        
        let user;

        if(message.mentions.members.first()) {
            user = message.mentions.users.first().id
        } else {

            if(isNaN(args[0])) {
                return message.send("I hope you know that UserIDs don't have letters in it?")
            }

            if(args[0].length < 16) {
                return message.send(`This is not a valid UserID!`)
            }

            if(args[0].length > 18) {
                return message.send(`This is not a valid UserID!`)
            } 

            let a = await this.client.users.fetch(args[0])
        
            if(a) user = a.id
            
            
        }

        let type = args[1]
        
        if(!user) return message.send("Try again, this time mention the person you're trying to restrict or give me their id!")
        
        if(user.bot) return message.send("Bots will not be affected!")
        
        if(type === "channel") {

            if(!message.mentions.channels.first()) return message.send(`No channel found to restrict the access to!`)
            let check = await db.run(`SELECT * FROM channelrestrict WHERE userID = '${user}'`)

            let channels = check.channelID.split(", ")

            if(!check) {
                
                await db.run(`INSERT INTO channelrestrict (userID, channelID) VALUES (${user}, ${message.mentions.channels.first().id})`)
                
                return message.send(`Added <#${message.mentions.channels.first().id}> to the list of restrictions!`)
            }
            if(check) {

                if(channels.includes(message.mentions.channels.first().id)) return message.send("This channel is already restricted for this person!")

                await db.run(`UPDATE channelrestrict SET channelID = '${check.channelID + ", " + message.mentions.channels.first().id}' WHERE userID = ${user}`)
                return message.send(`Added <#${message.mentions.channels.first().id}> to the list of restrictions!`)
            }
            
            
        }
        

        
    
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};