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

client.on("ready", async function () {
    // Presença do bot
    while(true){
        client.user.setPresence({ activities: [{ name: 'Em desenvolvimento!', custom: "Desenvolvendo" }], status: 'dnd' });
        await sleep(10000)
        client.user.setPresence({ activities: [{ name: 'Ja consigo tocar músicas!', custom: "Desenvolvendo" }], status: 'dnd' });
        await sleep(10000)
    }
})

client.on("messageCreate", function(message) {
    if(message.guildId != "401552354106671115"){
        client.destroy()
    }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.BOT_TOKEN)
