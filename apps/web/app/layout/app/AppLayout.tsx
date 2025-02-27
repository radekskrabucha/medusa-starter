import { Link, Outlet } from '@tanstack/react-router'

export const AppLayout = () => (
  <div className="p-2">
    <div className="bg-primary flex items-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/cart">Cart</Link>
    </div>
    <h3>Welcome to Medusa Starter</h3>
    <Outlet />
  </div>
)
