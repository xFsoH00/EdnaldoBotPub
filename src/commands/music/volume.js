const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            description: "Mudar o volume do bot.",
            options: [
                {
                    name: "volume",
                    description: "Volume de 0 - 100",
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        const volume  = interaction.options.getString('volume')
        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao aumentar ou diminuir o volume.`)
        .setDescription(`Não estou tocando música no servidor no momento.`)
        .setColor("#2f3136")
 
 
        if(!player)
             return interaction.reply({
                 embeds: [embedError],
                 ephemeral: true
             })
         
         const memberVoiceChannel = interaction.member.voice.channel
         
         const embedError1 = new MessageEmbed()
         .setAuthor(`❌ Erro aumentar ou diminuir o volume.`)
         .setDescription(`Entre em um canal de voz primeiro 😎.`)
         .setColor("#2f3136")
 
         if(!memberVoiceChannel)
             return interaction.reply({
                 embeds: [embedError1],
                 ephemeral: true
             })
 
         const embedError3 = new MessageEmbed()
             .setAuthor(`❌ Erro ao aumentar ou diminuir o volume.`)
             .setDescription(`Eu não estou no seu canal de voz.`)
             .setColor("#2f3136")
 
         if(memberVoiceChannel.id !== player.voiceChannel)
             return interaction.reply({
                 embeds: [embedError3],
                 ephemeral: true
             })  
 
         const embedError4 = new MessageEmbed()
             .setAuthor(`❌ Erro ao aumentar ou diminuir o volume.`)
             .setDescription(`Não estou tocando música no momento.`)
             .setColor("#2f3136")
             
         if(!player.queue.current)
             return interaction.reply({
                 embeds: [embedError4],
                 ephemeral: true
             })
             
 
         const embed = new MessageEmbed()
             .setDescription(`Volume da música alterado por  ${interaction.user.toString()} para: \`${volume}\`.`)
             .setColor("#2f3136")
 
         player.setVolume(parseInt(volume))
         return interaction.reply({
             embeds: [embed],
             ephemeral: false
         })
    }
}