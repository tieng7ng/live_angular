
import { User_name } from "./user_name.model";
import { User_address } from "./user_address.model";


export class User {

    constructor(
        public _id: number,
        public email: String,
        public name: User_name,
        public address: User_address[]
    ) {

    }


    public static fromJson(json: Object): User {
        return new User(
            json['_id'],
            json['email'],
            json['name'],
            json['address']
        );
    }
 
}