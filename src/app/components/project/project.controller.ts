import projectRepository from "./project.repository";
import { Project } from "../../models/project.model"
import { Message } from "discord.js";
import { OutgoingMessage } from "http";

function getProjects(){
    return projectRepository.getProjects();
}

function addProject(project: Project){
    return projectRepository.addProject(project);
}
function getProjectName(projectName: string){
    return projectRepository.getProjectName(projectName);
}
//funcion que valida mensaje
function inOut(message: Message){
    let content = message.content;
//in out
    if(content.startsWith('in') || content === 'out'){
    //in
        if(message.content.startsWith('in')){
            let msg: string[] = content.split(' ');
        //largo msg
            if (msg.length === 2){
                //console.log(`msg (${content}) length ${msg.length}`)
                return 'in';
            }
            else{
                //console.log(`msg ${content} length ${msg.length}`)
                message.delete();
                return 'invalid';
            }
        }
    //out
        if(message.content === 'out'){
            //console.log(`msg (${content})`)
            return 'out';
        }
    }
    else{
        //console.log(`msg (${content})`);
        message.delete();
        return 'invalid';
    }
}

async function addProjectSession(message: Message){
    let content = message.content;
    let i: number = 1;
    if(inOut(message) === 'in'){
        const channelMessages = await message.channel.messages.fetch();
        for(let m of channelMessages.array()){
            console.log(`msg[${i}] = ${m}`);
            i=i+1;
        }
        /*
        for(let m of channelMessages.array()) {
            if(m.id != message.id){
                if(m.content === 'out'){
                    message.reply('no encontre tu entrada');
                    message.delete();
                    return;
                }
                if(m.content.startsWith('in')){

                }
            }
        }*/

    }

    return;
}

export default {
    getProjects,
    addProject,
    getProjectName,
    addProjectSession
}