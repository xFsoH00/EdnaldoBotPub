const Command = require("../../structures/Command")

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "falar",
            description: "Faz com que o bot diga alguma mensagem.",
            options: [
                {
                    name: "mensagem",
                    type: "STRING",
                    description: "A mensagem que será enviada no canal.",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        const embedError = new MessageEmbed()
            .setAuthor(`❌ Erro ao enviar a mensagem.`)
            .setDescription(`Não foi possível enviar sua mensagem.`)
            .setColor("#2f3136")

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({
            embeds: [embedError],
            ephemeral: true
        })

        const channels = interaction.guild.channels.cache
            .filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(this.client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS"]) && c.permissionsFor(interaction.user.id).has(["SEND_MESSAGES"]))

        if (!channels.size) return interaction.reply({
            embeds: [embedError],
            ephemeral: true
        })

        const actionRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId('channelSelect')
                    .setPlaceholder('Selecione um canal.')
                    .addOptions(
                        channels
                            .map(c => {
                                return {
                                    label: c.name,
                                    value: c.id
                                }
                            })
                    )
            ])

        const reply = await interaction.reply({
            content: "Selecione abaixo o canal onde você deseja enviar a sua **mensagem**.",
            components: [actionRow],
            fetchReply: true
        })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

        collector.on('collect', (i) => {
            const idCanal = i.values[0]
            const canal = interaction.guild.channels.cache.get(idCanal)

            const texto = interaction.options.getString("mensagem")

            const embedMessage = new MessageEmbed()
                .setDescription(texto)
                .setColor("#2f3136")

            const embedSucess = new MessageEmbed()
                .setDescription(`Mensagem enviada com sucesso no canal ${canal.toString()}.`)
                .setColor("#2f3136")

            canal.send({ embeds: [embedMessage] })
                .then(() => interaction.editReply({ embeds: [embedSucess], components: [] }))
                .catch(() => interaction.editReply({ embeds: [embedError], ephemeral: true }))
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({
                content: "O tempo para informar o canal se esgotou...",
                components: []
            })
        })
    }
}