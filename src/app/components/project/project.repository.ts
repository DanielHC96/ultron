import model from './project.schema';
import { Project } from '../../models/project.model'

function getProjects(){
    return model.find();
}

function addProject(project: Project){
    return model.create(project);
}

async function getProjectName(projectName: string){
    const projects: any[] = await model.find({projectName: projectName});
    return projects;
}

export default {
    getProjects,
    addProject,
    getProjectName
}