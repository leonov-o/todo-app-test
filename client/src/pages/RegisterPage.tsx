import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Link, useNavigate} from "react-router";
import {useUserStore} from "@/store";


export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const {isAuth, error, fetchRegister} = useUserStore();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        fetchRegister({email, name, password});
    }

    useEffect(() => {
        if(isAuth) navigate("/");
    }, [isAuth]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        {
                            error && (
                                <div className="mt-3">
                                    <Alert variant="destructive">
                                        <AlertTitle>Error!</AlertTitle>
                                        <AlertDescription>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" onInput={(e) => setEmail(e.currentTarget.value)}/>
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" onInput={(e) => setName(e.currentTarget.value)}/>
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" onInput={(e) => setPassword(e.currentTarget.value)}/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex text-sm font-light">
                        Already have an account?
                        <Link to="/login" className="mr-4 ml-1 text-blue-600">Login</Link>
                    </div>
                    <Button onClick={handleRegister}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
