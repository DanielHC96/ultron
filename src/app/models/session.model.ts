export interface Session {
    _id: string;
    member: string;
    team: string;
    time: number;
    start: Date;
    end: Date;
    updatedAt?: Date;
    createdAt?: Date;
  };
  