import { Member } from '../../models/member.models';
import memberRepository from './member.repository';
import { Message } from 'discord.js';
import { resolveObjectURL } from 'buffer';


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

async function handlerBirthday(message: Message){
    let today = new Date();
    const result: any[] = await memberRepository.handlerBirthday(today);
    if (result.length == 0){
        console.log('Nadie esta de cumple');
        //message.channel.send('Nadie esta de cumple');
    }
    else{
        for (let i in result){
            let firstName: string = result[i].firstName;
            let lastName: string = result[i].lastName;
            //console.log(`El usuario ${user} esta de cumpleaños`);
            message.channel.send(`El usuario ${firstName} ${lastName} esta de cumpleaños`)
        }
    }
    //traer todos los member que estan de cumple
    //saludar segun cumpleaños
    //englobar todo en una funcion que se ejecute todos los dias (aparte)
}

export default {
    getMembers,
    addMember,
    addBirthday,
    getBirthday,
    handlerBirthday
};