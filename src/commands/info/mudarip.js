const Command = require("../../structures/Command")

const { MessageEmbed } = require('discord.js')

var XMLHttpRequest = require('xhr2');

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
        console.log(interaction)
        var ip = interaction.options.getString("ip")
        const embed = new MessageEmbed()
            .setAuthor(`✅ Sucesso`)
            .setDescription(`**IP** alterado com sucesso para **`+ ip +`**`)
            .setFooter(`Reinicie seu script`)
            .setColor("#2f3136")
        const embedError = new MessageEmbed().setDescription('Não encontramos sua licença no nosso **banco de dados**. \n Abra um ticket informando isso a um de nossos desenvolvedores.').setColor("#2f3136")
        var info = {
            "ip": toString(ip)
        }

        axios.post('http://52.67.162.210:8080/changeip', info)
        .then((res) => {
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        })
        .catch((res) => {
            interaction.reply({
                embeds: [embedError],
                ephemeral: false
            })
        })

        // var xhr = new XMLHttpRequest()
        // xhr.open("POST", "http://52.67.162.210:8080/changeip", true)
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.send(JSON.stringify(info))
        // xhr.onreadystatechange = function(){
        //     if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
        //         interaction.reply({
        //             embeds: [embed],
        //             ephemeral: true
        //         })
        //     } else {
        //         interaction.reply({
        //             embeds: [embedError],
        //             ephemeral: false
        //         })
        //     }
        // }
    }
}