import { I_Command } from "./I_Command";
import { SlashCommandBuilder } from "@discordjs/builders";

export class StatusCommand implements I_Command
{
    _name: string = "status";
    _slashCommand : any;
    _rawCommandData : JSON;

    constructor()
    {
        this._slashCommand = new SlashCommandBuilder()
            .setName(this._name)
            .setDescription("checks bot status")
            
        this._rawCommandData = this._slashCommand.toJSON();
    }

    execute(): void 
    {
        console.log("executing status");    
    }
}