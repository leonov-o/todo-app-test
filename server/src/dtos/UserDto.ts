import {IUser} from "../models/User";

export interface IUserDto {
    _id: string;
    email: string;
    name: string;
}

export class UserDto {
    _id;
    email;
    name;

    constructor(model: IUser){
        this._id = model._id;
        this.email = model.email;
        this.name = model.name;
    }
}
