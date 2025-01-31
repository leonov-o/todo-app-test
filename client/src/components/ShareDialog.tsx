import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {todoListService} from "@/entities/todoList/todoList.service.ts";
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface Props {
    id: string | undefined
    disabled?: boolean
}

export const ShareDialog: React.FC<Props> = ({id, disabled}) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<string>("");
    const handleShare = async () => {
        if(!id || email === "" || role === "" || role !== "viewer" && role !== "admin") return;

        await todoListService.addMember(id, email, role);
        setOpen(false);
        setEmail("")
    }

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger>
                <Button variant="secondary" disabled={disabled}>Share</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share todo list</DialogTitle>
                    <DialogDescription>Enter email to share</DialogDescription>
                </DialogHeader>
                <div className="">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex justify-between items-center gap-2">
                        <Input id="email" placeholder="Email" value={email} onInput={(e) => setEmail(e.currentTarget.value)}/>
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="viewer">Viewer</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-end">
                        <Button onClick={handleShare}>Share</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
