import { Outlet } from '@tanstack/react-router'
import { Header } from './components/Header'

export const AppLayout = () => (
  <>
    <Header />
    <main className="layout-container isolate flex-1 overflow-x-hidden">
      <Outlet />
    </main>
  </>
)
