import projectRepository from "./project.repository";
import { Project } from "../../models/project.model"
import { Message } from "discord.js";
import { Member } from "../../models/member.model"
import memberController from "../member/member.controller";

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
    if(content.startsWith('in') || content === 'out'){
        if(message.content.startsWith('in')){
            let msg: string[] = content.split(' ');
            if (msg.length === 2 && msg[0] === 'in') return 'in';
            else{
                message.delete();
                return 'invalid';
            }
        }
        if(message.content === 'out') return 'out';
    }
    else{
        message.delete();
        return 'invalid';
    }
}

async function addProjectSession(message: Message){
    let msg = await inOut(message);

    if(msg === 'out'){
        
        const channelMessages = await message.channel.messages.fetch();
        
        for(let m of channelMessages.array()){

            if(m.author.id === message.author.id && m.id != message.id){
                if(m.content === 'out'){
                    message.reply('no encontre tu entrada 🤷‍♀️ ⚠️');
                    message.delete();
                    return;
                }
                if(m.content.startsWith('in')){
                    let workTime = message.createdAt.getTime() - m.createdAt.getTime();
                    let minutos = Math.round(workTime/60000);
                    let msg: string[] = m.content.split(' ');

                    try {
                        let member: Member | null = await memberController.getMemberByDiscordUserId(message.author.id);
                        if(member == null){
                            const newMember: any = {
                                discordUserId: message.author.id,
                                alias: message.author.username,
                            }

                            member = await memberController.addMember(newMember);
                        }

                        let project: any = {
                            projectName: msg[1],
                            member: member._id,
                            time: minutos,
                            start: m.createdAt,
                            end: message.createdAt,
                        }
                        await projectRepository.addProject(project);
                    }
                    catch(error){
                        console.log(error);
                    }

                    message.reply(`Trabajaste ${minutos} minutos en ${msg[1]}`);
                    
                    return;
                }
            }
        }
    }
    return;
}

export default {
    getProjects,
    addProject,
    getProjectName,
    addProjectSession
}