const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, {
            name: 'allowedChannel',
            enabled: true,
            spamProtection: false
        });
    }

    async run(message, command) {
       
        if(message.guild.settings.commandChannel === "None") return false;

        const existing = message.guild.settings.commandChannel.includes(message.channel.id)
        if(existing) return;
        
        if(!existing && message.hasAtLeastPermissionLevel(5))
            return;

        if(!existing && !message.hasAtLeastPermissionLevel(5)) 
            message.send(`No commands allowed in this channel!`).then(msg => {msg.delete({timeout: 4000})}).catch(err => {console.log(err)})
            return message.delete()
            

        

        
        
           
        

        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};