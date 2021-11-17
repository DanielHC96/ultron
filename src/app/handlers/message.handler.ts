import { Message, TextChannel } from 'discord.js'
import jobController from '../components/job/job.controller';
import sessionController from '../components/session/session.controller';

function _newSession(message: Message){  
    return sessionController.addSession(message);
  }

function _newJobSession(message: Message){
    return jobController.addJobSession(message);
}

export default async function messageHandler(message: Message) {
    const channel: TextChannel = message.channel as TextChannel;

    if(message.author.id === '898587523952021565'){
        return;
    }
    message.content = message.content.trim().toLocaleLowerCase();

    switch (channel.name){
        case 'registro-trabajo':
            _newSession(message);
        break;

        case 'job-session':
            _newJobSession(message);
        break;
    }
}