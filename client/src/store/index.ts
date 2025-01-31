import {create} from "zustand/react";
import {immer} from "zustand/middleware/immer";
import {ILoginValues, IRegisterValues, IUser} from "@/entities/user/user.types.ts";
import {ITodoList, ITodoListUpdate} from "@/entities/todoList/todoList.types.ts";
import {userService} from "@/entities/user/user.service.ts";
import {todoListService} from "@/entities/todoList/todoList.service.ts";

interface IUserState {
    isAuth: boolean,
    isLoading: boolean,
    error: string,
    user: IUser,
    todoLists: ITodoList[] | [],
    fetchLogin: (values: ILoginValues) => void
    fetchRegister: (values: IRegisterValues) => void
    fetchRefresh: () => void
    fetchLogout: () => void
    fetchMyTodo: () => void
    fetchTodoCreate: (name: string) => void
    fetchTodoUpdate: (id: string, data: ITodoListUpdate) => void
    fetchTodoDelete: (id: string) => void
}

export const useUserStore = create<IUserState>()(immer((setState) => {
    return ({
        isAuth: false,
        isLoading: true,
        error: "",
        user: {
            _id: "",
            name: "",
            email: ""
        },
        todoLists: [],

        fetchLogin: async (values: ILoginValues) => {
            try {
                const response = await userService.login(values);
                const {accessToken, user} = response.data;
                localStorage.setItem('token', accessToken);
                setState((state) => {
                    state.user = user;
                    state.isAuth = true;
                    state.isLoading = false;
                    state.error = "";
                })
            } catch (e: any) {
                setState((state) => {
                    state.isAuth = false;
                    state.isLoading = false;
                    state.error = e.response.data.message || e.message;
                })
            }
        },
        fetchRegister: async (values: IRegisterValues) => {
            try {
                const response = await userService.register(values);
                const {accessToken, user} = response.data;
                localStorage.setItem('token', accessToken);
                setState((state) => {
                    state.user = user;
                    state.isAuth = true;
                    state.isLoading = false;
                    state.error = "";
                })
            } catch (e: any) {
                setState((state) => {
                    state.isAuth = false;
                    state.isLoading = false;
                    state.error = e.response.data.message || e.message;
                })
            }
        },

        fetchRefresh: async () => {
            try {
                const response = await userService.refresh();
                const {accessToken, user} = response.data;
                localStorage.setItem('token', accessToken);
                setState((state) => {
                    state.user = user;
                    state.isAuth = true;
                    state.error = "";
                })
            } catch (e: any) {
                setState((state) => {
                    state.isAuth = false;
                    state.error = e.response.data.message || e.message;
                })
            }
        },


        fetchLogout: async () => {
            await userService.logout();
            localStorage.removeItem('token');
            setState((state) => {
                state.user = {
                    _id: "",
                    name: "",
                    email: ""
                };
                state.isAuth = false;
            })
        },
        fetchMyTodo: async () => {
            const response = await todoListService.getMyTodoLists();
            setState((state) => {
                state.todoLists = response.data;
            })
        },

        fetchTodoCreate: async (name: string) => {
            const response = await todoListService.create(name);
            setState((state) => {
                state.todoLists = [...state.todoLists, response.data];
            })
        },

        fetchTodoUpdate: async (id: string, data: ITodoList) => {
            await todoListService.update(id, data);
        },

        fetchTodoDelete: async (id: string) => {
            await todoListService.delete(id);
        }


    });
}));
