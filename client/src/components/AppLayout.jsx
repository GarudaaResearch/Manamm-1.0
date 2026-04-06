import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import Footer  from '../components/Footer'

export default function AppLayout({ title, children }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-6 mesh-bg animate-fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
