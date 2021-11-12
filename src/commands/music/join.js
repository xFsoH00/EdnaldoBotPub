const Command = require("../../structures/Command")
const voiceDiscord = require('@discordjs/voice')

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "join",
            description: "Chamar o ednaldo para cantar vale nada vale tudo."
        })
    }

    run = (interaction) => {

        const channel = interaction.member.voice.channel
        const player = voiceDiscord.createAudioPlayer();
        const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/596154239479447552/908531033551548426/valeNadaValeTudo.mp3');
        var info = {
            channelId: channel.id, 
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }

        const connection = voiceDiscord.joinVoiceChannel(info)
        
        const embed = new MessageEmbed()
            .setAuthor(`✅ Entrando...`)
            .setDescription(`Estou entrando segura ae que preciso dizer uma coisa.`)
            .setColor("#2f3136")

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Estou ocupado ou errei o caminho  😓.`)
        .setColor("#2f3136")

        const embedError1 = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Entre em um canal de voz primeiro 😎.`)
        .setColor("#2f3136")

        if(!channel){
            return interaction.reply({
                    embeds: [embedError1],
                    ephemeral: false
            })
        }else{
            player.play(resource)
            connection.subscribe(player)

            player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                connection.destroy()
            })
            interaction.reply({
                embeds: [embed],
                ephemeral: false
            })
        }
    }
}