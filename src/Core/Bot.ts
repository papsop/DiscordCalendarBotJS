import { Client, Intents, Interaction } from "discord.js";
import { Config } from './Config';
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";

import { I_Command } from "../Commands/I_Command";
import { CalendarCommand } from "../Commands/CalendarCommand";
import { StatusCommand } from '../Commands/StatusCommand';

export class Bot
{
    private _appID : string;
    private _token : string;
    private _client : Client;
    private _config : Config;
    private _commands : I_Command[] = [];

    constructor(config : Config)
    {
        this._config = config;
        this._appID = config.Discord.app_id;
        this._token = config.Discord.token;
        this._client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

        this.registerCommand(new StatusCommand());
        this.registerCommand(new CalendarCommand());

        // save callbacks for events
        this._client.on('ready', this.handleReady.bind(this));
        this._client.on('interactionCreate', async (interaction : any) => {
            await interaction.reply({ content: 'Pong!', ephemeral: true });
        });
    }

    registerCommand(command : I_Command)
    {
        this._commands.push(command);
    }

    run()
    {
        this._client.login(this._token);
    }

    async deployCommands()
    {
        let rawCommands : JSON[] = this._commands.map( command => command._rawCommandData);

        console.log(rawCommands);
        const rest = new REST({ version: '9' }).setToken(this._token);
        await rest.put( Routes.applicationCommands(this._appID), {body: rawCommands})
        .then( () => console.log("commands deployed"))
        .catch(console.error);
    }

    // Handling client events
    handleReady()
    {
        console.log("Bot is ready I guess");
    }

    async handleInteractionCreate(interaction : any)
    {
        console.log(interaction);
        //await interaction.reply("ty");
    }

}