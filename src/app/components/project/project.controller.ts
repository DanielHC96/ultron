import projectRepository from "./project.repository";

function getProjects(){
    return projectRepository.getProjects();
}

export default {
    getProjects
}