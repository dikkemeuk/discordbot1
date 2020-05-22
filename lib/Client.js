const { Client, PermissionLevels } = require('klasa');
const Music = require('./modules/music/Music');
const Mod = require('./modules/moderation/Moderation');

const permissionLevels = new PermissionLevels()
    .addLevel(0, false, () => true)
    .addLevel(5, false, (client, msg) => msg.guild && msg.guild.settings.dj && msg.member.roles.has(msg.guild.settings.dj))
    .addLevel(6, false, (client, msg) => {
        if (!msg.guild) return false;
        if (msg.guild.settings.administrator) return msg.member.roles.has(msg.guild.settings.administrator);
        return msg.guild && msg.member.permissions.has('MANAGE_GUILD');
    })
    .addLevel(7, false, (client, msg) => msg.guild && msg.member === msg.guild.owner)
    .addLevel(9, true, (client, msg) => msg.author === client.owner)
    .addLevel(10, false, (client, msg) => msg.author === client.owner);

class KozalakBot extends Client {

    constructor(options) {
        super(Object.assign(options, { permissionLevels }));

        this.queue = new Music();
        this.mod = new Mod();
    }

}

module.exports = KozalakBot;
