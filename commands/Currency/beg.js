const { Command } = require('klasa');
const Discord = require("discord.js");

const userUsed = new Set();

const cooldownEmbed = new Discord.MessageEmbed()
    .setTitle("**Notification**")
    .setDescription("You may not beg now, wait some more!")
    
    .setColor("RANDOM")
    .setImage("https://dazedimg-dazedgroup.netdna-ssl.com/495/azure/dazed-prod/1210/0/1210368.jpg")


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'beg',
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
            description: 'Beg for some money, maybe the bot will grant your wish!',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message) {
       
        const db = this.client.providers.get('mysql').db

        if(userUsed.has(message.author.id)) return message.channel.send(cooldownEmbed).then(msg => {
            msg.delete(10000)
        })
        db.query(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`, (err, results) => {
            if(err) return message.channel.send("Something went wrong, i am not going to continue!")
            if(results.length === 0) return message.channel.send("Yeah, you're gonna need a bankaccount first! use `!bank register`")
    
            if(results) {
                const amount = Math.floor(Math.random() * 200)
    
                if(amount === 0) {
                let noEmbed = new Discord.messageEmbed()
                .setTitle("❌❌**No money for you!**❌❌")
                .setDescription("**I do not think you're worthy of revieving my money!**")
                .setColor("RANDOM")
                .setFooter("You may try it again any time you'd like tho!")
    
            return message.channel.send(noEmbed)
            }
            else {
                db.query(`UPDATE usermoney SET balance = ${results[0].balance + amount} WHERE userID = '${message.author.id}'`, err => {
                    if(err) throw err;
                    
                })
    
                let winEmbed = new Discord.MessageEmbed()
                .setTitle("💰**Here's some money!**💰")
                .setDescription(`**I have decided to give you €${amount}!**`)
                .setColor("RANDOM")
                .setFooter("You can beg for money every 10 minutes!")
    
    
                message.channel.send(winEmbed)
    
            }
        }userUsed.add(message.author.id);
        setTimeout(() => {
            userUsed.delete(message.author.id);
        }, 1000 * 60 * 10)
    
        })

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};