import { Team } from "../../models/team.model";
import teamRepository from "./team.repository";

function getTeams(){
  return teamRepository.getTeams();
};

function getTeam(id: string){
  return teamRepository.getTeam(id);
};

function getTeamByDiscordGuildId(discordGuildId: string){
  return teamRepository.getTeamByDiscordGuildId(discordGuildId);
};

function addTeam(team: Team){
  return teamRepository.addTeam(team);
};

function updateTeamMembers(id: string, members: string[]){
  return teamRepository.updateTeamMembers(id, members);
};

export default { 
  getTeams, 
  getTeam, 
  getTeamByDiscordGuildId,
  addTeam, 
  updateTeamMembers 
};
