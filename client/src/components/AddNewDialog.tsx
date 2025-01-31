import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";
import {useUserStore} from "@/store";


export const AddNewDialog: React.FC = () => {
    const {fetchTodoCreate} = useUserStore();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleAdd = () => {
        if(name === "") return;

        fetchTodoCreate(name);
        setOpen(false);
        setName("")
    }

    return (
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger>
                    <Button>Add new</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new todo list</DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name" value={name} onInput={(e) => setName(e.currentTarget.value)}/>
                    </div>
                    <DialogFooter>
                        <div className="flex justify-end">
                            <Button onClick={handleAdd}>Add</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    );
};
