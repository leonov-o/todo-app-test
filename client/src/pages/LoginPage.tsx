import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useUserStore} from "@/store";
import {Link, useNavigate} from "react-router";


export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const {isAuth, error, fetchLogin} = useUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetchLogin({email, password});
    }

    useEffect(() => {
        if(isAuth) navigate("/");
    }, [isAuth]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
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
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" onInput={(e) => setPassword(e.currentTarget.value)}/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex text-sm font-light">
                        Do not have an account?
                    <Link to="/register" className="mr-4 ml-1 text-blue-600">Register</Link>
                    </div>
                    <Button onClick={handleLogin}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
