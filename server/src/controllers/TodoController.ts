import {NextFunction, Request, Response} from "express";
import {todoService} from "../services/TodoService";
import {CustomRequest} from "../middlewares/authMiddleware";


class TodoController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await todoService.getAll();
            res.status(200).json({
                success: true,
                data
            });

        } catch (e) {
            next(e);
        }
    }

    async getByUserId(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            if(!req.user) return;
            const data = await todoService.getById(req.user?._id);
            res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await todoService.getById(req.params.id);
            res.status(200).json({
                success: true,
                data
            });

        } catch (e) {
            next(e);
        }
    }


    async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            if(!req.user) return;
            const data = await todoService.create(req.user?._id, req.body.name);
            res.status(200).json({
                success: true,
                data
            });

        } catch (e) {
            next(e);
        }
    }

    async update(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            if(!req.user) return;
            const data = await todoService.update(req.user?._id, req.params.id, req.body);
            res.status(200).json({
                success: true,
                data
            });

        } catch (e) {
            next(e);
        }
    }

    async delete(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            if(!req.user) return;
            const data = await todoService.delete(req.user?._id, req.params.id);
            res.status(200).json({
                success: true,
                data
            });

        } catch (e) {
            next(e);
        }
    }
}

export const todoController = new TodoController();
