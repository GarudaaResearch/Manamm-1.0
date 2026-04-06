import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { FlaskConical, Play, RotateCcw, Download, CheckCircle, Loader2 } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const MODELS = ['IndicBERT', 'MuRIL', 'BERT', 'DistilBERT', 'LSTM', 'SVM', 'Logistic Regression', 'VADER']
const PREPROCESS = ['Remove URLs', 'Remove Emojis', 'Stopword Removal', 'Stemming/Lemmatization', 'Transliteration', 'Lowercase']
const DATASETS  = ['RCAS Student Feedback', 'Twitter Campus Scrape', 'YouTube Comments (Malayalam)', 'WhatsApp Export Sample', 'Custom Upload']

function mockResult() {
  const base = 70 + Math.random() * 25
  return {
    accuracy:  parseFloat(base.toFixed(2)),
    precision: parseFloat((base - 2 + Math.random() * 4).toFixed(2)),
    recall:    parseFloat((base - 3 + Math.random() * 5).toFixed(2)),
    f1:        parseFloat((base - 1 + Math.random() * 3).toFixed(2)),
    support:   Math.floor(Math.random() * 800) + 200,
    confusion: [[Math.floor(Math.random()*400+100), Math.floor(Math.random()*60), Math.floor(Math.random()*40)],
                [Math.floor(Math.random()*50), Math.floor(Math.random()*300+80), Math.floor(Math.random()*40)],
                [Math.floor(Math.random()*30), Math.floor(Math.random()*30), Math.floor(Math.random()*200+60)]],
  }
}

const STEPS = ['Uploading dataset…', 'Preprocessing text…', 'Tokenizing…', 'Loading model…', 'Training / Evaluating…', 'Computing metrics…', 'Done!']

export default function ExperimentLab() {
  const [model, setModel]         = useState('IndicBERT')
  const [dataset, setDataset]     = useState('RCAS Student Feedback')
  const [steps, setSteps]         = useState([])
  const [running, setRunning]     = useState(false)
  const [result, setResult]       = useState(null)
  const [progress, setProgress]   = useState(0)
  const [expName, setExpName]     = useState('')

  const handleRun = async () => {
    setRunning(true); setResult(null); setProgress(0); setSteps([])
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400))
      setSteps(prev => [...prev, STEPS[i]])
      setProgress(Math.round(((i + 1) / STEPS.length) * 100))
    }
    setResult(mockResult())
    setRunning(false)
  }

  const radarData = result ? [
    { metric: 'Accuracy',  value: result.accuracy  },
    { metric: 'Precision', value: result.precision },
    { metric: 'Recall',    value: result.recall    },
    { metric: 'F1 Score',  value: result.f1        },
  ] : []

  return (
    <AppLayout title="Experiment Lab">
      <div className="max-w-5xl mx-auto space-y-5 animate-fade-in">

        {/* Config card */}
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-5">
            <FlaskConical size={20} className="text-purple-400" />
            <h2 className="font-semibold text-white">Experiment Configuration</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Experiment Name</label>
              <input className="input-field" placeholder="My Sentiment Experiment #1" value={expName} onChange={e => setExpName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Dataset</label>
              <select className="input-field" value={dataset} onChange={e => setDataset(e.target.value)}>
                {DATASETS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Model</label>
              <select className="input-field" value={model} onChange={e => setModel(e.target.value)}>
                {MODELS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs text-slate-400 mb-2 block font-medium">Preprocessing Steps</label>
            <div className="flex flex-wrap gap-2">
              {PREPROCESS.map(s => <label key={s} className="flex items-center gap-2 text-xs text-slate-300 glass px-3 py-1.5 rounded-xl cursor-pointer hover:border-brand-600 transition-colors">
                <input type="checkbox" defaultChecked className="accent-brand-500" />{s}
              </label>)}
            </div>
          </div>

          <div className="flex gap-3">
            <button id="run-experiment" onClick={handleRun} disabled={running} className="btn-primary flex items-center gap-2">
              {running ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              {running ? 'Running…' : 'Run Experiment'}
            </button>
            <button onClick={() => { setResult(null); setSteps([]); setProgress(0) }} className="btn-secondary flex items-center gap-2">
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* Progress */}
        {(running || steps.length > 0) && (
          <div className="glass p-5 rounded-2xl space-y-3 animate-slide-up">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white font-medium">Running: {model} on {dataset}</span>
              <span className="text-brand-400 font-bold">{progress}%</span>
            </div>
            <div className="progress-bar h-3">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle size={12} className="text-emerald-400" /> {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !running && (
          <div className="grid sm:grid-cols-2 gap-5 animate-slide-up">
            {/* Metrics */}
            <div className="glass p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">Evaluation Metrics</h3>
                <button className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5"><Download size={13} /> Export</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Accuracy',  value: result.accuracy  },
                  { label: 'Precision', value: result.precision },
                  { label: 'Recall',    value: result.recall    },
                  { label: 'F1 Score',  value: result.f1        },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface-hover rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="text-2xl font-bold text-white">{value.toFixed(1)}<span className="text-sm text-slate-400">%</span></p>
                    <div className="progress-bar mt-2 h-1.5">
                      <div className="progress-fill" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Evaluated on {result.support} samples</p>
            </div>

            {/* Radar chart */}
            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-white text-sm mb-2">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[60, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
                  <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} formatter={v => v.toFixed(1) + '%'} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Confusion Matrix */}
            <div className="glass p-5 rounded-2xl sm:col-span-2">
              <h3 className="font-semibold text-white text-sm mb-4">Confusion Matrix</h3>
              <div className="grid gap-1 max-w-xs">
                {['Positive','Negative','Neutral'].map((actual, ri) => (
                  <div key={actual} className="flex gap-1 items-center">
                    <span className="text-xs text-slate-500 w-20 text-right pr-2">{actual}</span>
                    {result.confusion[ri].map((val, ci) => (
                      <div key={ci} className="w-16 h-12 flex items-center justify-center rounded-lg text-sm font-bold"
                        style={{ background: `rgba(99,102,241,${ri === ci ? 0.6 : 0.1})`, color: ri === ci ? '#fff' : '#64748b' }}>
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex gap-1 mt-1">
                  <div className="w-24" />
                  {['Positive','Negative','Neutral'].map(l => (
                    <div key={l} className="w-16 text-center text-xs text-slate-500">{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
