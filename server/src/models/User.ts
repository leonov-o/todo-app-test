import mongoose from "mongoose";


export interface IUser {
    _id: string,
    email: string,
    name: string,
    password: string
}

const userScheme = new mongoose.Schema({
    email: String,
    name: String,
    password: String
}, {timestamps: true});

export const User = mongoose.model<IUser>("User", userScheme);
