const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Deixe ednaldo tocar uma bela musica  - Servidor precisa estar UP",
            options : [
                {
                    name: "musica",
                    description: "Nome ou link da música a ser tocada.",
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        
        const search = interaction.options.getString('musica')

        const embedError0 = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Não consegui encontrar essa música.`)
        .setColor("#2f3136")

        const embedError = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Não consigo buscar a música  😓.`)
        .setColor("#2f3136")

        const embedError1 = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Entre em um canal de voz primeiro 😎.`)
        .setColor("#2f3136")

        const embedError2 = new MessageEmbed()
        .setAuthor(`❌ Erro ao entrar na chamada.`)
        .setDescription(`Estou ocupado mermão guenta ae.`)
        .setColor("#2f3136")


        if(!interaction.member.voice.channel)
            return interaction.reply({
                embeds: [embedError1],
                ephemeral: false
            })

        if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id != interaction.member.voice.channel.id)
            return interaction.reply({
                embeds: [embedError2],
                ephemeral: false
            })

        let res;

        try{
            res = await this.client.manager.search(search, interaction.user)

            if(res.loadType == "LOAD_FAILED") throw res.exception
            else if(res.loadType == "PLAYLIST_LOADED") throw { message: "Playlists não são suportadas neste comando." }
        } catch (err){
            return interaction.reply({
                embeds: [embedError],
                ephemeral: true
            })
        }

        if(!res?.tracks?.[0]) 
            return interaction.reply({
                embeds: [embedError0],
                ephemeral: true
            })

        const player = this.client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })


        if (player.state === 'DISCONNECTED') player.connect()
        player.queue.add(res.tracks[0])
        if(!player.playing && !player.paused) player.play()


        
        const embed = new MessageEmbed()
        .setDescription(`\`${res.tracks[0].title}\` adicionada à fila.`)
        .setColor("#2f3136")

        return interaction.reply({
            embeds: [embed],
            ephemeral: false
        })
    }
}