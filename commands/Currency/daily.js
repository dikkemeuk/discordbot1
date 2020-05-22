const { Command } = require('klasa');
const { MessageEmbed } = require(`discord.js`)
const userUsed = new Set();


module.exports = class extends Command {

    constructor(...args) {
        super(...args, { 
            
            name: 'daily',
            aliases: '',
            enabled: true,
            bucket: 1,
            description: 'Claim your daily bonus!' 
        
        });
    }

    run(message) {

        const db = this.client.providers.get('mysql').db

        db.query(
            `SELECT * FROM usermoney WHERE userID = ${message.author.id}`,
            (err, results) => {
                if (err) throw err;

                if (results.length === 0) {
                    db.query(`INSERT INTO usermoney (userID, userTAG, balance, dailyUsedAt, canUseDaily, hasStreak, losingStreakAt, hasVault, vaultSize, VaultBalance, maxVault) VALUES ('${message.author.id}', '${message.author.tag}', 500, SYSDATE(), (SELECT DATE_ADD(SYSDATE(), INTERVAL 24 HOUR)), '0', (SELECT DATE_ADD(SYSDATE(), INTERVAL 36 HOUR)), '0', '0', '0', '0')`, err => {
                        if(err) return console.log(err)
                            
                    })

                    let fEmbed = new MessageEmbed()
                    .setTitle("**Bank Notification**")
                    .setColor('RANDOM')
                    .setDescription(`€500 has been added to your account!`)

                    return message.channel.send(fEmbed)
                }
                else {

                    
                const time = (results[0].canUseDaily - message.createdAt) / 1000

                var hours = ~~(time / 3600);
                var minutes = ~~((time % 3600) / 60);
                var seconds = ~~time % 60;

                var ret = "";

                if (hours > 0) {
                    ret += "" + hours + " hours " + (
                        minutes < 10
                            ? "0"
                            : ""
                    );
                }

                ret += "" + minutes + " minutes " + (
                    seconds < 10
                        ? "0"
                        : ""
                );
                ret += "" + seconds;

                const cooldownEmbed = new MessageEmbed()
                    .setTitle("**💰Bank Notification💰**")
                    .setDescription("**❌Error❌**")
                    .addField(
                        "Your transaction has been canceled",
                        `**You need to wait at least 24 hours to use !daily again!**`
                    )
                    .addField(`**You can use this command again in:**`, `**${ret} seconds**`)
                    .setColor('#FF0000')

                if (message.createdAt < results[0].canUseDaily) 
                    return message
                        .channel
                        .send(cooldownEmbed)

                db.query(
                    `SELECT * FROM usermoney WHERE userID = ${message.author.id}`,
                    (err, results) => {
                        if (err) 
                            throw err;
                        if (results.length === 0) 
                            return
                        let streakbonus = (results[0].hasStreak + 1) * 5
                        if (message.createdTimestamp > results[0].losingStreakAt) {

                            if (err) {
                                message
                                    .channel
                                    .send(err)
                                return console.log(err)
                            }

                            streakbonus = 0
                            db.query(
                                `UPDATE usermoney SET balance = ${results[0].balance + 500}, dailyUsedAt = SYSDATE(), canUseDaily = (SELECT DATE_ADD(SYSDATE(), INTERVAL 24 HOUR)), hasStreak = 0, losingStreakAt = (SELECT DATE_ADD(SYSDATE(), INTERVAL 36 HOUR)) WHERE userID = ${message.author.id}`
                            )

                            let lsEmbed = new MessageEmbed()
                                
                                .setTitle("**Bank Notification!**")
                                .setThumbnail(message.author.displayAvatarURL)
                                .setDescription(`**€500 has been added to your bank!**`)
                                .addField("**Streak:**", "0", true)
                                .addField("**Total balance:**", results[0].balance + 500, true)
                                .setColor("RANDOM")
                                .setFooter("Streaks expire if you don't use !daily again in 36 hours!")
                            message
                                .channel
                                .send(lsEmbed)

                            return userUsed.add(message.author.id);

                        }
                        db.query(
                            `UPDATE usermoney SET balance = ${ (results[0].balance + 500) + streakbonus}, dailyUsedAt = SYSDATE(), canUseDaily = (SELECT DATE_ADD(SYSDATE(), INTERVAL 24 HOUR)), hasStreak = ${results[0].hasStreak +
                                    1}, losingStreakAt = (SELECT DATE_ADD(SYSDATE(), INTERVAL 36 HOUR)) WHERE userID = ${message.author.id}`,
                            err => {
                                if (err) 
                                    console.log(err)

                                let sEmbed = new MessageEmbed()
                                    
                                    .setTitle("**Bank Notification!**")
                                    .setThumbnail(message.author.displayAvatarURL)
                                    .setDescription(`**€${ 500 + streakbonus} has been added to your bank!**`)
                                    .addField("**Streak:**", results[0].hasStreak + 1, true)
                                    .addField("**Total balance:**", (results[0].balance + 500) + streakbonus, true)
                                    .setColor("RANDOM")
                                    .setFooter("Streaks expire if you don't use !daily again in 36 hours!")
                                message
                                    .channel
                                    .send(sEmbed)

                                return userUsed.add(message.author.id);
                            }
                        )

                        setTimeout(() => {
                            userUsed.delete(message.author.id);
                        }, 1000 * 3600 * 24);

                    })
                
                }
                
            })
    


    }

};