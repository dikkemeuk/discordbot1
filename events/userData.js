const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'userData',
            enabled: true,
            event: 'guildMemberAdd',
            once: false
        });
    }

    async run(member) {
        
        const db = this.client.providers.get('mysql')

        const result = await db.run(`SELECT * FROM userlevels WHERE userID = ${member.id}`)

        if(result) return console.log(`${member.user.tag} is already in the database!`)

        db.run(`INSERT INTO userLevels (userID, userXP, level) VALUES ('${message.author.id}', 1, 1)`)
        return console.log(`${member.user.tag} was added to the database!`)

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};