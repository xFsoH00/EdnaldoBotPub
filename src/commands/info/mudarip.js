const Command = require("../../structures/Command")

const { MessageEmbed } = require('discord.js')

var vars = require('../../config/const');

const { default: axios } = require('axios');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "mudarip",
            description: "Mudar ip do script",
            options: [
                {
                    name: "ip",
                    type: "STRING",
                    description: "IP novo para o script",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        var urlDev = vars.urlDev
        var urlProd = vars.urlProd
        var id = interaction.user.id
        var ip = interaction.options.getString("ip")
        const embed = new MessageEmbed()
            .setAuthor(`✅ Sucesso`)
            .setDescription(`**IP** alterado com sucesso para **`+ ip +`**`)
            .setFooter(`Reinicie seu script`)
            .setColor("#2f3136")
        const embedError = new MessageEmbed().setAuthor(`❌ Erro ao encontrar licença.`).setDescription('Não encontramos sua licença no nosso **banco de dados**. \n Abra um ticket informando isso a um de nossos desenvolvedores.').setColor("#2f3136")
        
        var auth2 = (id * Math.PI) * 94367098231

        var info = {
            "ip": ip,
            "idUser": id,
            "auth":  auth2
        }


        axios.post(urlProd + '/changeip', info)
        .then((res) => {
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        })
        .catch((res) => {
            interaction.reply({
                embeds: [embedError],
                ephemeral: true
            })
        })
    }
}