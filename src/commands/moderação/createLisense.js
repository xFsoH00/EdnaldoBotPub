const Command = require("../../structures/Command")

const { MessageEmbed } = require('discord.js')

var vars = require('../../config/const');

const { default: axios } = require('axios');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "createlisense",
            description: "Criar lisença para o usuário",
            options: [
                {
                    name: "id",
                    type: "STRING",
                    description: "Id do usuário a receber uma lisença",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        var urlDev = vars.urlDev
        var urlProd = vars.urlProd
        var id = interaction.user.id
        var id2 = interaction.options.getString("id")
        const embed = new MessageEmbed()
            .setAuthor(`✅ Sucesso`)
            .setDescription(`**Lisense** gerada com sucesso para o usuário de ID: **`+ id +`**`)
            .setColor("#2f3136")
        const embedError = new MessageEmbed().setAuthor(`❌ Erro ao criar licença.`).setDescription('Ja encontramos uma licença desse usuário em nosso **banco de dados**.').setColor("#2f3136")
        const embedError1 = new MessageEmbed().setAuthor(`❌ Erro ao criar licença.`).setDescription('Você não consegue fazer isso :( .').setColor("#2f3136")

        var auth2 = (id * Math.PI) * 94367098231

        var info = {
            "id": id,
            "idUser": id2,
            "auth": auth2
        }

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            embeds: [embedError1],
            ephemeral: true
        })

        axios.post(urlProd + '/createlisense', info)
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