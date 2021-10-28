import { Member } from '../../models/member.models';
import memberRepository from './member.repository';
import { Message, Channel, TextChannel } from 'discord.js';
import { CronJob } from 'cron';


function getMembers(){
    return memberRepository.getMembers();
}

function addMember(member: Member){
    return memberRepository.addMember(member);
}

function addBirthday(id: string, birthday: Date){
    return memberRepository.addBirth(id, birthday);
}
//funcion que llama desde http
function getBirthday(month: number, day: number){
    return memberRepository.getBirthday(month, day);
}
//funcion que llama handlerBirtday
async function Birthday(channel: TextChannel){
    let today = new Date();
    const result: any[] = await memberRepository.handlerBirthday(today);
    if (result.length == 0){
        channel.send('Nadie cumple años hoy');
    }
    else{
        for (let i in result){
            let firstName: string = result[i].firstName;
            let lastName: string = result[i].lastName;
            channel.send(`Feliz cumpleaños ${firstName} ${lastName}, pasalo bonito :)`)
        }
    }
}
//funcion que activa el ciclo
async function handlerBirthday(channel: TextChannel){
    new CronJob('* * * * *', function() {
        Birthday(channel);
    }, null, true);
}

export default {
    getMembers,
    addMember,
    addBirthday,
    getBirthday,
    handlerBirthday
};