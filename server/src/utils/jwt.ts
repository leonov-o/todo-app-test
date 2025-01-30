import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {IUserDto} from "../dtos/UserDto";

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
}
export const generateAccessToken = (payload: IUserDto) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: '30m',
        }
    );
};

export const generateRefreshToken = (payload: IUserDto) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: '7d',
        }
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}
