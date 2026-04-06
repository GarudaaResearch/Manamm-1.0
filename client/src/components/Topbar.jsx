import { useState } from 'react'
import { Bell, Moon, Sun, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ title }) {
  const { user } = useAuth()
  const [dark, setDark] = useState(true)

  const toggleTheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-surface-card/60 border-b border-surface-border backdrop-blur-sm flex-shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <p className="text-xs text-slate-500">{user?.organization?.name || 'E-Manam Platform'}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-surface-border text-xs text-slate-500">
          <Search size={13} />
          <span>Quick search…</span>
          <kbd className="ml-4 px-1.5 py-0.5 bg-surface-hover rounded text-slate-600 font-mono text-xs">⌘K</kbd>
        </div>
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full" />
        </button>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
          {user?.email?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}
