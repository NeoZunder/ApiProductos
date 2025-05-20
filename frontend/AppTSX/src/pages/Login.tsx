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

export default function Login() {
    return <>
    <section className="h-screen flex items-center justify-center flex-col bg-[url(./assets/bk.jpg)] bg-cover bg-center grayscale-80">
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
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-60 block mx-auto sm:w-80"
                        onClick={functionLogin}>
                        Login
                    </Button>
                </CardFooter>
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
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password"  defaultValue="" placeholder="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="reg-re-password">Repeat Password</Label>
                    <Input id="reg-re-password" type="password"  defaultValue="" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-60 block mx-auto sm:w-80" onClick={functionRegister} >Register</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs> 
    </section>
    </>

}