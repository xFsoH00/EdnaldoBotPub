const { MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('-1')
                .setCustomId('REMOVER'),
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('+1')
                .setCustomId('ADICIONAR'),
            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('ZERAR')
                .setCustomId('ZERAR'),
            new MessageButton()
                .setStyle('SECONDARY')
                .setLabel('FINALIZAR')
                .setCustomId('FINALIZAR')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'contador',
            description: 'Inicia um contador no canal'
        })
    }

    run = async (interaction) => {
        let contagem = 0


        const embed = new MessageEmbed()
            .setAuthor(` 📋Contador Finalizado`)
            .setDescription(`Contagem finalizada em: **`+ contagem +`**`)
            .setColor("#2f3136")

        const reply = await interaction.reply({
            content: `Contagem: **`+contagem+`**`,
            components: [actionRow],
            fetchReply: true
        })

        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: (10 * 60000) })

        

        collector.on('collect', (i) => {
            switch (i.customId) {
                case 'REMOVER':
                    contagem--
                    break;
                case 'ADICIONAR':
                    contagem++
                    break;
                case 'ZERAR':
                    contagem = 0
                    break;
                case 'FINALIZAR':
                    return interaction.editReply({
                        embeds: [embed],
                        components: []  
                    })
            }

            i.update({
                content: `Contagem: \`${contagem}\``
            })
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({
                embeds: [embed],
                components: []  
            })
        })
    }
}