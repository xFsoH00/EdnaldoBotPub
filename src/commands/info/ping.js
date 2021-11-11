const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Mostra o ping do bot"
        })
    }

    run = (interaction) => {
        const embedMessage = new MessageEmbed()
            .setDescription(`\`${this.client.ws.ping}\` ms 🏓`)
            .setColor("#2f3136")

        interaction.reply({
            embeds: [embedMessage],
            ephemeral: false
        })
    }
}