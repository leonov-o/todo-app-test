import {NextFunction, Request, Response} from "express";
import {userService} from "../services/UserService";


class UserController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.login(req.body);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            next(e);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const data = await userService.register(req.body);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            next(e);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.cookies)
            const {refreshToken} = req.cookies;
            const data = await userService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            next(e);
        }
    }

    // async createUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const user = await userService.createUser(req.body);
    //         res.status(200).json({
    //             success: true,
    //             data: user
    //         });
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserByEmail(req.params.email);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }


    // async deleteUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const user = await userService.deleteUser(req.user.id, req.params.id);
    //         res.status(200).json({
    //             success: true
    //         });
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const userController = new UserController();
