import model from './meeting.schema';
import { Meeting } from '../../models/meeting.model';

function getMeetings(){
    return model.find();
}

function getMeetingByName(name: string){
    return model.findOne({name: name});
}

function addMeeting(meeting: Meeting){
    return model.create(meeting);
}

export default {
    getMeetings,
    getMeetingByName,
    addMeeting
}