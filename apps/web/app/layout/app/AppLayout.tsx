import { Outlet } from '@tanstack/react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const AppLayout = () => (
  <>
    <Header />
    <main className="layout-container isolate min-h-0 flex-1 overflow-x-hidden">
      <Outlet />
    </main>
    <Footer />
  </>
)
