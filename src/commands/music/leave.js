const Command = require("../../structures/Command")
const voiceDiscord = require('@discordjs/voice')

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "leave",
            description: "Retirar ednaldo da call."
        })
    }

    run = (interaction) => {
        const channel = interaction.member.voice.channel
        const player = this.client.manager.get(interaction.guild.id)
        const members = interaction.member.voice.channel.members

        var info = {
            channelId: channel.id, 
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }
        
        const embed = new MessageEmbed()
            .setAuthor(`✅ Saindo...`)
            .setDescription(`Tudo bem eu saio, vale nada vale tudo.`)
            .setColor("#2f3136")

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao sair da chamada.`)
        .setDescription(`Eu não estou nessa call mermão.`)
        .setColor("#2f3136")

        const embedError1 = new MessageEmbed()
        .setAuthor(`❌ Erro ao sair da chamada.`)
        .setDescription(`Nem em canal tu quer e ta querendo me tirar.`)
        .setColor("#2f3136")

        var itemProcessed = 0

        const connection = voiceDiscord.joinVoiceChannel(info)

        members.forEach((value, index, array) =>  {
            itemProcessed = itemProcessed + 1;
            if(value.id == '743295235735683132'){
                if(player) {
                    player.stop()
                    player.queue.clear()
                }
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: false
                })
            }
            if(itemProcessed === array.size){
                return interaction.reply({
                    embeds: [embedError],
                    ephemeral: false
                })
            }
        })

        if(!channel){
            return interaction.reply({
                    embeds: [embedError1],
                    ephemeral: false
            })
        }
    }
}