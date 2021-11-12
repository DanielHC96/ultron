import { Team } from "../../models/team.model";
import model from "./team.schema";

function getTeams(){
  return model.find().populate('members');
};

function getTeam(id: string){
  return model.findOne({ _id: id });
};

function getTeamByDiscordGuildId(discordGuildId: string){
  return model.findOne({ discordGuildId: discordGuildId });
};

function addTeam(team: Team){
  return model.create(team);
};

function buscar(word: any, words: string[]){
  let palabra: string = word._id;
  for(let i of words){
    if(palabra === i.toString()){
      return true;
    }
  }
  return false;
}

async function updateTeamMembers(id: string, newMembers: string[]){
  const team: Team | null = await model.findOne({ _id: id });
  let members: string[] = []; 
  let currentMembers = team?.members;

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

export default { 
  getTeams, 
  getTeam, 
  getTeamByDiscordGuildId,
  addTeam, 
  updateTeamMembers 
};
