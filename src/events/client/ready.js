const Event = require("../../structures/Event")

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }

    run = () => {
        console.log(`\nBot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidor.`)
        this.client.registryCommands()
        this.client.manager.init(this.client.user.id)
    }
}