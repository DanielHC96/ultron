import { config } from 'dotenv'
config();
import { Client, Message } from 'discord.js';
import express, { Express } from "express";
import components from './components';
import mongooseModule from './modules/mongoose.module';
import messageHandler from './handlers/message.handler';

async function main (){
    //constantes
    const app: Express = express();
    const bot: Client = new Client();
    const port: number = parseInt(process.env.PORT || "3000");

    //bot ds
    bot.on("message", (message)=>{
        if(message.content.startsWith("start")){
            messageHandler.birthday(message);
        }
    });


    //app use
    app.use(express.json());
    app.use('/api', ...components);

    //login
    try {
        await bot.login(process.env.DISCORD_TOKEN);
        console.log("bot ✅")
    }
    catch (error){
        console.log('[discord logind]', error);
    }

    app.listen(port, () => {
        console.log(`App escuchando en http://localhost:${port} ✅`);
    });

    try {
        await mongooseModule.connect();
        console.log('Database connection successful ✅');
      } 
    catch (error) {
        console.error(error);
        console.log(`Failed database connection ❌`);
    }
};

export default { main };
