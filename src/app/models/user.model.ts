
import { User_name } from "./user_name.model";

export class User {
    public id: number;
    public email: String;
    public name: User_name;

    /* {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    }/*,
    password: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    name: {
        first: {
            type: String,
            trim: true,
            required: true,
        },
        last: {
            type: String,
            trim: true,
            required: true,
        },
    },
    address: [{
        street: { type: String },
        city: { type: String },
        country: { type: String }
    }]*/

}