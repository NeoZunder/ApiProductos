// src/components/Navbar.tsx
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link to="/home">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/login">Login</Link>
      <Link to="/reset-password">Reset Password</Link>
      <Link to="/forgotPassword">Forgot Password</Link>
    </nav>
  )
}
