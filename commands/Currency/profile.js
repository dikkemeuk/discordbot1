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

        if(!user) {

            let money;
            let vaultbalance;

            const moneyDB = await db.run(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`)

            if(!moneyDB) {
                money = "No money!"
                vaultbalance = "No vault!"
            } else {

                const lvlDB = await db.run(`SELECT * from userlevels WHERE userID = ${message.author.id}`)
                const commUsed = await db.run(`SELECT * FROM commandsused WHERE userID = ${message.author.id}`)
                let lvl = lvlDB.level
                let xp = lvlDB.userXP

                if(moneyDB.hasVault === 0) vaultbalance = "No vault!"

                money = moneyDB.balance
                vaultbalance = moneyDB.VaultBalance

                let embed = new MessageEmbed()
                .setTitle(`**${message.author.tag}s profile!**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setColor("RANDOM")
                .addField('**Currency**:', `**Wallet**: €${money}\n**Vault balance**: €${vaultbalance}`, true)
                .addField(`**Level and XP**:`, `**Level**: ${lvl}\n**XP**: ${xp}`, true)
                .addField(`**Other stats**:`, `Commands used: ${commUsed.commandsUsed}`)
                .setFooter(`You gain XP and levels by sending messages, you can get money by using !daily`)

                return message.send(embed)


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