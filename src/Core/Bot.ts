import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client, Guild, Intents, MessageEmbed, Permissions } from "discord.js";
import { Config } from './Config';

import { CalendarCommand } from "../Commands/CalendarCommand";
import { I_Command } from "../Commands/I_Command";
import { StatusCommand } from '../Commands/StatusCommand';
import { Trace } from "../Debug/Trace";
import { Embeds } from "../Utils";

interface CommandEntry
{
    [key: string] : I_Command;
}

export enum BotPermissions
{
    ManageChannels,
    ManageRoles
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
        this._client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

        this.registerCommand(new StatusCommand(this));
        this.registerCommand(new CalendarCommand(this));

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

    // call this function via ./src/deploy-commands.ts
    // needs to be called only once to register commands to discord API
    async deployCommands()
    {
        let rawCommands : JSON[] = [];
        for(let entry in this._commands) 
        {
            rawCommands.push(this._commands[entry]._rawCommandData); 
            Trace.LogInfo("Bot.DeployCommands()", `Registering command "${this._commands[entry]._name}"`);
        }

        const rest = new REST({ version: '9' }).setToken(this._token);
        await rest.put( Routes.applicationCommands(this._appID), {body: rawCommands})
        .then( () =>  Trace.LogInfo("Bot.DeployCommands()", "Commmands registered"))
        .catch(console.error);
    }

    hasPermissions(guild : Guild, permissions : BotPermissions) : boolean
    {
        let result : boolean | undefined = false;
        switch (permissions)
        {
            case BotPermissions.ManageChannels:
                result = guild.me?.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS);
                break;
            case BotPermissions.ManageRoles:
                result = guild.me?.permissions.has(Permissions.FLAGS.MANAGE_ROLES);
                break;
        }

        return !!result;
    }

    // =======================================================================================================================
    // Handling client events
    // =======================================================================================================================
    handleReady()
    {
        Trace.LogSuccess("Bot.handleReady()", `Successfully logged in as ${this._client.user?.username}`);
    }

    async handleInteractionCreate(interaction : any)
    {
        const isAdmin : boolean = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
        if(!isAdmin)
        {
            interaction.reply({content: "insufficient permissions", ephemeral: true,});
            return;
        }

        if(interaction.isCommand()) await this.handleCommandInteraction(interaction);
        else if (interaction.isModalSubmit()) await this.handleModalSubmitInteraction(interaction);
        else if (interaction.isSelectMenu()) await this.handleSelectMenuInteraction(interaction);
    }

    async handleCommandInteraction(interaction : any)
    {
        let commandName : string = interaction.commandName;
        if( !(commandName in this._commands) ) return; // shouldn't happen, but let's check just in case
        
        await this._commands[commandName].execute(interaction);
    }

    async handleSelectMenuInteraction(interaction : any)
    {
        console.log("handling select menu");
    }

    async handleModalSubmitInteraction(interaction : any)
    {
        console.log("handling modal submit");
        const embed : MessageEmbed = Embeds.GetEmbedSuccess()
            .setTitle("Modal submitted")
            .setDescription("Thanks for submitting the great modal");
        await interaction.reply({ content: '\u200B', ephemeral: true, embeds: [embed] });
    }
}