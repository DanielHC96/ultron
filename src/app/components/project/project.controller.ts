import projectRepository from "./project.repository";
import { Project } from "../../models/project.model"
import { Message } from "discord.js";

function getProjects(){
    return projectRepository.getProjects();
}

function addProject(project: Project){
    return projectRepository.addProject(project);
}
function getProjectName(projectName: string){
    return projectRepository.getProjectName(projectName);
}

function addProjectSession(message: Message){
    if (message.content === 'ping'){
        message.reply('pong');
    }
}

export default {
    getProjects,
    addProject,
    getProjectName,
    addProjectSession
}