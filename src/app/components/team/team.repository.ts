import { Team } from "../../models/team.model";
import model from "./team.schema";

function getTeams(){
  return model.find().populate('members');
};

function getTeam(id: string){
  return model.findOne({ _id: id }).populate('members');
};

function getTeamByDiscordGuildId(discordGuildId: string){
  return model.findOne({ discordGuildId: discordGuildId }).populate('members');
};

function addTeam(team: Team){
  return model.create(team);
};

function buscar(idMember: any, idMembers: string[]){
  let id: string = idMember._id;
  for(let i of idMembers){
    if(id === i.toString()){
      return true;
    }
  }
  return false;
}

async function updateTeamMembersOtro(id: string, newMembers: string[]){
  const team: Team | null = await model.findOne({ _id: id });
  let members: string[] = []; 
  let currentMembers = team?.members;  //miembros actuales

  if(currentMembers){
    members = currentMembers;

    for (const member of newMembers) {
      if(!buscar(member, members)){
        members.push(member);
      }
    }
  }
  else {
    members = newMembers;
  }
  
  return model.findOneAndUpdate({ _id: id }, { members })
    .populate('members')
};

async function updateTeamMembers(id: string, newMembers: string[]){
  const team: Team | null = await model.findOne({ _id: id });
  let members: string[] = []; 
  let currentMembers = team?.members;

  if(currentMembers){
    members = currentMembers;

    for (const member of newMembers) {
      if( ! members.includes(member)){
        members.push(member);
      }
    }
  }
  else {
    members = newMembers;
  }
  
  return model.findOneAndUpdate({ _id: id }, { members })
    .populate('members')
}

export default { 
  getTeams, 
  getTeam, 
  getTeamByDiscordGuildId,
  addTeam, 
  updateTeamMembersOtro,
  updateTeamMembers
};
