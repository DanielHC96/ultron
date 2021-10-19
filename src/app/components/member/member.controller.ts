import { Member } from '../../models/member.models';
import memberRepository from './member.repository';

function getMembers(){
    return memberRepository.getMembers();
}

function addMember(member: Member){
    return memberRepository.addMember(member);
}

export default {
    getMembers,
    addMember
};