const Command = require("../../structures/Command")

const { MessageEmbed } = require("discord.js")


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "send",
            description: "Mandar mensagem para o usuário.",
            options: [
                {
                    name: "mensagem",
                    type: "STRING",
                    description: "Mensagem que será enviada.",
                    required: true
                },
                {
                    name: "id",
                    type: "STRING",
                    description: "id do usuário que receberá a mensagem.",
                    required: true
                },
            ]
        })
    }

    run = (interaction) => {

        const mensagem = interaction.options.getString('mensagem')
        const id = interaction.options.getString('id')
        const user =    interaction.guild.members.cache.get(id)
        const embedError = new MessageEmbed().setAuthor(`❌ Erro ao mandar mensagem.`).setDescription('Usuário não encontrado .').setColor("#2f3136")
        const embedError1 = new MessageEmbed().setAuthor(`❌ Erro ao mandar mensagem.`).setDescription('Você não consegue fazer isso :( .').setColor("#2f3136")
        const embed = new MessageEmbed()
        .setAuthor(`✅ Perturbando as DMS'S RSRS`)
        .setDescription(`Mensagem enviada para <@`+ id +`>.`)
        .setColor("#2f3136")
        .setFields([{
            "name": `Mensagem`,
            "value": mensagem
        }])

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            embeds: [embedError1],
            ephemeral: true
        })

        if(!user)
            return  interaction.reply({
                embeds: [embedError],
                ephemeral: true
            })

            user.send(mensagem).then(() => {
                return  interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            })
    }
}