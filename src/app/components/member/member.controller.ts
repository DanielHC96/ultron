import { Member } from '../../models/member.models';
import memberRepository from './member.repository';
import { Message } from 'discord.js';
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

function getBirthday(month: number, day: number){
    return memberRepository.getBirthday(month, day);
}

async function Birthday(message: Message){
    let today = new Date();
    const result: any[] = await memberRepository.handlerBirthday(today);
    if (result.length == 0){
        //console.log('Nadie esta de cumple');
        message.channel.send('Nadie esta de cumple');
    }
    else{
        for (let i in result){
            let firstName: string = result[i].firstName;
            let lastName: string = result[i].lastName;
            //console.log(`El usuario ${user} esta de cumpleaños`);
            message.channel.send(`El usuario ${firstName} ${lastName} esta de cumpleaños`)
        }
    }
}

let start:number = 0;

async function handlerBirthday(message: Message){
    if(message.content.startsWith("start")){
        if(start === 0){
            message.channel.send(`Ok, voy a saludar a los que estan de cumple`);
            new CronJob('* * * * *', function() {
                Birthday(message);
            }, null, true);
        }
        else{
            message.channel.send(`Ya estoy ejecutando revisando los cumple`);
        }
        start++;
        console.log(`start se ha ejecutado ${start} veces`);
    }
}

export default {
    getMembers,
    addMember,
    addBirthday,
    getBirthday,
    handlerBirthday
};