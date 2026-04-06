import { useNavigate } from 'react-router-dom'
import { Brain, Zap, Globe, FlaskConical, MessageSquare, ArrowRight, Star, Users, Database, TrendingUp, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { icon: Globe,        title: 'Multilingual NLP',      desc: 'English, Tamil & Malayalam with IndicBERT, MuRIL, and BERT models.',      color: 'from-blue-500 to-cyan-500'    },
  { icon: FlaskConical, title: 'Experiment Lab',         desc: 'Upload datasets, select models, run experiments and compare results.',     color: 'from-purple-500 to-pink-500'  },
  { icon: MessageSquare,title: 'WhatsApp Analysis',      desc: 'Parse WhatsApp exports — detect sentiment, emoji patterns, active users.', color: 'from-green-500 to-emerald-500' },
  { icon: Zap,          title: 'Real-Time Analytics',    desc: 'Live sentiment streaming dashboard with time-series visualisations.',      color: 'from-orange-500 to-amber-500' },
  { icon: Database,     title: 'Data Annotation',        desc: 'Manual labelling interface with inter-annotator agreement export.',        color: 'from-indigo-500 to-brand-500' },
  { icon: TrendingUp,   title: 'Model Evaluation',       desc: 'Accuracy, Precision, Recall, F1-Score, and Confusion Matrix per run.',    color: 'from-rose-500 to-pink-500'    },
]

const STATS = [
  { label: 'Universities', value: '50+' },
  { label: 'Languages',    value: '6'   },
  { label: 'Models',       value: '12+' },
  { label: 'Researchers',  value: '1K+' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen mesh-bg text-slate-100 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 sm:px-12 py-4 border-b border-white/5 backdrop-blur-sm sticky top-0 z-50 bg-surface/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center glow-brand">
            <Brain size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg gradient-text">E-Manam</span>
        </div>
        <div className="flex items-center gap-3">
          {user
            ? <button onClick={() => navigate('/dashboard')} className="btn-primary">Go to Dashboard <ArrowRight size={14} className="inline ml-1" /></button>
            : <>
                <button onClick={() => navigate('/login')} className="btn-secondary">Sign In</button>
                <button onClick={() => navigate('/login')} className="btn-primary">Get Started <ArrowRight size={14} className="inline ml-1" /></button>
              </>
          }
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 sm:px-12 pt-24 pb-20 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-brand-300 mb-6 border border-brand-700/50">
          <Zap size={12} className="text-brand-400" />
          Academic SaaS · Research Grade · Production Ready
        </div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
          <span className="gradient-text">E-Manam</span>
          <br />
          <span className="text-white text-4xl sm:text-5xl">Multilingual Sentiment</span>
          <br />
          <span className="text-white text-4xl sm:text-5xl">Analysis Platform</span>
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          A multi-tenant AI-powered research ecosystem for institutions, faculty, and students.
          Analyse sentiment in <strong className="text-white">English, Tamil &amp; Malayalam</strong> using
          state-of-the-art transformers — IndicBERT, MuRIL, BERT.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => navigate('/login')} className="btn-primary text-base px-8 py-3">
            Start Research <ArrowRight size={16} className="inline ml-2" />
          </button>
          <button onClick={() => navigate('/analyze')} className="btn-secondary text-base px-8 py-3">
            Try Live Demo
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ label, value }) => (
            <div key={label} className="glass p-4 rounded-2xl">
              <p className="font-display font-bold text-3xl gradient-text">{value}</p>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 sm:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">Everything for NLP Research</h2>
          <p className="text-slate-400">From data collection to publication-ready exports — all in one platform.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass glass-hover p-6 group cursor-default">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Models banner */}
      <section className="px-6 sm:px-12 py-16 max-w-4xl mx-auto text-center">
        <div className="glass p-8 rounded-3xl border border-brand-700/30 glow-brand">
          <Star size={28} className="text-brand-400 mx-auto mb-3" />
          <h2 className="font-display font-bold text-2xl text-white mb-3">Powered by World-Class Models</h2>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['IndicBERT','MuRIL','BERT','DistilBERT','LSTM','VADER','SVM','Logistic Regression'].map(m => (
              <span key={m} className="px-3 py-1 rounded-full bg-brand-900/60 text-brand-300 text-xs border border-brand-700/50 font-medium">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 sm:px-12 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Transparent Pricing</h2>
          <p className="text-slate-400">Start free. Scale as your institution grows.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { plan: 'Free Tier',    price: '₹0',       features: ['5 projects', '100 analyses/mo', '2 models', 'Community support'], cta: 'Get Started', primary: false },
            { plan: 'Academic Pro', price: '₹999/mo',  features: ['Unlimited projects', '10K analyses/mo', 'All models', 'Priority support', 'WhatsApp NLP'], cta: 'Start Free Trial', primary: true  },
            { plan: 'Enterprise',   price: 'Custom',   features: ['Multi-org tenancy', 'Unlimited', 'Custom models', 'SLA + Dedicated support', 'Custom branding'], cta: 'Contact Us', primary: false },
          ].map(({ plan, price, features, cta, primary }) => (
            <div key={plan} className={`glass p-6 rounded-2xl flex flex-col ${primary ? 'border-brand-500/50 glow-brand' : ''}`}>
              <h3 className="font-display font-bold text-lg text-white">{plan}</h3>
              <p className="text-3xl font-extrabold gradient-text my-3">{price}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/login')} className={primary ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}>
                {cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border py-6 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} E-Manam · All rights reserved</p>
        <a
          href="https://www.linkedin.com/in/profanjitraja/"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium"
        >
          Theme &amp; Developed by <strong>Prof. Anjit Raja R</strong>
          <ExternalLink size={11} />
        </a>
      </footer>
    </div>
  )
}
