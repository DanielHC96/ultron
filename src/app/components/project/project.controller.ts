import projectRepository from "./project.repository";
import { Project } from "../../models/project.model"

function getProjects(){
    return projectRepository.getProjects();
}

function addProject(project: Project){
    return projectRepository.addProject(project);
}
function getProjectName(projectName: string){
    return projectRepository.getProjectName(projectName);
}

export default {
    getProjects,
    addProject,
    getProjectName
}