const { Command } = require('klasa');
const Discord = require('discord.js')
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'coinflip',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['flip', 'cflip'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Flip a coin, you may lose your money / win it back!',
            quotedStringSupport: false,
            usage: '<amount:string> <side:string>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [amount, side]) {
        
        const db = this.client.providers.get('mysql').db

    if(isNaN(amount) && amount !== "all") return message.channel.send("This only works if you provide a number! This isn't a number!")
    if(!amount) return message.channel.send("How much money do you want to withdraw?")
    if(amount < 0) return message.channel.send("<:eah:556595319538843686>")
    if(!side) return message.channel.send("Wanna bet on Heads or on Tails??")
    db.query(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`, (err, results) => {
        if(err) return message.channel.send("Something went wrong, i am not going to continue!")
        if(results.length === 0) return message.channel.send("You don't even have money! Not going to flip the coin!")

        if(results) {
            if(amount > results[0].balance) return message.reply("You don't have enough money to bet this amount!")
            if(amount < results[0].balance) { 

                
                
                if(side == "tails") {
                    side = 0;
                }
                else if(side == "heads") {
                    side = 1;
                }
                else return message.channel.send("Not a valid side!")



                var number = Math.floor(Math.random() * 4)
                if(side == number) {
                    let win = (amount * 2)
                    db.query(`UPDATE usermoney SET balance = ${results[0].balance + win} WHERE userID = ${message.author.id}`)
                    let embed2 = new Discord.MessageEmbed()
                    .setTitle("**💰YOU WON💰**")
                    .setColor("RANDOM")
                    .setDescription(`Congratulations ${message.author.username} you have won €${win}. You now have ${results[0].balance + win}!`)
                    
                    return message.channel.send(embed2)
                } else {
                    db.query(`UPDATE usermoney SET balance = ${results[0].balance - amount} WHERE userID = ${message.author.id}`)
                    let embed4 = new Discord.MessageEmbed()
                    .setTitle("**💸YOU LOST💸**")                    
                    .setColor("RANDOM")
                    .setDescription(`You have lost €${amount} you now have €${results[0].balance - amount} left!`)
                    
                    return message.channel.send(embed4)
                    
                }

            } if(amount === results[0].balance) {

                let embed1 = new Discord.MessageEmbed()
                .setTitle("**💰Bank Notification💰**")
                .setDescription("You're about to gamble with all of your money!\nAre you sure? You have 5 seconds to think about it!")
                .setColor("RANDOM")
                .setFooter("Press 👍 if you are sure, press 👎 if you want to cancel!")
                message.channel.send(embed1).then(msg => {
                    msg.react("👍")
                    msg.react("👎")

                    const filter = (reaction, user) => {
                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first()

                            if(reaction.emoji.name === '👍') {
                                
                                
                                if(side == "tails") {
                                    side = 0;
                                }
                                else if(side == "heads") {
                                    side = 1;
                                }
                                else return message.channel.send("Not a valid side!")
                
                
                
                                var number = Math.floor(Math.random() * 4)
                                if(side == number) {
                                    let win = (amount * 2)
                                    db.query(`UPDATE usermoney SET balance = ${results[0].balance + win} WHERE userID = ${message.author.id}`)
                                    let embed2 = new Discord.MessageEmbed()
                                        .setTitle("**💰JACKPOT💰**")
                                        .setDescription(`Congratulations ${message.author.username} you have won €${win}. You now have ${results[0].balance + win}!`)
                                        .setColor("RANDOM")
                                        
                                    return message.channel.send(embed2)
                                } else {
                                    db.query(`UPDATE usermoney SET balance = ${results[0].balance - amount} WHERE userID = ${message.author.id}`)
                                    let embed3 = new Discord.MessageEmbed()
                                    .setTitle("**💰YOU LOST💰**")
                                    .setColor("RANDOM")
                                    .setDescription("You have lost all of your money!")
                                    
                                    return message.channel.send(embed3)

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
                                
                                
                                if(side == "tails") {
                                    side = 0;
                                }
                                else if(side == "heads") {
                                    side = 1;
                                }
                                else return message.channel.send("Not a valid side!")
                
                
                
                                var number = Math.floor(Math.random() * 4)
                                if(side == number) {
                                    let win = (results[0].balance * 2)
                                    db.query(`UPDATE usermoney SET balance = ${results[0].balance + win} WHERE userID = ${message.author.id}`)
                                    let embed2 = new Discord.MessageEmbed()
                                        .setTitle("**💰JACKPOT💰**")
                                        .setDescription(`Congratulations ${message.author.username} you have won €${win}. You now have ${results[0].balance + win}!`)
                                        .setColor("RANDOM")
                                        
                                    return message.channel.send(embed2)
                                } else {
                                    db.query(`UPDATE usermoney SET balance = ${results[0].balance - results[0].balance} WHERE userID = ${message.author.id}`)
                                    let embed3 = new Discord.MessageEmbed()
                                    .setTitle("**💰YOU LOST💰**")
                                    .setColor("RANDOM")
                                    .setDescription("You have lost all of your money!")
                                    
                                    return message.channel.send(embed3)

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