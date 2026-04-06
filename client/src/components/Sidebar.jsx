import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, FlaskConical, MessageSquare, Tag,
  ScanText, Settings, LogOut, Brain, ChevronRight, Shield, BookOpen
} from 'lucide-react'
import clsx from 'clsx'

const NAV = [
  { label: 'Dashboard',      icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Analyze Text',   icon: ScanText,        path: '/analyze'   },
  { label: 'Experiment Lab', icon: FlaskConical,     path: '/experiment' },
  { label: 'WhatsApp NLP',   icon: MessageSquare,    path: '/whatsapp'  },
  { label: 'Annotate Data',  icon: Tag,              path: '/annotate'  },
  { label: 'Models Tutorial',icon: BookOpen,         path: '/tutorials' },
]

const ADMIN_NAV = [
  { label: 'Admin Panel',    icon: Shield,           path: '/admin'     },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className={clsx(
      'h-screen flex flex-col bg-surface-card border-r border-surface-border',
      'transition-all duration-300 ease-in-out flex-shrink-0',
      collapsed ? 'w-16' : 'w-60'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-surface-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0 glow-brand">
          <Brain size={18} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg gradient-text whitespace-nowrap">E-Manam</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-surface-hover"
        >
          <ChevronRight size={14} className={clsx('transition-transform duration-300', collapsed ? '' : 'rotate-180')} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={clsx(
              'nav-item w-full',
              location.pathname === path && 'nav-item-active'
            )}
            title={collapsed ? label : ''}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}

        {(user?.role === 'SUPER_ADMIN' || user?.role === 'ORG_ADMIN') && (
          <>
            <div className={clsx('my-3 border-t border-surface-border', collapsed && 'mx-2')} />
            {ADMIN_NAV.map(({ label, icon: Icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={clsx('nav-item w-full', location.pathname === path && 'nav-item-active')}
                title={collapsed ? label : ''}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </button>
            ))}
          </>
        )}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-surface-border">
        <div className={clsx('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white font-medium truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role?.replace('_', ' ')?.toLowerCase()}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors p-1">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
