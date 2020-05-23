const { Client, Schema, SQLProvider } = require("klasa");

const { Shoukaku } = require('shoukaku');

const Queue = require('./modules/Queue.js');
const Logger = require('./modules/logger.js');

const LavalinkServer = [{ name: 'Localhost', host: 'localhost', port: 2333, auth: 'pw' }];
const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };


require("dotenv").config()

class MusicClient extends Client {
    constructor(opts) {
        super(opts);
        this.shoukaku = new Shoukaku(this, LavalinkServer, ShoukakuOptions);
    }

    

    login(token) {
        this._setupShoukakuEvents();
        return super.login(token);
    }

    _setupShoukakuEvents() {

        this.queue = new Queue(this)
        this.handlers = {};
        this.logger = new Logger(this);
        this.shoukaku.on('ready', (name) => console.warn(`Lavalink Node: ${name} is now connected`));
        // You must handle error event
        this.shoukaku.on('error', (name, error) => console.log(`Lavalink Node: ${name} emitted an error.`, error));
        this.shoukaku.on('close', (name, code, reason) => console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`));
        this.shoukaku.on('disconnected', (name, reason) => console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`));
    }

    

}

const client = new MusicClient({
    
    prefix: '!',
    providers: { default: 'mysql' },
    commandEditing: true,
    typing: true,
    disabledCorePieces: ['commands', 'languages'],
    fetchAllMembers: true
    
});



Client.defaultPermissionLevels
    .add(2, ({ guild, member}) => guild && member.roles.cache.has(guild.settings.extraRoles))
    .add(3, ({ guild, member}) => guild && member.roles.cache.has(guild.settings.djRole))
    .add(5, ({ guild, member }) => guild && member.roles.cache.has(guild.settings.modRole))
    .add(6, ({ guild, member }) => guild && member.permissions.has("ADMINISTRATOR"))
    .add(7, ({ guild, member }) => guild && member.roles.cache.has(guild.settings.adminRole))
    .add(8,({ author, guild }) =>  author === guild.owner)
    .add(9, ({ author, client }) => author === client.owner)
    .add(10, ({ author, client }) => author === client.owner);




client.gateways.guilds.schema
.add('djRole', 'role', {default: undefined })
.add('modRole', 'role', {default: undefined})
.add('adminRole', 'role', {default: undefined})
.add('extraRoles', 'role', {array: true})
.add('gtIP', 'string')
.add('gtGame', 'string')
.add('voiceCmds', 'channel', {default: undefined})
.add('muteRole', 'role', {default: undefined})
.add('welcomeChannel', 'channel', {default: undefined})
.add('commandChannel', 'channel', {array: true})
.add('logChannel', 'channel', {default: undefined});



new MusicClient()
    .login(process.env.TOKEN)
    .catch(console.error);
