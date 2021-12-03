const { Manager } = require('erela.js')
const { MessageEmbed } = require("discord.js")
const Spotify = require("erela.js-spotify")

module.exports = (client) => {
    return  new Manager({
        nodes: [{
            host: "127.0.0.1",
            password: "lavalink6969",
            port: 8080
        }],
        send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        },
        plugins: [
            new Spotify({
                clientID: "clientIdspotify",
                clientSecret: "clientSecret"
            })
        ]
    })
        .on("nodeConnect", node => console.log(`Servidor de música conectado com sucesso.`))
        .on("nodeError", (node, error) => console.log(
        `Servidor de música não encontrado, para resolver inicie o Lavalink`
        ))

        .on("trackStart", (player, track) => {
            const embed = new MessageEmbed()
            .setAuthor(`🎧 Som na caixa!`)
            .setDescription(`Tocando agora: `+ track.title)
            .addFields({name: 'Solicitado por:', value: track.requester.toString()})
            .setImage(track.thumbnail)
            .setFooter(track.author)
            .setColor("#06f306")

            const channel = client.channels.cache.get(player.textChannel);
            channel.send({embeds: [embed]});
        })
        .on("queueEnd", player => {
            const embed1 = new MessageEmbed()
            .setDescription(`A fila acabou, to saindo foram em - **vale nada vale tudo**`)
            .setColor("#2f3136")

            const channel = client.channels.cache.get(player.textChannel);
            channel.send({embeds: [embed1]});
            player.destroy();
        });
}
