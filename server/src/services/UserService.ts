import {IUser, User} from "../models/User";
import {comparePasswords, generateAccessToken, generateRefreshToken, hashPassword, verifyToken} from "../utils/jwt";
import {Session} from "../models/Session";
import {ApiError} from "../exceptions/ApiError";
import {UserDto} from "../dtos/UserDto";

class UserService {
    async login({email, password}: { email: string, password: string }) {
        if (!email || !password) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту та пароль");
        }

        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (!comparePasswords(password, user.password)) {
            throw ApiError.BadRequest("Невірний пароль");
        }

        return this.createSession(user);
    }

    async register({email, password, name}: IUser) {
        if (!email || !password || !name) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту, пароль, ім'я та прізвище");
        }

        const existingUser = await User.findOne({email: email.toLowerCase()})
        if (existingUser) {
            throw ApiError.BadRequest("Користувач вже існує");
        }

        const newUser = await this.createUser({email, password, name});
        return this.createSession(newUser);
    }


    async logout(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        return Session.deleteOne({refreshToken: refreshToken});
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = verifyToken(refreshToken) as IUser;
        const tokenFromDb = await Session.findOne({refreshToken: refreshToken});
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData._id);

        if (!user) {
            throw ApiError.NotFound();
        }
        const userDto = new UserDto(user);
        const tokens = {
            accessToken: generateAccessToken({...userDto}),
            refreshToken: generateRefreshToken({...userDto})
        }

        tokenFromDb.refreshToken = tokens.refreshToken;
        tokenFromDb.expiresIn = Number(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));
        await tokenFromDb.save();

        return {
            ...tokens,
            user: userDto
        };
    }


    async createSession(user: IUser) {
        const userDto = new UserDto(user);
        const tokens = {
            accessToken: generateAccessToken({...userDto}),
            refreshToken: generateRefreshToken({...userDto})
        }

        const existingSessions = await Session.find({userId: user._id});
        if (existingSessions.length >= 5) {
            await Session.deleteMany({userId: user._id});
        }

        await Session.create({
            userId: user._id,
            refreshToken: tokens.refreshToken,
            expiresIn: Number(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30))
        });
        return {
            ...tokens,
            user: userDto
        };
    }


    async createUser(user : Omit<IUser, '_id'>) {
        const {email, password, name} = user;

        return User.create({
            email: email.toLowerCase(),
            password: hashPassword(password),
            name
        });
    }

    async getAllUsers() {
        const users = await User.find({});
        return users.map(user => new UserDto(user));
    }

    async getUserById(id: string) {
        const user = await User.findOne({_id: id});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        return new UserDto(user);
    }

    async getUserByEmail(email: string) {
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        return new UserDto(user);
    }

    async deleteUser(id: string, targetId: string) {
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }
        return User.findOneAndDelete({_id: targetId});
    }
}

export const userService = new UserService();
