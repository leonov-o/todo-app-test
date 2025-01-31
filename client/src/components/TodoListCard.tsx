import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PencilIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {ITodo} from "@/entities/todoList/todoList.types.ts";
import {Link} from "react-router";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import React from "react";

interface Props {
    _id: string,
    name: string,
    todos: ITodo[]
}
export const TodoListCard: React.FC<Props> = ({_id, name, todos}) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <div className="">{name}</div>
                    <div className="ml-4">
                        <Link to={`todo-list/${_id}`}>
                            <Button variant="outline" size="icon"><PencilIcon/></Button>
                        </Link>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    todos && todos.map((todo) => (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="mb-3 cursor-pointer">
                                        <h3 className={cn(
                                            "font-medium",
                                            {
                                                "line-through": todo.done
                                            }
                                        )}>{todo.name}</h3>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="w-48">
                                    <p className="truncate">{todo.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                }
            </CardContent>
        </Card>
    );
};
