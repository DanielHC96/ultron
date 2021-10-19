import { Member } from "../../models/member.models";

const list: Member[] = [];

function getMembers(){
    return list;
}

function addMember(member: Member){
    list.push(member);
    return member;
}

export default {
    getMembers,
    addMember
}