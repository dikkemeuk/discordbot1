const { Command } = require('klasa');
const request = require("request")
const cheerio = require("cheerio")
const Discord = require("discord.js")
const fs = require("fs")


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'lesbian',
            enabled: true,
            runIn: ['text'],
            cooldown: 20,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: true,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'I will post a lesbian porn GIF',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
        
        message.send("Fetching a GIF, sit tight!")

            request('http://gifsgonewild.com/category/lesbian/?order=random', (err, resp, html) => {

            if(!err && resp.statusCode == 200) {

                var $ = cheerio.load(html)

                let num = Math.floor(Math.random() * 15)

               

                

                $(`#post-items > li:nth-child(1) > article > div.post-thumbnail > a > div`).each(function(i, element) {
                    let thing = $(element).find('img').attr('src');
                    
                    let embed = new Discord.MessageEmbed()
                        .setTitle("👀 Enjoy 👀")
                        .setImage(thing)
                        .setColor("RANDOM")
                        
                        
                        
                        return message.send(embed)

                 });
                
            }
            
        }) 


        
        
        
        return
    }
        
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};