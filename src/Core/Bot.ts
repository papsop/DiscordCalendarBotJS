import { Client, Intents, Interaction } from "discord.js";
import { Config } from './Config';
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";

import { I_Command } from "../Commands/I_Command";
import { CalendarCommand } from "../Commands/CalendarCommand";
import { StatusCommand } from '../Commands/StatusCommand';

interface CommandEntry
{
    [key: string] : I_Command;
}

export class Bot
{
    private _appID : string;
    private _token : string;
    private _client : Client;
    private _config : Config;
    private _commands : CommandEntry = {};

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
            await this.handleInteractionCreate(interaction);
        });
    }

    registerCommand(command : I_Command)
    {
        this._commands[command._name] = command;
    }

    run()
    {
        this._client.login(this._token);
    }

    async deployCommands()
    {
        let rawCommands : JSON[] = [];
        for(let entry in this._commands)
        {
            rawCommands.push(this._commands[entry]._rawCommandData); 
        }

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
        if(interaction.isCommand()) await this.handleCommandInteraction(interaction);
        else if (interaction.isModalSubmit()) await this.handleModalSubmitInteraction(interaction);
    }

    async handleCommandInteraction(interaction : any)
    {
        let commandName : string = interaction.commandName;
        if( !(commandName in this._commands) ) return; // shouldn't happen, but let's check just in case
        
        this._commands[commandName].execute();
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    }

    async handleModalSubmitInteraction(interaction : any)
    {
        console.log("handling modal submit");
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    }
}