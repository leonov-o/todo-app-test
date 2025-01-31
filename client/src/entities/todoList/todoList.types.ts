export interface ITodo {
    name: string,
    description: string,
    done: boolean
}

export interface ITeam {
    userId: string,
    role: 'owner' | 'admin' | 'viewer'
}

export interface ITodoList {
    _id: string
    name: string,
    todos: ITodo[],
    team: ITeam[]
}

export interface ITodoListUpdate {
    name: string,
    todos: ITodo[]
}
