import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";


export const RegisterPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Зареєструватися</Button>
                </CardFooter>
            </Card>

        </div>
    );
};
