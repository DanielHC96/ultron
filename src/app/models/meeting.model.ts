export interface Meeting {
    _id?: string,
    name: string,
    start: Date,
    end: Date
    duration: number,
    members: string[],
    event?: any
};