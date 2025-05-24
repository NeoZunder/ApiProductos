// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Products from "@/pages/Products"
import Login from "@/pages/Login"
import ResetPassword from "@/pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"


import { Navbar } from "@/components/ui/navbar"
import { useLocation } from "react-router-dom"


function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Show Navbar on all pages except Login */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
