import mongoose from "mongoose";

export interface ITodo {
    name: string,
    description: string,
    done: boolean
}

interface ITeam {
    userId: string,
    role: 'owner' | 'admin' | 'viewer'
}

export interface ITodoList {
    name: string,
    todos: ITodo[],
    team: ITeam[]
}

const todoListScheme = new mongoose.Schema({
    name: String,
    todos: [{
        name: String,
        description: String,
        done: Boolean
    }],
    team: [{
        userId: String,
        role: String
    }]
}, {timestamps: true});

export const TodoList = mongoose.model<ITodoList>("TodoList", todoListScheme);
