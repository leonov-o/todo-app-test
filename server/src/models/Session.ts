import mongoose from "mongoose";


interface ISession {
    userId: string,
    refreshToken: string,
    expiresIn: number
}


const sessionScheme = new mongoose.Schema({
    userId: String,
    refreshToken: String,
    expiresIn: Number
}, {timestamps: true});


export const Session = mongoose.model<ISession>("Session", sessionScheme);
