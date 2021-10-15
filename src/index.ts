import { config } from 'dotenv'
config();

import { prefix } from './config.json';
import { Client, Message } from 'discord.js';
const bot: Client = new Client();

bot.on("ready", () => {
    console.log("Estoy listo!");
 });

bot.on("message", (message: Message) => {
    
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("pong!");
    }
    
});

bot.login(process.env.DISCORD_TOKEN);