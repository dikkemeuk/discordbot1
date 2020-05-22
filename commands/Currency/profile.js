const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'profile',
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
            description: '',
            quotedStringSupport: false,
            usage: '[user:mention]',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [user]) {

        const db = this.client.providers.get('mysql')

        if(!user) user = message.author

        let moneyy;
        let vaultbalancee;

        const moneyDB1 = await db.run(`SELECT * FROM usermoney WHERE userID = ${user.id}`)

        if(!moneyDB1) {
            moneyy = "No money!"
            vaultbalancee = "No vault!"
        } else {

            if(!moneyDB1.hasVault) vaultbalancee = "No vault!"
            else vaultbalancee = `€${moneyDB1.VaultBalance}`
         
            moneyy = `€${moneyDB1.balance}`
            
        }
            
        
            
            const lvlDB1 = await db.run(`SELECT * from userlevels WHERE userID = ${user.id}`)
            const commUsed1 = await db.run(`SELECT * FROM commandsused WHERE userID = ${user.id}`)

            let level1;
            let xp1;
            
            let commandsRan;

            if(!lvlDB1) {
                level1 = "0"
                xp1 = "0"
            }
            
            if(!commUsed1) commandsRan = "0" 
            else commandsRan = commUsed1.commandsUsed;

            if(!lvlDB1.level) level1 = "0"
            else level1 = lvlDB1.level;

            if(!lvlDB1.userXP) xp1 = "0"
            else xp1 = lvlDB1.userXP
            
            let embed1 = new MessageEmbed()
            .setTitle(`**${user.tag}s profile!**`)
            .setThumbnail(user.displayAvatarURL())
            .setColor("RANDOM")
            .addField('**Currency**:', `**Wallet**: ${moneyy}\n**Vault balance**: ${vaultbalancee}`, true)
            .addField(`**Level and XP**:`, `**Level**: ${level1}\n**XP**: ${xp1}`, true)
            .addField(`**Other stats**:`, `Commands used: ${commandsRan}`)
            .setFooter(`You gain XP and levels by sending messages, you can get money by using !daily`)

            return message.send(embed1)

        


    
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};