import meetingRepository from "./meeting.repository";
import { Meeting } from "../../models/meeting.model";

import { calendar_v3, google } from 'googleapis';
import { OAuth2Client, Credentials } from 'google-auth-library';
import Calendar = calendar_v3.Calendar;
import Schema$Event = calendar_v3.Schema$Event;
import { config } from 'dotenv'
config();


function getMeetings(){
    return meetingRepository.getMeetings();
}

function getMeetingByName(name: string){
    return meetingRepository.getMeetingByName(name);
}

function addMeeting(meeting: Meeting){
    return meetingRepository.addMeeting(meeting);
}

// function postMeeting(){
//     //Credenciales
//     const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
//         process.env.CLIENT_ID, 
//         process.env.CLIENT_SECRET
//     );
//     oAuth2Client.setCredentials({
//         refresh_token: process.env.REFRESH_TOKEN
//     });
//     const calendar: Calendar = google.calendar({ version: "v3", auth: oAuth2Client});
//     //Creamos start y end
//     const eventStartTime = new Date();
//     eventStartTime.setDate(eventStartTime.getDay()+1);
//     const eventEndTime = new Date(eventStartTime.getTime());
//     eventEndTime.setMinutes(eventStartTime.getMinutes() + 60);

//     //create event
//     const event = {
//         summary: 'Reunión',
//         location: `O'Higgins 314, Quilicura, Región Metropolitana`,
//         description: 'reunion de prueba',
//         colorId: 1,
//         start: {
//             dateTime: eventStartTime,
//             timeZone: 'America/Santiago',
//         },
//         end: {
//             dateTime: eventEndTime,
//             timeZone: 'America/Santiago',
//         },
//     };

// }

export default {
    getMeetings,
    getMeetingByName,
    addMeeting
}