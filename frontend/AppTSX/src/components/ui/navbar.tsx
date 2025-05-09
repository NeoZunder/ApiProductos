// src/components/Navbar.tsx
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link to="/">Home</Link>
      <Link to="/products">About</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}
