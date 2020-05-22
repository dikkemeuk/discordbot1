const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'xpEvent',
            enabled: true,
            event: 'message',
            once: false
        });
    }

    async run(message, command) {
        
        if(message.author.bot) return;

        const db = this.client.providers.get('mysql')

        function randXP() {
            return Math.ceil(Math.random() * 20)
        }

        const dbCheck = await db.run(`SELECT * FROM userlevels WHERE userID = ${message.author.id}`)

        if(!dbCheck) {
           return db.run(`INSERT INTO userlevels (userID, userXP, level) VALUES (${message.author.id}, 1, 1)`)
        }

        let oldXP = dbCheck.userXP
        //message.send(`Updated XP!\nFrom: ${oldXP}\nTo: ${oldXP + randXP()}`)
        return await db.run(`UPDATE userlevels SET userXP = ${dbCheck.userXP + randXP()} WHERE userID = ${message.author.id}`)


        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};