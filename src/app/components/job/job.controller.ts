import jobRepository from "./job.repository";
import { Job } from "../../models/job.model";
import { Message} from "discord.js";
import memberController from "../member/member.controller";
import { Member } from "../../models/member.model";
import teamController from "../team/team.controller";
import { Team } from "../../models/team.model";
import session from "../session";
import sessionRepository from "../session/session.repository";




function getJobs(){
    return jobRepository.getJobs();
}

function getJobByName(name: string){
    return jobRepository.getJobByName(name);
}

function getJobBySelector(selector: string){
    return jobRepository.getJobBySelector(selector);
}

function getJobById(id: string){
    return jobRepository.getJobById(id);
}

function addJob(job: Job){
    return jobRepository.addJob(job);
}

//funcion que valida mensaje
function inOutCreate(message: Message){
    let content = message.content;
    if(content.startsWith('in') || content === 'out' || content.startsWith('create')){
        //validamos in
        if(message.content.startsWith('in')){
            let msg: string[] = content.split(' ');
            if (msg.length === 2 && msg[0] === 'in') return 'in';
            else{
                message.delete();
                return 'invalid';
            }
        }
        //validamos out
        if(message.content === 'out') return 'out';
        //validamos create
        if(message.content.startsWith('create')){
            let msg: string[] = content.split(' ');
            if (msg.length === 3 && msg[0] === 'create') {
                return 'create';
            }
            else{
                message.delete();
                return 'invalid';
            }
        }
    }
    else{
        message.delete();
        return 'invalid';
    }
}

async function addJobSession(message: Message) {
    let validate = inOutCreate(message);

    if(validate === 'create'){
        let msg: string[] = message.content.split(' ');
        //consultamos si existe el job
        try{
            let jobName: any = await jobRepository.getJobByName(msg[1]);
            let jobSelector: any = await jobRepository.getJobBySelector(msg[2]);
            if(jobName == null && jobSelector == null){
                const newJob: any = {
                    name: msg[1],
                    selector: msg[2]
                }
                jobName = await jobRepository.addJob(newJob);
                message.reply(`Proyecto ${msg[1]} creado con exito`);
                return;
            }
            if(jobName || jobSelector){
                message.reply(`Ya existen proyectos con estas entradas`);
                if(jobName) message.reply(`ProjectByName: [name] ${jobName.name} [selector] ${jobName.selector}`);
                if(jobSelector) message.reply(`ProjectBySelector: [name] ${jobSelector.name} [selector] ${jobSelector.selector}`);
                return;
            }
        }
        catch(error){
            console.log(error);
        }
        return;
    }

    if(validate === 'in'){
        let msg: string[] = message.content.split(' ');
        try {
            let jobSelector: any = await jobRepository.getJobBySelector(msg[1]);
            if(!jobSelector){
                message.reply(`No existe proyecto para ${msg[1]}, ingrese entrada con proyecto valido`);
                message.delete();
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(validate === 'out'){

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
                        //member
                        let member: Member | null = await memberController.getMemberByDiscordUserId(message.author.id);
                        if(member == null){
                            const newMember: any = {
                                discordUserId: message.author.id,
                                alias: message.author.username,
                            }

                            member = await memberController.addMember(newMember);
                        }
                        //team
                        let team: Team | null = message.guild ? await teamController.getTeamByDiscordGuildId(message.guild.id) : null;
                        if(team == null && message.guild){
                            const newTeam: any = {
                                discordGuildId: message.guild.id,
                                name: message.guild.name,
                                members: [
                                    member._id
                                  ]
                            }
                            team = await teamController.addTeam(newTeam);
                        }
                        if(team){
                            await teamController.updateTeamMembers(team._id, [
                                member._id
                            ]);
                        }
                        //session
                        let session: any = {
                            member: member?._id,
                            team: team?._id,
                            time: minutos,
                            start: m.createdAt,
                            end: message.createdAt,
                            updatedAt: message.createdAt,
                            createdAt: message.createdAt
                        }
                        session = await sessionRepository.addSession(session);
                        //job
                        let job: any = await jobRepository.getJobBySelector(msg[1]);
                        await jobRepository.updateJobSession(job._id, session._id);

                    }
                    catch(error){
                        console.log(error);
                    }

                    message.reply(`trabajaste: ${minutos} minutos 😞`);
                    return;
                }

            }
        }

    }

    return;
}

export default {
    getJobs,
    getJobByName,
    getJobBySelector,
    getJobById,
    addJob,
    addJobSession
}