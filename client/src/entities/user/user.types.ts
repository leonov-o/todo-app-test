export interface ILoginValues {
    email: string
    password: string
}

export interface IRegisterValues extends ILoginValues {
    name: string
}

export interface IUser {
    _id: string,
    name: string,
    email: string
}
