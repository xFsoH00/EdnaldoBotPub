const Command = require("../../structures/Command")

const { MessageEmbed } = require('discord.js')

var vars = require('../../config/const');

const { default: axios } = require('axios');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "testserver",
            description: "Verificar se o servidor está online",
        })
    }

    run = async (interaction) => {
        var urlDev = vars.urlDev
        var urlProd = vars.urlProd
        const embed = new MessageEmbed()
            .setAuthor(`✅ Conexão estabelecida com sucesso...`)
            .setDescription(`Servidor da API **online** e operante!`)
            .setColor("#2f3136")
        const embedError = new MessageEmbed().setAuthor(`❌ Bad conenction`).setDescription('O servidor da API está meio para baixo hoje :( .').setColor("#2f3136")
        const embedError1 = new MessageEmbed().setAuthor(`❌ Permissão negada`).setDescription('Você não consegue fazer isso :( .').setColor("#2f3136")


        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            embeds: [embedError1],
            ephemeral: true
        })

        axios.get(urlProd + '/test')
        .then((res) => {
            interaction.reply({
                embeds: [embed],
                ephemeral: false
            })
        })
        .catch((e) => {
            interaction.reply({
                embeds: [embedError],
                ephemeral: false
            })
        }).then((res) => {
        })
    }
}