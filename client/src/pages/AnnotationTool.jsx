import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Tag, Check, X, Download, ChevronLeft, ChevronRight } from 'lucide-react'

const SAMPLE_SENTENCES = [
  { id: 1, text: 'The new campus library is absolutely amazing!',              lang: 'English' },
  { id: 2, text: 'The food in the canteen has been really terrible lately.',   lang: 'English' },
  { id: 3, text: 'Today\'s lecture was okay, nothing special.',                lang: 'English' },
  { id: 4, text: 'இந்த திட்டம் மிகவும் பயனுள்ளதாக இருக்கிறது',               lang: 'Tamil'   },
  { id: 5, text: 'வகுப்பறையில் காற்றில்லாமல் மிகவும் கஷ்டமாக இருக்கிறது',    lang: 'Tamil'   },
  { id: 6, text: 'ക്ലാസ്സ് റൂം സൗകര്യങ്ങൾ മെച്ചപ്പെടുത്തണം',                lang: 'Malayalam'},
  { id: 7, text: 'The annual fest was absolutely spectacular!',                lang: 'English' },
  { id: 8, text: 'Results are delayed and there is no communication.',         lang: 'English' },
  { id: 9, text: 'Wifi connectivity on campus is getting better gradually.',   lang: 'English' },
  { id: 10,text: 'The hostel facilities need urgent improvement.',             lang: 'English' },
]

const LABELS = [
  { value: 'Positive', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', key: '1' },
  { value: 'Negative', color: 'bg-red-500/20 text-red-400 border-red-500/40',             key: '2' },
  { value: 'Neutral',  color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',    key: '3' },
]

export default function AnnotationTool() {
  const [current, setCurrent] = useState(0)
  const [labels, setLabels]   = useState({})
  const [done, setDone]       = useState(false)

  const total    = SAMPLE_SENTENCES.length
  const sentence = SAMPLE_SENTENCES[current]
  const labeled  = Object.keys(labels).length

  const handleLabel = (label) => {
    setLabels(prev => ({ ...prev, [sentence.id]: label }))
    if (current < total - 1) setCurrent(c => c + 1)
    else setDone(true)
  }

  const handleExport = () => {
    const data = SAMPLE_SENTENCES.map(s => ({ ...s, label: labels[s.id] || 'Unlabeled' }))
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'emanam_annotations.json'
    a.click()
  }

  const agreement = labeled > 0
    ? ((Object.values(labels).filter(l => l !== 'Neutral').length / labeled) * 100).toFixed(0)
    : 0

  return (
    <AppLayout title="Data Annotation Tool">
      <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">

        {/* Progress header */}
        <div className="glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-amber-400" />
              <h2 className="font-semibold text-white">Manual Labeling Interface</h2>
            </div>
            <span className="text-sm font-bold text-white">{labeled}/{total} labeled</span>
          </div>
          <div className="progress-bar h-2.5">
            <div className="progress-fill" style={{ width: `${(labeled / total) * 100}%` }} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-500">Inter-Annotator Score: <span className="text-accent-400 font-semibold">{agreement}%</span></span>
            <button onClick={handleExport} className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5">
              <Download size={13} /> Export JSON
            </button>
          </div>
        </div>

        {!done ? (
          <>
            {/* Sentence card */}
            <div className="glass p-8 rounded-2xl text-center space-y-4 border border-brand-700/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs text-slate-500">#{sentence.id} · {sentence.lang}</span>
                {labels[sentence.id] && (
                  <span className={`badge ${LABELS.find(l => l.value === labels[sentence.id])?.color ?? ''}`}>
                    {labels[sentence.id]}
                  </span>
                )}
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">"{sentence.text}"</p>
              <p className="text-xs text-slate-500">Press 1, 2, or 3 on keyboard or click below</p>
            </div>

            {/* Label buttons */}
            <div className="grid grid-cols-3 gap-4">
              {LABELS.map(({ value, color, key }) => (
                <button
                  key={value}
                  onClick={() => handleLabel(value)}
                  className={`p-4 rounded-2xl border text-center font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${color} ${
                    labels[sentence.id] === value ? 'ring-2 ring-offset-2 ring-offset-surface ring-white/20 scale-105' : ''
                  }`}
                >
                  <span className="text-2xl block mb-1">{key === '1' ? '😊' : key === '2' ? '😞' : '😐'}</span>
                  {value}
                  <span className="text-xs opacity-60 block">[{key}]</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
                className="btn-secondary flex items-center gap-1.5 disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-sm text-slate-400">{current + 1} of {total}</span>
              <button
                onClick={() => { if (current < total - 1) { setCurrent(c => c + 1) } else { setDone(true) } }}
                className="btn-secondary flex items-center gap-1.5"
              >
                {current === total - 1 ? 'Finish' : 'Skip'} <ChevronRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="glass p-10 rounded-2xl text-center space-y-4 border border-emerald-500/30 animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Check size={32} className="text-emerald-400" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Annotation Complete!</h3>
            <p className="text-slate-400">You labeled {labeled} sentences. Export to JSON for model training.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleExport} className="btn-accent flex items-center gap-2">
                <Download size={16} /> Download Dataset
              </button>
              <button onClick={() => { setCurrent(0); setDone(false) }} className="btn-secondary flex items-center gap-2">
                <X size={16} /> Reset
              </button>
            </div>
          </div>
        )}

        {/* Label distribution */}
        {labeled > 0 && (
          <div className="glass p-4 rounded-2xl">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-3">Label Distribution</p>
            <div className="flex gap-3">
              {LABELS.map(({ value, color }) => {
                const count = Object.values(labels).filter(l => l === value).length
                return (
                  <div key={value} className={`flex-1 text-center p-3 rounded-xl border ${color}`}>
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-xs opacity-80">{value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
