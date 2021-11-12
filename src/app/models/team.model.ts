export interface Team {
    _id: string;
    discordGuildId: string;
    name: string;
    members: string[];
    updatedAt?: Date;
    createdAt?: Date;
};
  