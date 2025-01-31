import $api from "@/lib/http";
import {ILoginValues, IRegisterValues} from "@/entities/user/user.types.ts";


class UserService {

    async getByEmail(email: string) {
        const response = await $api.get(`/users/email/${email}`);
        return response.data
    }

    async login(values: ILoginValues) {
        const response = await $api.post("/login", values);
        return response.data
    }

    async register(values: IRegisterValues) {
        const response = await $api.post("/register", values);
        return response.data
    }

    async refresh() {
        const response = await $api.get("/refresh", {withCredentials: true});
        return response.data
    }

    async logout() {
        const response = await $api.post("/logout");
        return response.data
    }
}


export const userService = new UserService()
