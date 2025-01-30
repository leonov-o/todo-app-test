import {Button} from "@/components/ui/button.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export const Header = () => {
    return (
        <div className="p-4 h-16 flex justify-between items-center bg-gray-200 rounded-b-lg">
            <div className="">TodoList</div>
            <div className="flex justify-between items-center">
                <Button>Add new</Button>
                <DropdownMenu >
                    <DropdownMenuTrigger className="ml-4" asChild>
                        <Button variant="outline">Hi, User!</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

