import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { functionSaveNewPassword } from "@/Apis/AuthLogin";

const buttonSaveNewPassword = async () => {
    const Msg = document.querySelector(".msg") as HTMLDivElement;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const repeatPassword = (document.getElementById("repeatPassword") as HTMLInputElement).value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token){
        Msg.innerHTML = `<p> Error al recibir el Token</p>`;
        return
    }

    if (!password || !repeatPassword){
        Msg.innerHTML = `<p> Debe llenar todos los campos Token: ${token}</p>`;
        return
    }

    if (password !== repeatPassword){
        Msg.innerHTML = `<p> Las contraseñas deben ser iguales </p>`;
        return
    }

    const respuesta = await functionSaveNewPassword(token, password, repeatPassword);
    
    if (respuesta) {
        Msg.innerHTML = `<p>${respuesta}</p>`;
        setTimeout(() => {
        Msg.innerHTML = "";
        }, 3000);
    }
};


export default function ForgotPassword(){ 
        return (
        <section className="h-screen flex items-center justify-center flex-col bg-[url(./assets/bk.jpg)] bg-cover bg-center">
        <Card className="w-[300px] sm:w-[400px] backdrop-blur-xs">
            <CardHeader>
            <CardTitle>Resetear Contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor="password">Nueva contraseña</Label>
                <Input
                id="password"
                type="password"
                placeholder="Nueva contraseña"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="repeatPassword">Repetir contraseña</Label>
                <Input
                id="repeatPassword"
                type="password"
                placeholder="Repetir contraseña"
                />
            </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
            <Button
                className="w-60 block mx-auto sm:w-80"
                onClick={buttonSaveNewPassword}
            >
                Guardar nueva contraseña
            </Button>
                <div className="msg space-y-1 w-60 block mx-auto sm:w-80 flex items-center justify-center text-center text-sm text-gray-600">
                </div>
            </CardFooter>
        </Card>
        </section>
    )
    }

