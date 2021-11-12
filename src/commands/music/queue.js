const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Mostrar a fila de músicas atual."
        })
    }

    run = async (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao mostrar a fila.`)
        .setDescription(`Não estou tocando música no servidor no momento.`)
        .setColor("#2f3136")
 
       



        if(!player)
             return interaction.reply({
                 embeds: [embedError],
                 ephemeral: true
             })
         
         const memberVoiceChannel = interaction.member.voice.channel
         
         const embedError1 = new MessageEmbed()
         .setAuthor(`❌ Erro mostrar a fila.`)
         .setDescription(`Entre em um canal de voz primeiro 😎.`)
         .setColor("#2f3136")
 
         if(!memberVoiceChannel)
             return interaction.reply({
                 embeds: [embedError1],
                 ephemeral: true
             })
 
         const embedError3 = new MessageEmbed()
             .setAuthor(`❌ Erro ao mostrar a fila.`)
             .setDescription(`Eu não estou no seu canal de voz.`)
             .setColor("#2f3136")
 
         if(memberVoiceChannel.id !== player.voiceChannel)
             return interaction.reply({
                 embeds: [embedError3],
                 ephemeral: true
             })  
 
         const embedError4 = new MessageEmbed()
             .setAuthor(`❌ Erro ao mostrar a fila.`)
             .setDescription(`Não estou tocando música no momento.`)
             .setColor("#2f3136")
             
         if(!player.queue.current)
             return interaction.reply({
                 embeds: [embedError4],
                 ephemeral: true
             })

             const queue = player.queue
             const current = queue.current
             const tracks = queue.slice(0, 10)
            
             let campos = [{
                name: `\u200B`,
                value: `**Próximas músicas**`
             },
            ]     
     
            const embedQueue = new MessageEmbed()
                 .setAuthor(`📋 Tocando agora`)
                 .setDescription(`\`${current.title}\``)
                 .setColor('#2f3136')
             if(tracks.size == 0){ embedQueue.addFields([{name: `\u200B`, value: `**A fila está vazia**`}])}
             else{
                await tracks.map((t, index, array) => {
                    var info = {
                        name: `Posição: ${index + 1}`,
                        value: `\`${t.title}\``
                    }

                    campos.push(info)
                 })
                 embedQueue.addFields(campos)
             }
             console.log(tracks.size)
             return interaction.reply({
                embeds: [embedQueue],
                ephemeral: false
            })
    }
}