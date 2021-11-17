import { Message } from "discord.js";
import sessionRepository from "./session.repository";
import memberController from "../member/member.controller";
import { Member } from "../../models/member.model";
import teamController from "../team/team.controller";
import { Team } from "../../models/team.model"

function getSessions(){
    return sessionRepository.getSessions();
};

function getMonthHoursMemberSessions(team: string, monthYear: string){
    const month = Number(monthYear.substring(0, 2));
    const year = Number(monthYear.substring(3, 7));
    return sessionRepository.getMonthHoursMemberSessions(team, month, year);
};

function getSessionsTeamMember(team: string, member: string, monthYear: string){
    const month = Number(monthYear.substring(0, 2));
    const year = Number(monthYear.substring(3, 7));
    return sessionRepository.getSessionsTeamMember(team, member, month, year);
};

function getTeamMemberSessions(member: string | undefined, team: string | undefined){
    return sessionRepository.getTeamMemberSessions(member, team);
}


async function addSession(message: Message){
  
    let content = message.content
      .trim()
      .toLowerCase();
  
    if(content === 'out' || content === 'salida'){
  
      const channelMessages = await message.channel.messages.fetch();
  
      let outs: number = 0;
  
      for(let m of channelMessages.array()) {
      
        m.content = m.content
          .trim()
          .toLowerCase();
  
        if(m.author.id === message.author.id){
          if(m.id != message.id){
            if(content === 'out' || content === 'salida'){
              outs++;
            }
            
            if(outs > 1){
              message.reply('no encontre tu entrada 🤷‍♀️ ⚠️');
              message.delete();
              return;
            }
            
            if(m.content === 'in' || m.content === 'entrada'){
              let workTime = message.createdAt.getTime() - m.createdAt.getTime();
              let minutos = Math.round(workTime/60000);
  
              try {
                let member: Member | null = await memberController.getMemberByDiscordUserId(message.author.id)
  
                if(member == null){
                  const newMember: any = {
                    discordUserId: message.author.id,
                    alias: message.author.username,
                  }
  
                  member = await memberController.addMember(newMember)
                }
  
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
                
                const job: any = {
                  member: member?._id,
                  team: team?._id,
                  time: minutos,
                  start: m.createdAt,
                  end: message.createdAt,
                  updatedAt: message.createdAt,
                  createdAt: message.createdAt
                }
  
                await sessionRepository.addSession(job);
                
                if(team){
                  await teamController.updateTeamMembers(team._id, [
                    member._id
                  ]);
                }
              } 
              catch (error) {
                console.log(error);
              }

              message.reply(`trabajaste: ${minutos} minutos 😞`);
              return;
            }
          }
        }
      }
    }
  }

export default {
    getSessions,
    getMonthHoursMemberSessions,
    getSessionsTeamMember,
    getTeamMemberSessions,
    addSession
};