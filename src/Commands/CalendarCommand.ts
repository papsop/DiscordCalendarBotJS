import { I_Command } from "./I_Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Channel, Modal } from "discord.js";
import { Modals } from "../Utils";
import { Bot } from "../Core/Bot";

export class CalendarCommand implements I_Command
{
    _name: string = "calendar";
    _slashCommand : any;
    _rawCommandData : JSON;
    _bot : Bot;

    constructor(bot : Bot)
    {
        this._bot = bot;
        this._slashCommand = new SlashCommandBuilder()
            .setName(this._name)
            .setDescription("calendar stuff")
            .addSubcommand( subcommand => subcommand
                .setName('add')
                .setDescription("adds calendar")
                .addStringOption(option =>
                    option.setName('provider')
                        .setDescription('Calendar provider')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Teamup', value: 'teamup' },
                            { name: 'Google', value: 'google' },
                        ))
                .addChannelOption(option => option.setName('channel').setDescription('Select a channel'))
                )
            .addSubcommand( subcommand => subcommand
                .setName('remove')
                .setDescription("removes calendar"))
            .addSubcommand( subcommand => subcommand
                .setName('edit')
                .setDescription("edits calendar"))

        this._rawCommandData = this._slashCommand.toJSON();
    }

    async execute(interaction : any)
    {
        if(interaction.options._subcommand == 'add')
        {
            const options = interaction.options._hoistedOptions;
            const provider = options[0].value;
            if(options.length >= 2)
            {
                const channel : Channel = options[1].channel;
                console.log(channel);
                if(channel.type != 'GUILD_TEXT')
                {
                    await interaction.reply({content: "Only text channels are supported"});
                    return;
                }
            }

            let modal : Modal = new Modal();
            
            if(provider == "teamup") 
                modal = Modals.GetModalTeamup();
            else if(provider == "google") 
                modal = Modals.GetModalGoogle();

            await interaction.showModal(modal);
        }
    }
}