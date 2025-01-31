import {TodoListCard} from "@/components/TodoListCard.tsx";
import {useUserStore} from "@/store";
import React, {useEffect} from "react";


export const TodoListCardGrid: React.FC = () => {
    const {todoLists, fetchMyTodo} = useUserStore();

    useEffect(() => {
        fetchMyTodo()
    }, []);

    return (
        <div className="flex justify-center flex-wrap gap-4 py-12">
            {
                todoLists && todoLists.map((item) => <TodoListCard key={item._id} _id={item._id} name={item.name} todos={item.todos}/>)
            }
        </div>
    );
};

