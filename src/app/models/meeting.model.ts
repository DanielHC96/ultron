export interface Meeting {
    _id?: string,
    name: string,
    dateStart: Date,
    dateEnd: Date
    duracion: number,
    members: string[],
    event?: any
};