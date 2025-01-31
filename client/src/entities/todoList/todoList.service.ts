import $api from "@/lib/http";
import {ITodoList} from "@/entities/todoList/todoList.types.ts";


class TodoListService {

    async getMyTodoLists(){
        const response = await $api.get('/my-todo-lists');
        return response.data;
    }

    async getById(id: string){
        const response = await $api.get(`/todo-lists/${id}`);
        return response.data;
    }

    async create(name: string) {
        const response = await $api.post('/todo-lists', {name});
        return response.data;
    }

    async update(id: string, data: ITodoList) {
        const response = await $api.put(`/todo-lists/${id}`, data);
        return response.data;
    }

    async addMember(id: string, email: string, role: 'admin' | 'viewer') {
        const response = await $api.post(`/add-member/${id}`, {email, role});
        return response.data;
    }

    async delete(id: string) {
        const response = await $api.delete(`/todo-lists/${id}`);
        return response.data;
    }

}

export const todoListService = new TodoListService()
