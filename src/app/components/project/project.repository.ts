import { Project } from '../../models/project.model'
import model from './project.schema';

function getProjects(){
    return model.find();
}

export default {
    getProjects
}