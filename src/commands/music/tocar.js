const Command = require("../../structures/Command")
const voiceDiscord = require('@discordjs/voice')

const { MessageEmbed } = require("discord.js")



module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "tocar",
            description: "Deixar o ednaldo ser um Dj de qualidade.",
            options: [
                {
                    name: "link",
                    type: "STRING",
                    description: "Digite o link da música - Youtube",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const ytdl = require('ytdl-core')
        const url = interaction.options.getString('link')
        const channel = interaction.member.voice.channel
        const player = voiceDiscord.createAudioPlayer();
        const stream = ytdl(url, { filter: 'audioonly'})
        const resource = voiceDiscord.createAudioResource(stream)
        var videoId = ytdl.getURLVideoID(url)
        var infoVideo = await ytdl.getInfo(videoId)
        var info = {
            channelId: channel.id, 
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }
        // const connection = voiceDiscord.joinVoiceChannel(info)
         
        const embed = new MessageEmbed()
            .setAuthor(`🎧 Som na caixa!`)
            .setDescription(`Tocando agora: `+ infoVideo.videoDetails.title)
            .setImage(infoVideo.videoDetails.thumbnails[3].url)
            .setFooter(infoVideo.videoDetails.author.name)
            .setColor("#06f306")

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
            // player.play(resource)
            // connection.subscribe(player)
            // player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            //     connection.destroy()
            // })
            interaction.reply({
                embeds: [embed],
                ephemeral: false
            })
        }
    }

    //TODO: Sitema de filas, volume e Now Playing , Validar URL e tratar erros - Ler documentaçao YTDL
}