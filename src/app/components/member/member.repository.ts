import { Member } from "../../models/member.models";
import model from './member.schema'

function getMembers(){
    return model.find();
}

function addMember(member: Member){
    return model.create(member);
}

export default {
    getMembers,
    addMember
}