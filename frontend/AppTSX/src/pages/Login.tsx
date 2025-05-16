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

const functionLogin = async () => {  
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!username || !password) {
        console.error("Please fill in all fields");
        return;
    }

    try {
    const response = await fetch("/api/login/signin", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.status === 200) {
        console.log(data.message);
        window.location.href = "/home";
    } else {
        console.error(data.message || "Login failed");
    }
    } catch (error) {
        console.error("Error during login:", error);
        alert("There was an error connecting to the server.");
    }

}

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
                    Login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password"  defaultValue="" />
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
                    create an account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password"  defaultValue="" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="re-password">Repeat Password</Label>
                    <Input id="re-password" type="password"  defaultValue="" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-60 block mx-auto sm:w-80 ">Register</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs> 
    </section>
    </>

}