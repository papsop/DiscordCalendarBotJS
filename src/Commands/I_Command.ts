import { SlashCommandBuilder } from "@discordjs/builders";

export interface I_Command
{
    _name : string;
    _slashCommand : any;
    _rawCommandData : JSON;

    execute(interaction : any) : void;
}