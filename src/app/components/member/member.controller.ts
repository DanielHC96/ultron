import { Member } from '../../models/member.models';
import memberRepository from './member.repository';


function getMembers(){
    return memberRepository.getMembers();
}

function addMember(member: Member){
    return memberRepository.addMember(member);
}

function addBirth(id: string, birth: Date){
    return memberRepository.addBirth(id, birth);
}
export default {
    getMembers,
    addMember,
    addBirth
};