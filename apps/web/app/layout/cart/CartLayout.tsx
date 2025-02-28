import { Link, Outlet } from '@tanstack/react-router'

export const CartLayout = () => (
  <div className="p-2">
    <div className="flex items-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/cart">Cart</Link>
    </div>
    <h3>Cart Layout</h3>
    <Outlet />
  </div>
)
