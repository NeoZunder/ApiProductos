import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {functionLogin, functionRegister} from "@/Apis/AuthLogin"

const buttonLogin = async () => {
    const loginMsg = document.querySelector(".login-msg") as HTMLDivElement;
    const res = await functionLogin();
    
    if (res) {
        loginMsg.innerHTML = `<p>${res}</p>`;
        setTimeout(() => {
        loginMsg.innerHTML = "";
        }, 3000);
    }
};

const buttonRegister =  async () => {
    const registerMsg = document.querySelector(".register-msg") as HTMLDivElement;
    const res = await functionRegister();
    
    if (res) {
        registerMsg.innerHTML = `<p>${res}</p>`;
        setTimeout(() => {
        registerMsg.innerHTML = "";
        }, 3000);
    }
};

const buttonForgetPassword = async () => {
     window.location.href = "/reset-password";
}

export default function Login() {
    return <>
    <section className="h-screen flex items-center justify-center flex-col bg-[url(./assets/bk.jpg)] bg-cover bg-center">
        <Tabs defaultValue="account" className=" backdrop-blur-xs w-[300px] sm:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Sign In</TabsTrigger>
                <TabsTrigger value="password">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                    Login To Your Account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue=""  placeholder="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password"  defaultValue="" placeholder=""/>
                    </div>
                    <p className="text-blue-700 underline font-bold text-xs" style={{ cursor: "pointer" }} onClick={buttonForgetPassword}>Forgot Your Password?</p>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-60 block mx-auto sm:w-80"
                        onClick={buttonLogin}>
                        Login
                    </Button>
                </CardFooter>
                <div className="login-msg space-y-1 w-60 block mx-auto sm:w-80 flex items-center justify-center text-red-500">
                </div>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card> 
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                    Create Your Account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input id="reg-username" defaultValue="" placeholder="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" defaultValue="" placeholder="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password"  defaultValue="" placeholder="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="reg-re-password">Repeat Password</Label>
                    <Input id="reg-re-password" type="password"  defaultValue="" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-60 block mx-auto sm:w-80 " onClick={buttonRegister} >Register</Button>
                </CardFooter>
                <div className="register-msg space-y-1 w-60 block mx-auto sm:w-80 flex items-center justify-center text-red-500">
                </div>
                </Card>
            </TabsContent>
        </Tabs> 
    </section>
    </>

}