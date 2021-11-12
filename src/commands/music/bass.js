const Command = require("../../structures/Command")

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "bass",
            description: "Aumentar ou diminuir o bass da música",
        })
    }

    run = async (interaction) => {

        const player = this.client.manager.get(interaction.guild.id)

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao mudar o nivel do bass.`)
        .setDescription(`Não estou tocando música no servidor no momento.`)
        .setColor("#2f3136")
 
 
        if(!player)
             return interaction.reply({
                 embeds: [embedError],
                 ephemeral: true
             })
         
         const memberVoiceChannel = interaction.member.voice.channel
         
         const embedError1 = new MessageEmbed()
         .setAuthor(`❌ Erro mudar o nivel do bass.`)
         .setDescription(`Entre em um canal de voz primeiro 😎.`)
         .setColor("#2f3136")
 
         if(!memberVoiceChannel)
             return interaction.reply({
                 embeds: [embedError1],
                 ephemeral: true
             })
 
         const embedError3 = new MessageEmbed()
             .setAuthor(`❌ Erro ao mudar o nivel do bass.`)
             .setDescription(`Eu não estou no seu canal de voz.`)
             .setColor("#2f3136")
 
         if(memberVoiceChannel.id !== player.voiceChannel)
             return interaction.reply({
                 embeds: [embedError3],
                 ephemeral: true
             })  
 
         const embedError4 = new MessageEmbed()
             .setAuthor(`❌ Erro ao mudar o nivel do bass.`)
             .setDescription(`Não estou tocando música no momento.`)
             .setColor("#2f3136")
             
         if(!player.queue.current)
             return interaction.reply({
                 embeds: [embedError4],
                 ephemeral: true
             })
             
        const levels = [
            {nivel: "Nenhum", value: "0.0"},
            {nivel: "Baixo", value: "0.10"},
            {nivel: "Médio", value: "0.15"},
            {nivel: "Alto", value: "0.25"}
        ]

        const actionRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId('bassSelect')
                    .setPlaceholder('Selecione um nivel.')
                    .addOptions(
                        levels
                            .map(c => {
                                return {
                                    label: c.nivel,
                                    value: c.value
                                }
                            })
                    )
            ])

        const reply = await interaction.reply({
            content: "Selecione abaixo o nivel para aplicar o **bassboost**.",
            components: [actionRow],
            fetchReply: true
        })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

        collector.on('collect', (i) => {
            const level = i.values[0]
            const bands = new Array(3)
             .fill(null)
             .map((_, i) =>
                    ({ band: i, gain: level })
                );
            player.setEQ(...bands)

            const embed = new MessageEmbed()
            .setDescription(`Nivel do bass alterado para **${level}** por ${interaction.user.toString()}.`)
            .setColor("#2f3136")
            interaction.editReply({
                embeds: [embed],
                ephemeral: false,
                components: []
            })
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({
                content: "O tempo para informar o nivel se esgotou...",
                components: []
            })
        })
    }
}