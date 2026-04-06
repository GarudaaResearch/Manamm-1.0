import { useState, useRef } from 'react'
import AppLayout from '../components/AppLayout'
import { MessageSquare, Upload, Loader2, Users, TrendingUp, Smile, Hash } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const SAMPLE_CHAT = `04/01/2026, 09:12 - Anjit Raja: Good morning everyone! The lab is ready.
04/01/2026, 09:13 - Priya: Great! I love the new equipment 😍
04/01/2026, 09:15 - Rajan: The network is slow today, very frustrating 😤
04/01/2026, 09:18 - Anjit Raja: We're fixing it, please bear with us
04/01/2026, 09:20 - Priya: No worries! The session was amazing anyway 🔥
04/01/2026, 09:22 - Rajan: Okay thanks, I was a bit angry sorry 😅
04/01/2026, 09:25 - Meena: The slides are excellent! Can we get a copy?
04/01/2026, 09:26 - Anjit Raja: Of course, sharing now
04/01/2026, 09:28 - Meena: Perfect! This workshop is the best 🙌
04/01/2026, 09:30 - Rajan: Agreed, very helpful session today
04/01/2026, 09:35 - Priya: When is the next one? Can't wait!
04/01/2026, 09:36 - Anjit Raja: Next week, same time 😊
04/01/2026, 09:40 - Meena: The food in the break was terrible though 😬
04/01/2026, 09:41 - Rajan: Haha true, very bad canteen today
04/01/2026, 09:42 - Priya: Everything else was great so forgiven 😂`

function parseWhatsApp(raw) {
  const lines = raw.split('\n').filter(l => l.trim())
  const msgs  = []
  const re    = /^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+): (.+)$/
  for (const line of lines) {
    const m = line.match(re)
    if (m) msgs.push({ date: m[1], time: m[2], sender: m[3].trim(), text: m[4].trim() })
  }
  return msgs
}

function analyzeMsgs(msgs) {
  const posKw = ['good','great','love','amazing','best','excellent','perfect','helpful','happy','wonderful','🔥','🙌','😍','😊']
  const negKw = ['bad','slow','terrible','frustrating','angry','hate','worst','😤','😬']

  let pos=0, neg=0, neu=0
  const senderMap = {}
  const emojiMap  = {}

  msgs.forEach(({ sender, text }) => {
    if (!senderMap[sender]) senderMap[sender] = { count: 0, pos: 0, neg: 0 }
    senderMap[sender].count++
    const lower = text.toLowerCase()
    const isPos = posKw.some(k => lower.includes(k))
    const isNeg = negKw.some(k => lower.includes(k))
    if (isPos && !isNeg)      { pos++; senderMap[sender].pos++ }
    else if (isNeg && !isPos) { neg++; senderMap[sender].neg++ }
    else                       { neu++ }
    // Emoji count
    const emojis = [...text].filter(c => /\p{Emoji}/u.test(c) && c.trim())
    emojis.forEach(e => { emojiMap[e] = (emojiMap[e] || 0) + 1 })
  })

  const senders = Object.entries(senderMap).map(([name, d]) => ({ name, ...d }))
    .sort((a, b) => b.count - a.count)

  const topEmojis = Object.entries(emojiMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([emoji, count]) => ({ emoji, count }))

  return { pos, neg, neu, senders, topEmojis, total: msgs.length }
}

const PIE_COLORS = ['#10b981','#f43f5e','#eab308']

export default function WhatsAppAnalysis() {
  const [raw, setRaw]         = useState('')
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef()

  const handleAnalyze = async () => {
    if (!raw.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    const msgs = parseWhatsApp(raw)
    if (!msgs.length) { alert('Could not parse messages. Please use WhatsApp .txt export format.'); setLoading(false); return }
    setResult(analyzeMsgs(msgs))
    setLoading(false)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setRaw(ev.target.result)
    reader.readAsText(file)
  }

  const pieData = result ? [
    { name: 'Positive', value: result.pos },
    { name: 'Negative', value: result.neg },
    { name: 'Neutral',  value: result.neu },
  ] : []

  return (
    <AppLayout title="WhatsApp NLP Engine">
      <div className="max-w-5xl mx-auto space-y-5 animate-fade-in">

        {/* Upload */}
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} className="text-emerald-400" />
            <h2 className="font-semibold text-white">WhatsApp Chat Analyzer</h2>
            <span className="badge bg-emerald-500/20 text-emerald-400 ml-2">Unique USP</span>
          </div>

          <textarea
            rows={8}
            className="input-field resize-none font-mono text-xs mb-4"
            placeholder="Paste WhatsApp chat export here…&#10;Format: DD/MM/YYYY, HH:MM - Sender: Message"
            value={raw}
            onChange={e => setRaw(e.target.value)}
          />

          <div className="flex flex-wrap gap-3">
            <button onClick={handleAnalyze} disabled={loading || !raw.trim()} className="btn-accent flex items-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
              {loading ? 'Analysing…' : 'Analyse Chat'}
            </button>
            <button onClick={() => setRaw(SAMPLE_CHAT)} className="btn-secondary flex items-center gap-2">
              <Hash size={15} /> Load Sample
            </button>
            <button onClick={() => fileRef.current.click()} className="btn-secondary flex items-center gap-2">
              <Upload size={15} /> Upload .txt
            </button>
            <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFile} />
          </div>
        </div>

        {/* Results */}
        {result && !loading && (
          <div className="space-y-4 animate-slide-up">
            {/* KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Messages', value: result.total,                icon: MessageSquare, color: 'from-brand-600 to-purple-600' },
                { label: 'Positive',       value: result.pos,                  icon: Smile,         color: 'from-emerald-600 to-teal-600'  },
                { label: 'Negative',       value: result.neg,                  icon: TrendingUp,    color: 'from-rose-600 to-pink-600'     },
                { label: 'Active Users',   value: result.senders.length,       icon: Users,         color: 'from-amber-600 to-orange-500'  },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="stat-card">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Pie chart */}
              <div className="glass p-5 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3">Sentiment Distribution</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={3}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {pieData.map(({ name }, i) => (
                    <span key={name} className="flex items-center gap-1 text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />{name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top emojis */}
              <div className="glass p-5 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3">Top Emoji Usage</h3>
                {result.topEmojis.length ? (
                  <div className="space-y-2">
                    {result.topEmojis.map(({ emoji, count }) => (
                      <div key={emoji} className="flex items-center gap-3">
                        <span className="text-2xl w-8">{emoji}</span>
                        <div className="flex-1 progress-bar">
                          <div className="progress-fill" style={{ width: `${Math.min((count / result.topEmojis[0].count) * 100, 100)}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 w-4">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-xs text-slate-500">No emojis found.</p>}
              </div>
            </div>

            {/* Per-user message count */}
            <div className="glass p-5 rounded-2xl">
              <h3 className="text-sm font-semibold text-white mb-3">Message Activity per User</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={result.senders}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="pos"   name="Positive" fill="#10b981" radius={[4,4,0,0]} barSize={14} stackId="a" />
                  <Bar dataKey="neg"   name="Negative" fill="#f43f5e" radius={[0,0,0,0]} barSize={14} stackId="a" />
                  <Bar dataKey="count" name="Total"    fill="#6366f1" radius={[4,4,0,0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
