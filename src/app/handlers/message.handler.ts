import { Message, TextChannel } from 'discord.js';
import memberControler from '../components/member/member.controller'

async function birthday(channel: TextChannel){
    return memberControler.handlerBirthday(channel);
}

//aqui hacer llamada de funcion (message)
/*
async function addProyectSession(message: Message) {
    return
}*/

export default {
    birthday
    //addProyectSession
}