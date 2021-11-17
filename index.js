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
        client.user.setPresence({ activities: [{ name: "Em desenvolvimento por: '𝙩𝙝#6656", type: "WATCHING" }], status: 'dnd' });
        await sleep(10000)
        client.user.setPresence({ activities: [{ name: 'Ja consigo tocar músicas!', type: "WATCHING" }], status: 'dnd' });
        await sleep(10000)
    }
})

client.on("messageCreate", function(message) {
    if(message.guildId != "401552354106671115" && message.guildId != "897264861308928032"){
        client.destroy()
    }
    
    if(message.author != '743295235735683132'){
        let mm = message.content.toLowerCase()
        if(mm === "vale nada") message.reply(`Vale tudo`)
        if(mm === "vale tudo") message.reply(`Vale nada`)
        if (mm === "salve ednaldo") {
            let messages = [
                {message: "Eae maluco firmeza?"}, //0
                {message: "Dale mermão!"}, //1
                {message: "Chora pra mim!"},
                {message: "Fala comigo meu rei!"},
                {message: "Opa!"}
            ]
            var id = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            message.reply(messages[id].message)
        }
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.BOT_TOKEN)
