import { Iprodcut } from "./iprodcut";
import { Iuser } from "./iuser";

export interface Iorder {
    _id:string;
    user: Iuser,
    date:  Date ,
    status:  String,
    amount: Number, 
    action:  String ,
    room:  Number, 
    ext:  Number,
    Prodeuct :[Iprodcut] ,
}
