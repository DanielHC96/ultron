import model from './job.schema'
import { Job } from '../../models/job.model';

function getJobs(){
    return model.find().populate('sessions');
}

function getJobByName(name: string){
    return model.findOne({name: name}).populate('sessions');
}

function getJobBySelector(selector: string){
    return model.findOne({selector: selector}).populate('sessions');
}

function getJobById(id: string){
    return model.findOne({_id: id}).populate('sessions');
}

function addJob(job: Job){
    return model.create(job);
}

async function updateJobSession(id: string, newSession: string) {
    let job: Job | null = await getJobById(id);
    let sessions: string[] = [];

    if(job){
        sessions = job.sessions
        sessions.push(newSession)
    }
    return model.findOneAndUpdate({_id: id}, { sessions });
}

export default{
    getJobs,
    getJobByName,
    getJobBySelector,
    getJobById,
    addJob,
    updateJobSession
}