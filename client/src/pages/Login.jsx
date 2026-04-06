import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Brain, Eye, EyeOff, Loader2, ArrowRight, ExternalLink } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = login(email.trim(), password)
    setLoading(false)
    if (res.success) {
      const role = res.user.role
      navigate(role === 'SUPER_ADMIN' || role === 'ORG_ADMIN' ? '/admin' : '/dashboard')
    } else {
      setError(res.error)
    }
  }

  const quickLogin = (e, p) => { setEmail(e); setPassword(p) }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass p-8 rounded-3xl border border-white/10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center glow-brand mb-4">
              <Brain size={28} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl gradient-text">E-Manam</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to your research workspace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Email Address</label>
              <input
                id="login-email"
                type="email"
                className="input-field"
                placeholder="admin@emanam.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button id="login-submit" type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base mt-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Demo creds */}
          <div className="mt-6 p-4 rounded-2xl bg-surface-card border border-surface-border space-y-2">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-3">Quick Demo Access</p>
            {[
              { label: '🛡 Super Admin', email: 'admin@emanam.edu',      pw: 'Admin@Emanam' },
              { label: '🎓 Faculty',     email: 'faculty@emanam.edu',    pw: 'Emanam@123'  },
              { label: '📚 Student',     email: 'student001@emanam.edu', pw: 'Emanam@123'  },
            ].map(({ label, email: e, pw }) => (
              <button
                key={e}
                type="button"
                onClick={() => quickLogin(e, pw)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors text-xs"
              >
                <span className="text-slate-300 font-medium">{label}</span>
                <span className="text-slate-500 ml-2">{e}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-slate-600">
          <a href="https://www.linkedin.com/in/profanjitraja/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-500 hover:text-brand-400 transition-colors">
            Theme &amp; Developed by Prof. Anjit Raja R <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  )
}
