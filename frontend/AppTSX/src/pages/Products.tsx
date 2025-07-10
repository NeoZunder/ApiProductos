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

    import { useState } from "react"

    export default function Login() {
    // Estados para el form productos
        const [description, setDescription] = useState("")
        const [name, setName] = useState("")
        const [price, setPrice] = useState("")
        const [msgProducto, setMsgProducto] = useState("")

        // Función ejemplo para guardar producto
        const buttonGuardarProducto = async () => {
        // Aquí harías llamada API para guardar en base
        // Por ahora simulo éxito y limpio campos

        if (!name || !description || !price) {
        setMsgProducto("Por favor, complete todos los campos")
        return
        }

        // Validar que precio sea número
        if (isNaN(Number(price))) {
        setMsgProducto("Precio debe ser un número válido")
        return
        }

        // Simular guardado
        setMsgProducto("Producto guardado con éxito!")
        setDescription("")
        setPrice("")

        // Timeout para limpiar mensaje
        setTimeout(() => setMsgProducto(""), 3000)
    }

    return (
    <section className="h-screen flex items-center justify-center flex-col bg-[url(./assets/bk.jpg)] bg-cover bg-center">
        <Tabs defaultValue="account" className="backdrop-blur-xs w-[300px] sm:w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Ver Productos</TabsTrigger>
            <TabsTrigger value="addProduct">Registrar Producto</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
        </TabsContent>

        {/* Nueva pestaña Productos */}
        <TabsContent value="addProduct">
            <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Add Product Description</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="prod-name">Product Name</Label>
                    <Input
                    id="prod-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="prod-desc">Product Description</Label>
                    <Input
                    id="prod-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    />
                </div>

                <div className="space-y-1">
                <Label htmlFor="prod-precio">Price</Label>
                    <Input
                    id="prod-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    type="number"
                    min="0"
                    step="0.01"
                    />
                </div>
                </CardContent>

                <CardFooter>
                <Button className="w-full" onClick={buttonGuardarProducto}>
                    Guardar Producto
                </Button>
                </CardFooter>

                {msgProducto && (
                <div className="text-center text-green-600 mt-2">{msgProducto}</div>
                )}
            </Card>
        </TabsContent>
        </Tabs>
    </section>
    )
    }
