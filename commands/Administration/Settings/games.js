const { Command } = require('klasa');
let Gamedig = require("gamedig")
const Discord = require("discord.js")

const fs = require("fs")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'games',
            enabled: true,
            runIn: 'text',
            cooldown: 0,
            aliases: ['gamelist'],
            permissionLevel: 7,
            botPerms: [],
            requiredSettings: [],
            description: `Use this command to see which games are supported!`,
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {

            msg.send(`**Here is a list of the supported games!**\n7d2d:	        7 Days to Die	
bat1944:\u0009\u0009Battalion 1944
bf1942:\u0009\u0009Battlefield 1942	
bf3:\u0009\u0009Battlefield 3
bf4:\u0009\u0009Battlefield 4	
bfbc2:\u0009\u0009Battlefield: Bad Company 2	
cod:\u0009\u0009Call of Duty	
cod2:\u0009\u0009Call of Duty 2	
cod4:\u0009\u0009Call of Duty 4: Modern Warfare	
codmw2:\u0009\u0009Call of Duty: Modern Warfare 2	
codmw3:\u0009\u0009Call of Duty: Modern Warfare 3	
coduo:\u0009\u0009Call of Duty: United Offensive	
codwaw:\u0009\u0009Call of Duty: World at War	
cs16:\u0009\u0009Counter-Strike 1.6
cscz:\u0009\u0009Counter-Strike: Condition Zero	
csgo:\u0009\u0009Counter-Strike: Global Offensive
css:\u0009\u0009Counter-Strike: Source	
dayz:\u0009\u0009DayZ	
dayzmod:\u0009\u0009DayZ Mod	
dota2:\u0009\u0009Dota 2	
garrysmod:\u0009\u0009Garry's Mod	
fivem:\u0009\u0009Grand Theft Auto V - FiveM	
minecraftping:\u0009\u0009Minecraft	
minecraftbe:\u0009\u0009Minecraft: Bedrock Edition	
mordhau:\u0009\u0009Mordhau	
samp:\u0009\u0009San Andreas Multiplayer	
tf2:\u0009\u0009Team Fortress 2`)
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};