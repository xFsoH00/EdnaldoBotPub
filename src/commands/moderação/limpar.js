const Command = require("../../structures/Command")
const { Client } = require("discord.js")

const { MessageEmbed, Message, MessageManager } = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "limpar",
            description: "Limpar uma quantidade de mensagem",
            options: [
                {
                    name: "numero",
                    type: "STRING",
                    description: "Quantidade a ser apagada",
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const channel = this.client.channels.cache.get(interaction.channelId)
        // Get message
        const amount = parseInt(interaction.options.getString('numero'))

        // const messages = await message.channel.messages.fetch({limit: amount + 1})
        const embed = new MessageEmbed()
        .setDescription(`🗑️ **`+ amount +`** mensagem limpas com sucesso.`)
        .setColor("#2f3136")

        const embedError = new MessageEmbed().setAuthor(`❌ Erro ao apagar as mensagens.`).setDescription('Você não consegue executar esse comando :( .').setColor("#2f3136")
        const embedError1 = new MessageEmbed().setAuthor(`❌ Erro ao apagar as mensagens.`).setDescription('O limite de mensagem que consigo deletar é **99**.').setColor("#2f3136")
        const embedError2 = new MessageEmbed().setAuthor(`❌ Erro ao apagar as mensagens.`).setDescription('Não consegui apagar as mensagens :( .').setColor("#2f3136")
        const embedError3 = new MessageEmbed().setAuthor(`❌ Erro ao apagar as mensagens.`).setDescription('O canal não possui tudo isso de mensagens.').setColor("#2f3136")

        var mensagens = 0

        const list = await channel.messages.fetch({ limit: amount })
        .then((messages) => {
                messages.forEach((value, index, array) => {
                    channel.messages.delete(value)
                })
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
        }).catch((e) => {
            return interaction.reply({
                embeds: [embedError2],
                ephemeral: true
            })
        })

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            embeds: [embedError],
            ephemeral: true
        })

        if(amount > 99){
            return interaction.reply({
                embeds: [embedError1],
                ephemeral: true
            })
        }
    }
}

// TODO: Existe alguns bugs na hora de apagar, provavelmente é a forma como está puxando as mensagens