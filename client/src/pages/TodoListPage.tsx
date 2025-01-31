import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {PlusIcon, TrashIcon} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useNavigate, useParams} from "react-router";
import {todoListService} from "@/entities/todoList/todoList.service.ts";
import {useUserStore} from "@/store";
import {ShareDialog} from "@/components/ShareDialog.tsx";
import {ITeam} from "@/entities/todoList/todoList.types.ts";

interface Todo {
    name: string;
    description: string;
    done: boolean;
}

export const TodoListPage: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {user, fetchTodoUpdate, fetchTodoDelete} = useUserStore();
    const [name, setName] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [team, setTeam] = useState<ITeam[]>([]);

    const isAdmin = team.some((item) => item.userId === user._id && item.role === "admin");
    const isOwner = team.some((item) => item.userId === user._id && item.role === "owner");

    const handleChangeTodo = (id: number, field: keyof Todo, value: string | boolean) => {
        setTodos(prev => prev.map((item, index) => index === id ? {...item, [field]: value} : item));
    };

    const handleAddTodo = () => {
        setTodos(prev => [...prev, {name: "", description: "", done: false}]);
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(prev => prev.filter((_, index) => index !== id));
    };

    const handleSave = () => {
        if (!id) return;
        fetchTodoUpdate(id, {name, todos});
        navigate("/");
    }

    const handleDelete = () => {
        if (!id) return;
        fetchTodoDelete(id);
        navigate("/");
    }

    const fetchTodo = async () => {
        if (!id) return;
        const response = await todoListService.getById(id);
        setName(response.data.name);
        setTodos(response.data.todos);
        setTeam(response.data.team);
    }

    useEffect(() => {
        fetchTodo()
    }, [id]);


    return (
        <div className="flex justify-center p-12">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between items-center gap-6">
                            <Input value={name} disabled={!isOwner && !isAdmin} onInput={(e) => setName(e.currentTarget.value)}/>
                            <ShareDialog disabled={!isOwner} id={id}/>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="">
                        {
                            todos && todos.map((todo, index) => (
                                <div key={index} className="border-b p-2 my-1.5">
                                    <div className="flex items-center gap-4">
                                        <Checkbox checked={todo.done}
                                                  onCheckedChange={(value) => handleChangeTodo(index, "done", value)}/>
                                        <div className="w-full space-y-3">
                                            <Input placeholder="Name"
                                                   disabled={!isOwner && !isAdmin}
                                                   value={todo.name}
                                                   onInput={(e) => handleChangeTodo(index, "name", e.currentTarget.value)}/>
                                            <Textarea placeholder="Description"
                                                      disabled={!isOwner && !isAdmin}
                                                      value={todo.description}
                                                      onInput={(e) => handleChangeTodo(index, "description", e.currentTarget.value)}
                                            />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            disabled={!isOwner && !isAdmin}
                                            onClick={() => handleDeleteTodo(index)}
                                        >
                                            <TrashIcon/>
                                        </Button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    <div className="flex justify-center mt-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={!isOwner && !isAdmin}
                            onClick={handleAddTodo}
                        >
                            <PlusIcon/>
                        </Button>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between gap-3">
                    <Button variant="destructive" disabled={!isOwner} onClick={handleDelete}>Delete</Button>
                    <Button variant="outline" onClick={handleSave}>Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
