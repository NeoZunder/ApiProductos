// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Products from "@/pages/Products"
import Login from "@/pages/Login"
import { Navbar } from "@/components/ui/navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
