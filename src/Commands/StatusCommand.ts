import { I_Command } from "./I_Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Bot, BotPermissions } from "../Core/Bot";
import { MessageEmbed } from "discord.js";
import { Embeds } from "../Utils";

interface StatusEntry
{
    [key: string] : boolean;
}

export class StatusCommand implements I_Command
{
    _name: string = "status";
    _slashCommand : any;
    _rawCommandData : JSON;
    _bot : Bot;

    constructor(bot : Bot)
    {
        this._bot = bot;
        this._slashCommand = new SlashCommandBuilder()
            .setName(this._name)
            .setDescription("checks bot status")
            
        this._rawCommandData = this._slashCommand.toJSON();
    }

    async execute(interaction : any) 
    {
        const max_length : number = 17;
        // Bot
        let botString : string = "";

        botString += `Uptime: ${Math.floor(process.uptime()/60)} minutes`
        
        // Permissions
        const statusEntries : StatusEntry = 
        {
            "Manage channels" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageChannels),
            "Manage roles" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageRoles),
            "Manage gsd" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageRoles),
            "Manage agsdf" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageRoles),
            "Manage asf" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageRoles),
            "Manage afsd" : this._bot.hasPermissions(interaction.guild, BotPermissions.ManageRoles),
        }

        let rolesString : string = "";
        for(let entry in statusEntries)
        {
            const spaces_num = max_length - entry.length;
            const spaces = ' '.repeat( (spaces_num < 0) ? 0 : spaces_num );
            const emoji : string = (statusEntries[entry]) ? ':white_check_mark:' : ':x:';
            rolesString += `\`${entry+spaces}\` ${emoji}\n`;
        }
        rolesString.slice(0,-1); // remove last \n
        
        const embed : MessageEmbed = Embeds.GetEmbedInfo()
            .setTitle(":green_circle: Bot status ")
            .setDescription(botString)
            .addField('Bot\'s guild permissions:', rolesString);

        await interaction.reply({content: '\u200B', embeds: [embed]});
    }
}