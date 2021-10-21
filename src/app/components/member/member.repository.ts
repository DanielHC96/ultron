import { Member } from "../../models/member.models";
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

async function getBirthday(month: number, day: number){
    let today = new Date(2021, month-1, day);
    //console.log(`La fecha consultada es ${today}`);
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

async function handlerBirthday(today: Date){
    console.log(`La fecha consultada es ${today}`);
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