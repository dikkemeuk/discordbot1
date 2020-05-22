const { Shoukaku } = require('shoukaku');
const LavalinkServer = [{ name: 'Localhost', host: 'localhost', port: 2333, auth: 'Speedy12' }];
const Options = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };;

class ShoukakuHandler extends Shoukaku {
    constructor(client) {
        super(client, LavalinkServer, Options);

        this.on('ready',
            (name, resumed) =>
                client.logger.log(`Lavalink Node: ${name} is now connected`, `This connection is ${resumed ? 'resumed' : 'a new connection'}`)
        );
        this.on('error',
            (name, error) =>
                client.logger.error(error)
        );
        this.on('close',
            (name, code, reason) =>
                client.logger.log(`Lavalink Node: ${name} closed with code ${code}`, reason || 'No reason')
        );
        this.on('disconnected',
            (name, reason) =>
                client.logger.log(`Lavalink Node: ${name} disconnected`, reason || 'No reason')
        );
    }
}

module.exports = ShoukakuHandler;