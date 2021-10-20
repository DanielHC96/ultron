export interface Member {
    _id: string;
    discordUserId: string;
    alias: string;
    firstName?: string;
    lastName?: string;
    updatedAt?: Date;
    createdAt?: Date;
    birth?: Date;
};