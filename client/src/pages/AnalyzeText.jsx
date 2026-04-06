import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { ScanText, Languages, Loader2, CheckCircle, AlertCircle, Minus } from 'lucide-react'

const MODELS = ['IndicBERT', 'MuRIL', 'BERT', 'VADER (Rule-based)', 'SVM', 'LSTM']
const LANGS  = [{ code: 'en', label: '🇬🇧 English' }, { code: 'ta', label: '🇮🇳 Tamil' }, { code: 'ml', label: '🇮🇳 Malayalam' }]

// Deterministic mock sentiment based on keywords
function mockAnalyze(text, model, lang) {
  const lower = text.toLowerCase()
  const posWords = ['good','great','amazing','excellent','love','wonderful','happy','best','awesome','superb','beautiful','perfect','nice']
  const negWords = ['bad','terrible','horrible','hate','worst','awful','poor','disappointing','sad','angry','frustrating','ugly']
  let posScore = posWords.filter(w => lower.includes(w)).length
  let negScore = negWords.filter(w => lower.includes(w)).length
  const total = Math.max(posScore + negScore, 1)
  let sentiment, confidence
  if (posScore > negScore)      { sentiment = 'Positive'; confidence = 0.7 + (posScore / total) * 0.25 }
  else if (negScore > posScore) { sentiment = 'Negative'; confidence = 0.7 + (negScore / total) * 0.25 }
  else                          { sentiment = 'Neutral';  confidence = 0.65 + Math.random() * 0.2 }

  const emotions = ['Joy','Surprise','Sadness','Anger','Fear','Disgust']
  const emotion  = sentiment === 'Positive' ? 'Joy' : sentiment === 'Negative' ? emotions[Math.floor(Math.random()*3)+2] : 'Surprise'

  return {
    sentiment,
    confidence: parseFloat(Math.min(confidence, 0.99).toFixed(2)),
    emotion,
    sarcasm: Math.random() > 0.85,
    model,
    language: lang,
    tokens: text.split(/\s+/).length,
  }
}

const ICONS = { Positive: CheckCircle, Negative: AlertCircle, Neutral: Minus }
const COLORS = { Positive: 'text-emerald-400', Negative: 'text-red-400', Neutral: 'text-yellow-400' }
const BG     = { Positive: 'bg-emerald-500/10 border-emerald-500/30', Negative: 'bg-red-500/10 border-red-500/30', Neutral: 'bg-yellow-500/10 border-yellow-500/30' }

export default function AnalyzeText() {
  const [text, setText]     = useState('')
  const [model, setModel]   = useState('IndicBERT')
  const [lang, setLang]     = useState('en')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setResult(mockAnalyze(text, model, lang))
    setLoading(false)
  }

  const SIcon = result ? ICONS[result.sentiment] : null

  return (
    <AppLayout title="Analyze Text">
      <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">

        {/* Input card */}
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ScanText size={20} className="text-brand-400" />
            <h2 className="font-semibold text-white">Text Sentiment Analyzer</h2>
          </div>

          <textarea
            id="analyze-input"
            rows={5}
            className="input-field resize-none"
            placeholder="Enter text in English, Tamil, or Malayalam… e.g. 'The new lab facilities are amazing!'"
            value={text}
            onChange={e => setText(e.target.value)}
          />

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            <select
              id="model-select"
              value={model}
              onChange={e => setModel(e.target.value)}
              className="input-field flex-1 min-w-[160px]"
            >
              {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              id="lang-select"
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="input-field flex-1 min-w-[140px]"
            >
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <button
              id="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="btn-primary flex items-center gap-2 min-w-[130px]"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : <><Languages size={16} /> Analyze</>}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && !loading && (
          <div className={`glass p-6 rounded-2xl border animate-slide-up ${BG[result.sentiment]}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {SIcon && <SIcon size={28} className={COLORS[result.sentiment]} />}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Sentiment</p>
                  <p className={`text-3xl font-display font-bold ${COLORS[result.sentiment]}`}>{result.sentiment}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Confidence</p>
                <p className="text-2xl font-bold text-white">{(result.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>

            <div className="mt-4 progress-bar">
              <div className="progress-fill" style={{ width: `${result.confidence * 100}%` }} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {[
                { label: 'Emotion',   value: result.emotion },
                { label: 'Sarcasm',   value: result.sarcasm ? '⚠ Detected' : '✓ None' },
                { label: 'Model',     value: result.model },
                { label: 'Language',  value: LANGS.find(l => l.code === result.language)?.label.split(' ')[1] || result.language },
              ].map(({ label, value }) => (
                <div key={label} className="glass p-3 rounded-xl text-center">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-sm text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample sentences */}
        <div className="glass p-5 rounded-2xl">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-3">Try a Sample Sentence</p>
          <div className="flex flex-wrap gap-2">
            {[
              'The campus library is absolutely amazing!',
              'The food in the canteen is terrible and unhealthy.',
              'The lecture was okay, nothing special.',
              'இந்த திட்டம் மிகவும் பயனுள்ளதாக இருக்கிறது',
              'ക്ലാസ്സ് റൂം സൗകര്യങ്ങൾ മെച്ചപ്പെടുത്തണം',
            ].map(s => (
              <button key={s} onClick={() => setText(s)}
                className="px-3 py-1.5 rounded-xl bg-surface-card border border-surface-border text-xs text-slate-300 hover:border-brand-600 hover:text-brand-300 transition-colors text-left truncate max-w-xs">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
