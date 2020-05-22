const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, { 
            
            name: 'balance',
            bucket: 1,
            enabled: true,
            cooldown: 60,
            description: 'Check your current balance.',
            usage: '[user:mention]'
        
        });
    }

    run(message, [user]) {

        const db = this.client.providers.get('mysql').db

        if(!user) {

            db.query(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`, (err, rows) => {
                if(err) return message.send("Error:\n\n" + err)
                if(rows.length === 0) return message.send("You don't have any money!\nYou can get your first money by typing `!daily`")
                let vaultbalance = rows[0].VaultBalance

                if(!rows[0].hasVault) vaultbalance = 0

                let selfEmbed = new MessageEmbed()
                .setTitle("**Balance**")
                .setColor("RANDOM")
                .setDescription(`Here is your balance!\n\n**Wallet:** €${rows[0].balance}\n**Vault:** €${vaultbalance}`)
                return message.send(selfEmbed)
            })
        }
        if(user) {

            db.query(`SELECT * FROM usermoney WHERE userID = ${user.id}`, (err, rows) => {
                if(err) return message.send("Error:\n\n" + err)
                if(rows.length === 0) return message.send("This member does not have any money!")
                
                let vaultbalance = rows[0].VaultBalance

                if(!rows[0].hasVault) vaultbalance = 0

                let selfEmbed = new MessageEmbed()
                .setTitle("**Balance**")
                .setColor("RANDOM")
                .setDescription(`Here is <@${user.id}>'s balance!\n\n**Wallet:** €${rows[0].balance}\n**Vault:** €${vaultbalance}`)
                return message.send(selfEmbed)

            })
        }
}

}