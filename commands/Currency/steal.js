const { Command } = require('klasa');
const Discord = require("discord.js")


const userUsed = new Set();


const embed1 = new Discord.MessageEmbed()
    .setTitle("**Cooldown**")
    .setDescription("**This command is on a 5 minute cooldown!**")
    .setColor("RANDOM")


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'steal',
            enabled: true,
            runIn: ['text'],
            cooldown: 300,
            deletable: false,
            bucket: 1,
            aliases: ['rob'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Rob a player!',
            quotedStringSupport: false,
            usage: '<target:mention>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [target]) {
    
    const db = this.client.providers.get('mysql').db

    if(userUsed.has(message.author.id)) return message.channel.send(embed1)

    
    if(target === message.author) return message.channel.send("Do you really want to steal from yourself? ||retard||")
    

    db.query(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`, (err, results) => {
        if(err) return message.channel.send(`Something went wrong.. try again in a few minutes.`)
        if(results.length === 0) return message.channel.send(`You are not registered to the bank, please register first!`)
        if(results[0].balance < 500) return message.channel.send("You need a minimum balance of €500 to be able to rob from people!")
        
        db.query(`SELECT * FROM usermoney WHERE userID = ${target.id}`, (err, results1) => {
            if(err) return message.channel.send(`Something went wrong.. try again in a few minutes.`)
            if(results1.length === 0) return message.channel.send(`This user is not registered to the bank!`)
            if(results1[0].balance < 10) return message.channel.send("This user does not have enough money to be stolen from!")

            let maxAmount = results1[0].balance / 2

            let win = 75-100
            let vine = 20-40
            var number = Math.floor(Math.random() * 100)

            if(number === win) {

                let amountStolen = Math.ceil(Math.random() * maxAmount)
                

                db.query(`UPDATE usermoney SET balance = ${results1[0].balance - amountStolen} WHERE userID = ${target.id}`, err => {
                    if(err) throw err;
                })
                db.query(`UPDATE usermoney SET balance = ${results[0].balance + amountStolen} WHERE userID = ${message.author.id}`, err => {
                    if(err) throw err;
                })

                let stealEmbed = new Discord.MessageEmbed()
                .setTitle("**Robbery succesfull**")
                .setDescription(`You managed to steal €${amountStolen} from <@${target.id}>.`)
                .setColor(`RANDOM`)
                .setFooter("There's a 10% chance the police will catch you!, be careful!")

                
                return message.channel.send(stealEmbed)
                }

            if(number === vine) {
                let vineEmbed = new Discord.MessageEmbed()
                .setTitle(`👮**You got caught!**👮`)
                .setDescription("**You got caught and now you need to pay €150**")
                .setColor("RANDOM")

                
             return message.channel.send(vineEmbed)
            }

            if(number !== vine && number !== win) {

                let failEmbed = new Discord.MessageEmbed()
                .setTitle("**You failed**")
                .setDescription(`You failed to rob <@${target.id}>..\nYou don't have to pay anything though!`)
                .setColor("RANDOM")
                
                return message.channel.send(failEmbed)
            }
                
            

            
        });userUsed.add(message.author.id);
        setTimeout(() => {
            userUsed.delete(message.author.id);
        }, 1000 * 60 * 5)
    })
        
    }

    

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};