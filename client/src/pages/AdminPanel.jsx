import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Shield, Users, Building2, CreditCard, TrendingUp, Plus, Search, Trash2, Mail } from 'lucide-react'

// 100 mock students
const STUDENTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  email: `student${String(i + 1).padStart(3, '0')}@emanam.edu`,
  role: 'STUDENT',
  org: 'RCAS College',
  joined: `2026-0${(i % 3) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  experiments: Math.floor(Math.random() * 15),
}))

const ORGS = [
  { id: 1, name: 'RCAS College',         plan: 'Academic Pro', users: 104, apiCalls: 12480 },
  { id: 2, name: 'MIT Chennai',           plan: 'Enterprise',  users: 320, apiCalls: 48200 },
  { id: 3, name: 'PSG Tech',             plan: 'Free Tier',   users: 18,  apiCalls: 820   },
  { id: 4, name: 'Amrita Coimbatore',    plan: 'Academic Pro', users: 87,  apiCalls: 9300  },
]

const REVENUE = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 41000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 55000 },
]

const PLAN_BADGE = {
  'Academic Pro': 'bg-brand-500/20 text-brand-400',
  'Enterprise':   'bg-purple-500/20 text-purple-400',
  'Free Tier':    'bg-slate-500/20 text-slate-400',
}

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
        active ? 'bg-brand-600/20 text-brand-300 border border-brand-700/50' : 'text-slate-400 hover:text-white hover:bg-surface-hover'
      }`}
    >
      {children}
    </button>
  )
}

export default function AdminPanel() {
  const [tab, setTab]       = useState('overview')
  const [search, setSearch] = useState('')
  const [page, setPage]     = useState(1)
  const PER_PAGE = 15

  const filtered = STUDENTS.filter(s => s.email.includes(search.toLowerCase()))
  const paged    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  return (
    <AppLayout title="Admin Panel">
      <div className="max-w-6xl mx-auto space-y-5 animate-fade-in">

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 glass p-2 rounded-2xl w-fit">
          {[
            { id: 'overview',   label: '📊 Overview'       },
            { id: 'orgs',       label: '🏢 Organizations'  },
            { id: 'users',      label: '👥 Users'          },
            { id: 'billing',    label: '💳 Billing'        },
          ].map(t => <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</Tab>)}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Organizations', value: '4',      icon: Building2, gradient: 'from-brand-600 to-purple-600'   },
                { label: 'Total Users',          value: '529',    icon: Users,     gradient: 'from-emerald-600 to-teal-600'   },
                { label: 'API Calls This Month', value: '70.8K', icon: TrendingUp, gradient: 'from-amber-600 to-orange-500'  },
                { label: 'Monthly Revenue',      value: '₹55K',  icon: CreditCard, gradient: 'from-rose-600 to-pink-600'    },
              ].map(({ label, value, icon: Icon, gradient }) => (
                <div key={label} className="stat-card">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Org quick view */}
            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-white text-sm mb-4">Organization Health</h3>
              <div className="space-y-3">
                {ORGS.map(org => (
                  <div key={org.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-hover transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {org.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{org.name}</p>
                      <p className="text-xs text-slate-500">{org.users} users · {org.apiCalls.toLocaleString()} API calls</p>
                    </div>
                    <span className={`badge ${PLAN_BADGE[org.plan]}`}>{org.plan}</span>
                    <div className="w-24 progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min((org.apiCalls / 50000) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORGANIZATIONS ── */}
        {tab === 'orgs' && (
          <div className="glass p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm">Registered Organizations</h3>
              <button className="btn-primary flex items-center gap-2 text-xs px-3 py-1.5"><Plus size={13} /> Add Org</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-surface-border">
                    {['Organization','Plan','Users','API Calls','Actions'].map(h => (
                      <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {ORGS.map(org => (
                    <tr key={org.id} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white">{org.name[0]}</div>
                          <span className="text-white font-medium">{org.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4"><span className={`badge ${PLAN_BADGE[org.plan]}`}>{org.plan}</span></td>
                      <td className="py-3 pr-4 text-slate-300">{org.users}</td>
                      <td className="py-3 pr-4 text-slate-300">{org.apiCalls.toLocaleString()}</td>
                      <td className="py-3">
                        <button className="text-red-500 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <div className="glass p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="font-semibold text-white text-sm">All Users ({filtered.length})</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-xl border border-surface-border">
                  <Search size={13} className="text-slate-500" />
                  <input
                    className="bg-transparent text-xs text-slate-300 placeholder-slate-600 outline-none w-40"
                    placeholder="Search email…"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1) }}
                  />
                </div>
                <button className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"><Plus size={13} /> Add User</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-surface-border">
                    {['#','Email','Role','Organization','Joined','Experiments'].map(h => (
                      <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50">
                  {paged.map(u => (
                    <tr key={u.id} className="hover:bg-surface-hover/30 transition-colors">
                      <td className="py-2 pr-4 text-slate-600">{u.id}</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white" style={{ fontSize: 8 }}>
                            {u.email[0].toUpperCase()}
                          </div>
                          <span className="text-slate-300">{u.email}</span>
                        </div>
                      </td>
                      <td className="py-2 pr-4"><span className="badge bg-brand-500/20 text-brand-400">{u.role}</span></td>
                      <td className="py-2 pr-4 text-slate-400">{u.org}</td>
                      <td className="py-2 pr-4 text-slate-500">{u.joined}</td>
                      <td className="py-2 text-accent-400 font-semibold">{u.experiments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40">← Prev</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40">Next →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── BILLING ── */}
        {tab === 'billing' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { plan: 'Free Tier',    orgs: 1,  mrr: '₹0',       color: 'from-slate-600 to-slate-700'    },
                { plan: 'Academic Pro', orgs: 2,  mrr: '₹1,998',   color: 'from-brand-600 to-purple-600'   },
                { plan: 'Enterprise',   orgs: 1,  mrr: '₹24,999',  color: 'from-amber-600 to-orange-500'   },
              ].map(({ plan, orgs, mrr, color }) => (
                <div key={plan} className="glass p-5 rounded-2xl">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                    <CreditCard size={18} className="text-white" />
                  </div>
                  <p className="text-sm text-slate-400">{plan}</p>
                  <p className="text-2xl font-bold text-white">{mrr}<span className="text-xs text-slate-500 font-normal ml-1">/mo</span></p>
                  <p className="text-xs text-slate-500 mt-1">{orgs} org{orgs > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>

            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-white text-sm mb-4">Monthly Revenue</h3>
              <div className="space-y-3">
                {REVENUE.map(({ month, revenue }) => (
                  <div key={month} className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 w-8">{month}</span>
                    <div className="flex-1 progress-bar">
                      <div className="progress-fill" style={{ width: `${(revenue / 60000) * 100}%` }} />
                    </div>
                    <span className="text-xs text-white font-semibold w-16 text-right">₹{revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
