import { Message, TextChannel } from 'discord.js'
import projectController from "../components/project/project.controller";

function _newProjectSesion(message: Message){
    return projectController.addProjectSession(message);
}

export default async function messageHandler(message: Message) {
    const channel: TextChannel = message.channel as TextChannel;

    if(message.author.id === '898587523952021565'){
        return;
    }
    message.content = message.content.trim().toLocaleLowerCase();

    switch (channel.name){
        case 'registro-proyecto':
            _newProjectSesion(message);
        break;
    }
}