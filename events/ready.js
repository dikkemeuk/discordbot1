const { Event } = require('klasa');
const { Collection } = require("discord.js")
module.exports = class extends Event {

    run() {
        this.client.user.setPresence({game: 
            {
                name: '!help'
            }
        });
        
        this.client.channelSnipes = new Collection();
        this.client.userSnipes = new Collection();
    }

};
