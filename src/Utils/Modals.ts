import { MessageActionRow, Modal, TextInputComponent, ModalActionRowComponent } from 'discord.js';

export namespace Modals
{
    export function GetModalGoogle() : Modal
    {
        const modal = new Modal()
        .setCustomId('modal_google')
        .setTitle('Create Google calendar');
        // Add components to modal
        // Create the text input components
        const favoriteColorInput = new TextInputComponent()
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's your favorite color?")
            // Short means only a single line of text
            .setStyle('SHORT');
        const hobbiesInput = new TextInputComponent()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            // Paragraph means multiple lines of text.
            .setStyle('PARAGRAPH');
        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(favoriteColorInput);
        const secondActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(hobbiesInput);
        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);
        // Show the modal to the user
        return modal;
    }

    export function GetModalTeamup() : Modal
    {
        const modal = new Modal()
        .setCustomId('modal_teamup')
        .setTitle('Create TeamUp calendar');
        // Add components to modal
        // Create the text input components
        const favoriteColorInput = new TextInputComponent()
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's your favorite color?")
            // Short means only a single line of text
            .setStyle('SHORT');
        const hobbiesInput = new TextInputComponent()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            // Paragraph means multiple lines of text.
            .setStyle('PARAGRAPH');
        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(favoriteColorInput);
        const secondActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(hobbiesInput);
        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);
        // Show the modal to the user
        return modal;
    }
}