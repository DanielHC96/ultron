import { Member } from "../../models/member.model";
import model from './member.schema'

function getMembers(){
    return model.find();
}

function addMember(member: Member){
    return model.create(member);
}

async function addBirth(id: string, birthday: Date){
    const member: Member | null = await model.findOneAndUpdate({_id: id},{birthday: birthday}, {new: true});    
    return member;
}

//funcion para hacer consulta por metodo http
async function getBirthday(month: number, day: number){
    let today = new Date(2021, month-1, day);
    const docs: any[] = await model.find({
        $expr:{
            $and: [
                { $eq: [{ $month: '$birthday' }, { $month: today}] },
                { $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: today}] }
            ]
        }
    });
    return docs;
}

//funcion que se llama con evento ready
async function handlerBirthday(today: Date){
    const docs: any[] = await model.find({
        $expr:{
            $and: [
                { $eq: [{ $month: '$birthday' }, { $month: today}] },
                { $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: today}] }
            ]
        }
    });
    return docs;
}

export default {
    getMembers,
    addMember,
    addBirth,
    getBirthday,
    handlerBirthday
}