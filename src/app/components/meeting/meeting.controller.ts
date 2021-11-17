import meetingRepository from "./meeting.repository";
import { Meeting } from "../../models/meeting.model";

function getMeetings(){
    return meetingRepository.getMeetings();
}

function getMeetingByName(name: string){
    return meetingRepository.getMeetingByName(name);
}

function addMeeting(meeting: Meeting){
    return meetingRepository.addMeeting(meeting);
}

export default {
    getMeetings,
    getMeetingByName,
    addMeeting
}