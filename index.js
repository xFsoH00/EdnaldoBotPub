require("dotenv").config()

const Client = require("./src/structures/Client")

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

client.once("ready", function () {
    // Presença do bot
    client.user.setPresence({ activities: [{ name: 'Em desenvolvimento!', custom: "Desenvolvendo" }], status: 'dnd' });
})

client.on("messageCreate", function(message) {
    let mm = message.content
    if (mm === "salve av") {
        let messages = [
            {message: "Eae maluco firmeza?"}, //0
            {message: "Dale mermão, veio comprar o que?"}, //1
            {message: "Chora pra mim!"},
            {message: "Fala comigo meu rei!"},
            {message: "Fala memo."}
        ]

        var id = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        message.reply(messages[id].message)
    }
})

client.login(process.env.BOT_TOKEN)
