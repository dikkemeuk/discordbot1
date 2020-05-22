const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'levelUp',
            enabled: true,
            event: 'message',
            once: false
        });
    }

    async run(message) {
        if(message.author.bot) return;
        const db = this.client.providers.get('mysql');

        let check = await db.run(`SELECT * FROM userlevels WHERE userID = ${message.author.id}`)

        if(!check) return;

        
        
        let curlvl = check.level;
        let nxtLvl = check.level * 500;

        if(nxtLvl <= check.userXP) {

            await db.run(`UPDATE userlevels SET level = ${curlvl + 1} WHERE userID = ${message.author.id}`)

            let moneyCheck = await db.run(`SELECT * FROM usermoney WHERE userID = ${message.author.id}`)

            if(check.level < 5) {
                
                return await db.run(`UPDATE usermoney SET balance = ${moneyCheck.balance + 100} WHERE userID = ${message.author.id}`)

            }  if(check.level > 5 && check.level < 10) {

                return await db.run(`UPDATE usermoney SET balance = ${moneyCheck.balance + 150} WHERE userID = ${message.author.id}`)

            } if(check.level > 10 && check.level < 15) {

                return await db.run(`UPDATE usermoney SET balance = ${moneyCheck.balance + 250} WHERE userID = ${message.author.id}`)

            } if(check.level > 15 && check.level < 20) {

                return await db.run(`UPDATE usermoney SET balance = ${moneyCheck.balance + 400} WHERE userID = ${message.author.id}`)

            } if(check.level > 20) {
                
                return await db.run(`UPDATE usermoney SET balance = ${moneyCheck.balance + 500} WHERE userID = ${message.author.id}`)

            }


        }


    

        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};