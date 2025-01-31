import {Button} from "@/components/ui/button.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Link, Outlet} from "react-router";
import {useUserStore} from "@/store";
import {AddNewDialog} from "@/components/AddNewDialog.tsx";
import React from "react";

export const Header: React.FC = () => {
    const {user, fetchLogout} = useUserStore();

    return (
        <div>
            <div className="p-4 h-16 flex justify-between items-center bg-gray-200 rounded-b-lg">
                <Link to="/">
                    <div className="">TodoList</div>
                </Link>
                <div className="flex justify-between items-center">
                    <AddNewDialog/>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-4" asChild>
                            <Button variant="outline">Hi, {user.name}!</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={fetchLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

