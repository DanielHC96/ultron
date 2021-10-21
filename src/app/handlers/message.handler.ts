import { Message } from 'discord.js';
import memberControler from '../components/member/member.controller'

async function birthday(message: Message){
    return memberControler.handlerBirthday(message);
}

export default {
    birthday
}