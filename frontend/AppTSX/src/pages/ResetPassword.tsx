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

import { functionResetPassword } from "@/Apis/AuthLogin";

const buttonResetPassword = async () => {
    const resetPasswordMsg = document.querySelector(".resetPasswordMsg") as HTMLDivElement;
    const respuesta = await functionResetPassword();
    
    if (respuesta) {
        resetPasswordMsg.innerHTML = `<p>${respuesta}</p>`;
        setTimeout(() => {
        resetPasswordMsg.innerHTML = "";
        }, 3000);
    }
};


export default function ResetPassword(){
    return (
    <section className="h-screen flex items-center justify-center flex-col bg-[url(./assets/bk.jpg)] bg-cover bg-center">
      <Card className="w-[300px] sm:w-[400px] backdrop-blur-xs">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email to receive reset instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-60 block mx-auto sm:w-80"
            onClick={buttonResetPassword}
          >
            Send Reset Link
          </Button>
        </CardFooter>
          <div className="resetPasswordMsg space-y-1 w-60 block mx-auto sm:w-80 flex items-center justify-center text-center text-sm text-gray-600">
          </div>
      </Card>
    </section>
  )
}

