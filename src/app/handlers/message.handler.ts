import { Channel, TextChannel } from 'discord.js';
import memberControler from '../components/member/member.controller'

async function birthday(channel: TextChannel){
    return memberControler.handlerBirthday(channel);
}

export default {
    birthday
}