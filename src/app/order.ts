export interface Order {
    _id:string;
    user?: number;
    date:Date;
    status:string;
    amount:number;
    action:string
    room:number
    ext:number;
    createdAt: Date;
    updatedAt: Date;


}