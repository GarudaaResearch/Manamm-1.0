import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, FlaskConical, Database, Users, ArrowUpRight } from 'lucide-react'

const sentimentTrend = [
  { date: 'Jan', positive: 62, negative: 24, neutral: 14 },
  { date: 'Feb', positive: 70, negative: 18, neutral: 12 },
  { date: 'Mar', positive: 55, negative: 29, neutral: 16 },
  { date: 'Apr', positive: 78, negative: 14, neutral: 8  },
  { date: 'May', positive: 66, negative: 22, neutral: 12 },
  { date: 'Jun', positive: 80, negative: 10, neutral: 10 },
]

const langDist = [
  { name: 'English',  value: 48, color: '#6366f1' },
  { name: 'Tamil',    value: 32, color: '#a855f7' },
  { name: 'Malayalam',value: 20, color: '#10b981' },
]

const modelPerf = [
  { model: 'IndicBERT', f1: 91, acc: 92 },
  { model: 'MuRIL',     f1: 89, acc: 90 },
  { model: 'BERT',      f1: 87, acc: 88 },
  { model: 'LSTM',      f1: 82, acc: 83 },
  { model: 'SVM',       f1: 76, acc: 78 },
]

const STATS = [
  { label: 'Total Analyses',   value: '12,480', delta: '+8.2%',  icon: TrendingUp, color: 'from-brand-600 to-purple-600' },
  { label: 'Experiments Run',  value: '347',    delta: '+12%',   icon: FlaskConical, color: 'from-pink-600 to-rose-600'   },
  { label: 'Datasets Loaded',  value: '28',     delta: '+3',     icon: Database,   color: 'from-amber-600 to-orange-500' },
  { label: 'Active Users',     value: '104',    delta: '+5',     icon: Users,      color: 'from-emerald-600 to-teal-600' },
]

const RECENT = [
  { text: 'The new campus library is absolutely amazing!',              lang: 'English', sentiment: 'Positive', conf: '97%' },
  { text: 'இந்த திட்டம் மிகவும் பயனுள்ளதாக இருக்கிறது',               lang: 'Tamil',   sentiment: 'Positive', conf: '94%' },
  { text: 'The assignment deadline was too short and stressful.',       lang: 'English', sentiment: 'Negative', conf: '92%' },
  { text: 'ക്ലാസ്സ് റൂം സൗകര്യങ്ങൾ മെച്ചപ്പെടുത്തണം',                lang: 'Malayalam', sentiment: 'Negative', conf: '89%' },
  { text: "The lecture was okay, nothing special but not bad either.", lang: 'English', sentiment: 'Neutral',  conf: '85%' },
]

export default function Dashboard() {
  return (
    <AppLayout title="Research Dashboard">
      <div className="space-y-6 animate-fade-in">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, delta, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  {delta} <ArrowUpRight size={12} />
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-white">{value}</p>
                <p className="text-slate-400 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Sentiment Trend */}
          <div className="glass p-5 col-span-2">
            <h2 className="text-sm font-semibold text-white mb-4">Sentiment Trend (6 months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={sentimentTrend}>
                <defs>
                  <linearGradient id="pos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="neg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="positive" stroke="#10b981" fill="url(#pos)" strokeWidth={2} name="Positive" />
                <Area type="monotone" dataKey="negative" stroke="#f43f5e" fill="url(#neg)" strokeWidth={2} name="Negative" />
                <Area type="monotone" dataKey="neutral"  stroke="#eab308" fill="none"       strokeWidth={2} name="Neutral"  strokeDasharray="4 4"/>
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Language Distribution */}
          <div className="glass p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Language Distribution</h2>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={langDist} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {langDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {langDist.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: color }} />{name}</span>
                  <span className="text-slate-400">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Model Performance */}
          <div className="glass p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Model Performance (F1 &amp; Accuracy)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={modelPerf} layout="vertical">
                <XAxis type="number" domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                <YAxis dataKey="model" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} width={75} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="f1"  name="F1 Score"  fill="#6366f1" radius={[0,4,4,0]} barSize={8} />
                <Bar dataKey="acc" name="Accuracy"  fill="#10b981" radius={[0,4,4,0]} barSize={8} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Analyses */}
          <div className="glass p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Recent Analyses</h2>
            <div className="space-y-2">
              {RECENT.map(({ text, lang, sentiment, conf }, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors">
                  <div className={`mt-0.5 flex-shrink-0 badge ${
                    sentiment === 'Positive' ? 'badge-positive' :
                    sentiment === 'Negative' ? 'badge-negative' : 'badge-neutral'
                  }`}>{sentiment}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 truncate">{text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lang} · {conf} confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
