import {ITodoList, TodoList} from "../models/TodoList";
import {ApiError} from "../exceptions/ApiError";

class TodoService {

    async getAll() {
        return TodoList.find({});
    }

    async getById(id: string) {
        if(!id) {
            throw ApiError.ForbiddenError();
        }

        return TodoList.findOne({_id: id});
    }

    async getByUserId(id: string) {
        return TodoList.find({
            'team.userId': id
        });
    }

    async create(userId: string, name: string) {
        return TodoList.create({name, todos: [], team: [{userId: userId, role: 'owner'}]});
    }

    async update(userId: string, id: string, data: ITodoList) {
        const target = await TodoList.findOne({_id: id});
        if (!target) {
            throw ApiError.NotFound();
        }

        const canEdit = target.team.find((item) => item.userId === userId && item.role === 'owner' || item.role === 'admin');
        if (!canEdit) {
            throw ApiError.ForbiddenError();
        }

        return TodoList.findOneAndUpdate({_id: id}, data, {new: true});
    }

    async delete(userId: string, id: string) {
        const target = await TodoList.findOne({_id: id});
        if (!target) {
            throw ApiError.NotFound();
        }

        const isOwner = target.team.find((item) => item.userId === userId && item.role === 'owner');
        if (!isOwner) {
            throw ApiError.ForbiddenError();
        }

        return TodoList.findOneAndDelete({_id: id});
    }
}

export const todoService = new TodoService();
