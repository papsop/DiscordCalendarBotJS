import { I_Command } from "./I_Command";
import { SlashCommandBuilder } from "@discordjs/builders";

export class CalendarCommand implements I_Command
{
    _name: string = "calendar";
    _slashCommand : any;
    _rawCommandData : JSON;

    constructor()
    {
        this._slashCommand = new SlashCommandBuilder()
            .setName(this._name)
            .setDescription("calendar stuff")
            .addSubcommand( subcommand => subcommand
                .setName('add')
                .setDescription("adds calendar"))
            .addSubcommand( subcommand => subcommand
                .setName('remove')
                .setDescription("removes calendar"))
            .addSubcommand( subcommand => subcommand
                .setName('edit')
                .setDescription("edits calendar"))

        this._rawCommandData = this._slashCommand.toJSON();
    }
}