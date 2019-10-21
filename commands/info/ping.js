module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`Pinging...`);
        msg.edit(`Latency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency: ${Math.round(bot.ping)}ms`);
    }
}