const { Command } = require('klasa');
const Discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'slots',
            enabled: true,
            runIn: ['text'],
            cooldown: 30,
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
            usage: '<amount:string>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [amount]) {
        
        if(isNaN(amount) && amount !== "all") return message.channel.send("This only works if you provide a number! This isn't a number!")
        if(!amount) return message.channel.send("How much money do you want to spend on the slots, try again?")
        if(amount < 0) return message.channel.send("<:eah:556595319538843686>")

        const db = this.client.providers.get('mysql').db


        db.query(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`, (err, rows) => {
            if(err) return message.channel.send("I cannot continue, error " + err)
            if(rows.length === 0) return message.channel.send("You're not registered to the bank!")
        
            if(rows) {
                if(amount > rows[0].balance) return message.reply("You don't have enough money to bet this amount!")
                if(amount < rows[0].balance) { 
        
                    
                    let slots = ["💰", "❌", "👑", "✨", "💸"];
                    let result1 = Math.floor((Math.random() * slots.length));
                    let result2 = Math.floor((Math.random() * slots.length));
                    let result3 = Math.floor((Math.random() * slots.length));
                    let name = message.author.username;
                    let icon = message.author.displayAvatarURL;
                    let multiplier = Math.floor(Math.random() * 4) + 1;
                    let winnings = amount * multiplier
          if (slots[result1] === slots[result2] || slots[result1] === slots[result3]) {
            
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance + winnings} WHERE userID = ${message.author.id}`)
            let embed = new Discord.MessageEmbed()
        
               
               .setTitle("You won!")
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               .addField(`**Winnings:**`, `€${winnings} with a x${multiplier} multiplier!`)
               .setColor(0xF4E842)
               .setFooter(name, icon)
            return message.channel.send(embed);
        
          } else {
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance - amount} WHERE userID = ${message.author.id}`)  
            let embed2 = new Discord.MessageEmbed()
               .setFooter(name, icon)
               .setTitle('You lost!')
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               
               .setColor(0xF4E842)
            return message.channel.send(embed2);
          }
        
                } if(amount === rows[0].balance) {
        
                    
                    let embed1 = new Discord.MessageEmbed()
                    .setTitle("**💰Bank Notification💰**")
                    .setDescription("You're about to gamble with all of your money!\nAre you sure? You have 5 seconds to think about it!")
                    .setColor("RANDOM")
                    .setFooter("Press 👍 if you are sure, press 👎 if you want to cancel!")
                    message.channel.send(embed1).then(async msg => {
                        await msg.react("👍")
                        await msg.react("👎")
        
                        const filter = (reaction, user) => {
                            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
        
                        msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first()
        
                                if(reaction.emoji.name === '👍') {
        
                                    let slots = ["💰", "❌", "👑", "✨", "💸", "🏆"];
                    let result1 = Math.floor((Math.random() * slots.length));
                    let result2 = Math.floor((Math.random() * slots.length));
                    let result3 = Math.floor((Math.random() * slots.length));
                    let name = message.author.username;
                    let icon = message.author.displayAvatarURL;
                    let multiplier = Math.floor(Math.random() * 4) + 1;
                    let winnings = rows[0].balance * multiplier
          if (slots[result1] === slots[result2] && slots[result3]) {
            
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance + winnings} WHERE userID = ${message.author.id}`)
            let embed = new Discord.MessageEmbed()
        
               
               .setTitle("You won!")
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               .addField(`**Winnings:**`, `€${winnings} with a x${multiplier} multiplier!`)
               .setColor(0xF4E842)
               .setFooter(name, icon)
            message.channel.send(embed);
        
          } else {
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance - rows[0].balance} WHERE userID = ${message.author.id}`)  
            let embed2 = new Discord.MessageEmbed()
               .setFooter(name, icon)
               .setTitle('You lost!')
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               
               .setColor(0xF4E842)
            message.channel.send(embed2);
          }          
                            } else {return message.channel.send("You decided not to continue! aborting the transaction!")}
        
                    }).catch(collected => {
                        
                        return message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                    });
                })
        
                } if(amount === "all") {
        
                    
                    
                    let embed1 = new Discord.MessageEmbed()
                    .setTitle("**💰Bank Notification💰**")
                    .setDescription("You're about to gamble with all of your money!\nAre you sure? You have 5 seconds to think about it!")
                    .setColor("RANDOM")
                    .setFooter("Press 👍 if you are sure, press 👎 if you want to cancel!")
                    message.channel.send(embed1).then(async msg => {
                        await msg.react("👍")
                        await msg.react("👎")
        
                        const filter = (reaction, user) => {
                            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
        
                        msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first()
        
                                if(reaction.emoji.name === '👍') {
        
                                    let slots = ["💰", "❌", "👑", "✨", "💸", "🏆"];
                    let result1 = Math.floor((Math.random() * slots.length));
                    let result2 = Math.floor((Math.random() * slots.length));
                    let result3 = Math.floor((Math.random() * slots.length));
                    let name = message.author.username;
                    let icon = message.author.displayAvatarURL;
                    let multiplier = Math.floor(Math.random() * 4) + 1;
                    let winnings = rows[0].balance * multiplier
          if (slots[result1] === slots[result2] && slots[result3]) {
            
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance + winnings} WHERE userID = ${message.author.id}`)
            let embed = new Discord.MessageEmbed()
        
               
               .setTitle("You won!")
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               .addField(`**Winnings:**`, `€${winnings} with a x${multiplier} multiplier!`)
               .setColor(0xF4E842)
               .setFooter(name, icon)
            message.channel.send(embed);
        
          } else {
            db.query(`UPDATE usermoney SET balance = ${rows[0].balance - rows[0].balance} WHERE userID = ${message.author.id}`)  
            let embed2 = new Discord.MessageEmbed()
               .setFooter(name, icon)
               .setTitle('You lost!')
               .setAuthor('🎰 Slots 🎰')
               .setDescription(`Result: ${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
               
               .setColor(0xF4E842)
            message.channel.send(embed2);
          }          
                            } else {return message.channel.send("You decided not to continue! aborting the transaction!")}
        
                    }).catch(collected => {
                        
                        return message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                    });
                })
        
                }
            }
        })
}

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};