import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";


export const LoginPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        <div className="mt-3">
                            <Alert variant="destructive">
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    Wrong email or password
                                </AlertDescription>
                            </Alert>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email"/>
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password"/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
