const Command = require("../../structures/Command")

const { MessageEmbed } = require('discord.js')

var vars = require('../../config/const');

const { default: axios } = require('axios');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "deletelisense",
            description: "Remover lisença de um usuário",
            options: [
                {
                    name: "id",
                    type: "STRING",
                    description: "Id do usuário para a remoção",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        var urlDev = vars.urlDev
        var urlProd = vars.urlProd
        var id = interaction.options.getString("id")
        const embed = new MessageEmbed()
            .setAuthor(`✅ Sucesso`)
            .setDescription(`**Lisense** do usuário de ID: **`+ id +`** apagada com sucesso.`)
            .setColor("#2f3136")
        const embedError = new MessageEmbed().setAuthor(`❌ Erro ao deletar lisença.`).setDescription('Não encontramos uma licença no **ID: '+id+'** em nosso **banco de dados**.').setColor("#2f3136")
        const embedError1 = new MessageEmbed().setAuthor(`❌ Erro ao deletar lisença.`).setDescription('Você não consegue fazer isso :( .').setColor("#2f3136")

        var auth2 = (id * Math.PI) * 94367098231

        var info = {
            "idUser": id,
            "auth": auth2
        }

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            embeds: [embedError1],
            ephemeral: true
        })

        axios.post(urlProd + '/deletelisense', info)
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