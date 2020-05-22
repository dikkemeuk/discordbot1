const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "presence",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 9,
            description: "Change my status",
            usage: "<online|idle|dnd|invisible> [game:str] [play|stream|listen|watch]",
            usageDelim: " | "
        });
    }

    async run(msg, [status, game, type="play"]) {
        this.client.util.presenceHelper(this.client, game, type, status);
    }
};