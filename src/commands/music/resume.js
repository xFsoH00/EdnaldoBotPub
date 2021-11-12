const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            description: "Desdespausar a música atual."
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao despausar a música.`)
        .setDescription(`Não estou tocando música no servidor no momento.`)
        .setColor("#2f3136")
 
 
        if(!player)
             return interaction.reply({
                 embeds: [embedError],
                 ephemeral: true
             })
         
         const memberVoiceChannel = interaction.member.voice.channel
         
         const embedError1 = new MessageEmbed()
         .setAuthor(`❌ Erro despausar a música.`)
         .setDescription(`Entre em um canal de voz primeiro 😎.`)
         .setColor("#2f3136")
 
         if(!memberVoiceChannel)
             return interaction.reply({
                 embeds: [embedError1],
                 ephemeral: true
             })
 
         const embedError3 = new MessageEmbed()
             .setAuthor(`❌ Erro ao despausar a música.`)
             .setDescription(`Eu não estou no seu canal de voz.`)
             .setColor("#2f3136")
 
         if(memberVoiceChannel.id !== player.voiceChannel)
             return interaction.reply({
                 embeds: [embedError3],
                 ephemeral: true
             })  
 
         const embedError4 = new MessageEmbed()
             .setAuthor(`❌ Erro ao despausar a música.`)
             .setDescription(`Não estou tocando música no momento.`)
             .setColor("#2f3136")
             
         if(!player.queue.current)
             return interaction.reply({
                 embeds: [embedError4],
                 ephemeral: true
             })
             
        const embedError5 = new MessageEmbed()
            .setAuthor(`❌ Erro ao despausar a música.`)
            .setDescription(`A música atual não está pausada.`)
            .setColor("#2f3136")
        
        if(!player.paused)
            return interaction.reply({
                embeds: [embedError5],
                ephemeral: true
            })
 
         const title = player.queue.current.title
 
         const embed = new MessageEmbed()
             .setDescription(`Música: \`${title}\` foi despausada por ${interaction.user.toString()}.`)
             .setColor("#2f3136")
 
         player.pause(false)
         return interaction.reply({
             embeds: [embed],
             ephemeral: false
         })
    }
}