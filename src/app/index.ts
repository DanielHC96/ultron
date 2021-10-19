import { config } from 'dotenv'
config();
//import { prefix } from '../config.json';
import { Client, Message } from 'discord.js';
import express, { Express } from "express";
import components from './components';

async function main (){
    //constantes
    const app: Express = express();
    const bot: Client = new Client();
    const port: number = parseInt(process.env.PORT || "3000");

    //bot ds
    bot.on("ready", () => { console.log("bot listo") });

    //app use
    app.use(express.json());
    app.use('/api', ...components);

    //login
    try {
        await bot.login(process.env.DISCORD_TOKEN);
    }
    catch (error){
        console.log('[discord logind]', error);
    }

    app.listen(port, () => {
        console.log(`App escuchando en http://localhost:${port}`);
    });

};

export default { main };
