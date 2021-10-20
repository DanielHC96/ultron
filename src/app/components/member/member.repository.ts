import { Member } from "../../models/member.models";
import model from './member.schema'

function getMembers(){
    return model.find();
}

function addMember(member: Member){
    return model.create(member);
}

async function addBirth(id: string, birth: Date){
    const member: Member | null = await model.findOneAndUpdate({_id: id},{birth: birth}, {new: true});    
    return member;
}

export default {
    getMembers,
    addMember,
    addBirth
}