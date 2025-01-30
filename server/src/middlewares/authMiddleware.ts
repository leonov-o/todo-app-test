import {ApiError} from "../exceptions/ApiError";
import {verifyToken} from "../utils/jwt";
import {NextFunction, Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";
import {IUserDto} from "../dtos/UserDto";


export interface CustomRequest extends Request {
    user?: IUserDto;
}

export default function (req: Request, res: Response, next: NextFunction) {
    console.log("authMiddleware");
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        console.log('authorizationHeader', authorizationHeader);

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        console.log('accessToken', accessToken);

        const userData = verifyToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        console.log('userData', userData);


        (req as CustomRequest).user = userData as IUserDto;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
