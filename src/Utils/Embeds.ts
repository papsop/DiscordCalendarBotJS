import { EmbedFooterData } from "@discordjs/builders";
import { Message, MessageEmbed } from "discord.js";
import { Config } from "../Core/Config";


const config : Config = require("../config.json");

const footerData : EmbedFooterData = { text: "Bot by @BlueX_ow", iconURL: "https://cdn.discordapp.com/avatars/162554458469957632/7493b46779c76e231f8b79795df8a477.webp"}

export namespace Embeds
{

    export function GetEmbedSuccess() : MessageEmbed
    {
        const embed : MessageEmbed = new MessageEmbed()
            .setColor(config.Colors.success)
            .setTimestamp()
            .setFooter(footerData);

        return embed;
    }
 
    export function GetEmbedInfo() : MessageEmbed
    {
        const embed : MessageEmbed = new MessageEmbed()
            .setColor(config.Colors.info)
            .setTimestamp()
            .setFooter(footerData);

        return embed;
    }
}