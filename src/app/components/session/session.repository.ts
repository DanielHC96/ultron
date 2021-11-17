import { Types } from "mongoose";
import { Session } from "../../models/session.model";
import model from "./session.schema";

function getSessions(){
    return model.find().populate('member').populate('team', 'name');
}

function getMonthHoursMemberSessions(team: string, month: number, year: number){
    let startMonth: number = month -1;
    let startYear: number = year;
    let monthCompare: number = 0;
    let yearCompare: number = year;
    if(startMonth === 1){
        yearCompare++;
    }else{
        monthCompare = month;
    }

    return model.aggregate([
        {
            $match: {
                createAt: { $gte: new Date(startYear, startMonth), $lt: new Date(yearCompare, monthCompare) },
                team: Types.ObjectId(team)
            }
        },
        {
            $group: {
                _id: "$member",
                total:{
                    $sum: "$time"
                }
            }
        },
        {
            $project: {
                totalHoras: {
                    $divide: [ "$total", 60]
                }
            }
        },
        {
            $lookup:{
                from: 'member',
                localField: '_id',
                foreignField: '_id',
                as: 'member'
            }
        }

    ]);
}

function getSessionsTeamMember(team: string, member: string, month: number, year: number) {
    let startMonth: number = month - 1;
    let startYear: number = year;
    let monthCompare: number = 0;
    let yearCompare: number = year;
    if (startMonth === 11) {
        yearCompare++;
    } else {
        monthCompare = month;
    }
  
    return model.find({
        team,
        member,
        createdAt: { $gte: new Date(startYear, startMonth), $lt: new Date(yearCompare, monthCompare) },
    });
}

async function getTeamMemberSessions(member: string | undefined, team: string | undefined){
    let query: any = { member, team };
  
    if(member && team == undefined){
        query = { member };
    }
  
    if(team && member == undefined){
        query = { team };
    }
    
    return model.find(query)
      .populate('member')
      .populate('team', 'name');;
}

function addSession(session: Session){
    return model.create(session);
  }
  

export default{
    getSessions,
    getMonthHoursMemberSessions,
    getSessionsTeamMember,
    getTeamMemberSessions,
    addSession
}