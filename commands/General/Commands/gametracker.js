const { Command, RichDisplay } = require('klasa');
let Gamedig = require("gamedig")
const Discord = require("discord.js")

const fs = require("fs")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'gametracker',
            enabled: true,
            runIn: 'text',
            cooldown: 120,
            aliases: ['gt', 'gamestats'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: `I will show the current playercount on the server you have set!`,
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {

        
        
        

        let game = msg.guild.settings.gtGame
        let IP = msg.guild.settings.gtIP
        
        
        if(!game) return msg.channel.send("This guild did not save a gtGame! Contact one of the administrators of this guild!\n`!conf set gtGame`")
                if(!IP) return msg.channel.send("This guild did not save a gtIP! Contact one of the administrators of this guild!\n`!conf set gtIP`")

                Gamedig.query({
                    type: game,
                    host: IP,
                    maxAttempts: 10,
                    attemptTimeout: 1000
                }).then((state) => {
        
                    function escapeMarkdown(text) {
                        var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
                        var escaped = unescaped.replace(/(\*|\_|\`|\~|\\)/g, '\\$1'); // escape *, _, `, ~, \
                        return escaped;
                      }


                      function tagFix(text) {
                          var unfixed = text.replace(/00|11|22|33|44|55|66|77|88|99/gi, "")
                          return unfixed;
                      }
                    
                    let names = state.players.map(x => x.name);
                    let srvName = escapeMarkdown(state.name)
        
                    let namelist = [];
        
                    names.forEach(namee => {
                        let escaped = escapeMarkdown(namee)
                        let fix = tagFix(escaped)
                        namelist.push(fix)
                    })
        
                    let ping = state.players.map(x => x.ping);
                    let score = state.players.map(x => x.frags);
        
                    
            
         
                if(state.players.length < 0) {
                        
            
                        let embed1 = new Discord.MessageEmbed()
                        .setTitle(`**${srvName}**`)
                        
                        .setDescription("Here are some stats!")
                        .addField("**Map:**", `**${state.map}**`)
                        .addField("**Players online:**", "**0**")
                        //.addField("**Score:       **", score, true)
                        //.addField("**Ping:        **", ping, true)
                        
                        .setFooter("Just join the server 🙃")
                        
                        return msg.channel.send(embed1)
                        
                    }
            
                if(state.players.length > 24) {
        
                    let embed2 = new Discord.MessageEmbed()
                    .setTitle(`**${srvName}**`)
                    .setDescription(`Here are some stats!`)
                    
                    .addField("**Map:**", `**${state.map}**`)
                    .addField("**Players online:**", `**${state.players.length}**`)
                    .addField("**Players:           **", namelist, true)
                    .addField("**Score:       **", score, true)
                    .addField("**Ping:        **", ping, true)
                    
                    .setFooter("Just join the server 🙃")
                    
            
                    return msg.channel.send(embed2)
                    
                }       
                    
            
                if(state.players.length < 25) {
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`**${srvName}**`)
                    embed.setColor("#00ffff")
                    
                    embed.setDescription("Here are some stats!")
                    embed.addField("**Map:**", `**${state.map}**`)
                    embed.addField("**Names, Score and Ping:**", `⬇️⬇️⬇️`, false)
                    embed.addField("**Players online:**", `**${state.players.length}**`)
                    state.players.forEach(entry => {

                        let namea = escapeMarkdown(entry.name)
                        let fix = tagFix(namea)
                        embed.addField(`**${fix}**`, `Score: ${entry.frags}\nPing: ${entry.ping}`, true)
                    })
                    
                    embed.setFooter("Just join the server 🙃")
                    
                    
                                
                    return msg.channel.send(embed)
                }
                }).catch((error) => {
                    msg.channel.send(`Something went wrong, can't get the stats!\n\n\`${error}\`\nThis Error means the server is mostlikely down!`);
                });

                
            
        

	

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};