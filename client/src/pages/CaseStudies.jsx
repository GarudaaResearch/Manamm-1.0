import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  Globe, Zap, Vote, Shield, AlertTriangle,
  ChevronRight, Lightbulb, TrendingUp, Brain,
  Eye, Scale, Users, Target, BookOpen
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const CASES = [
  {
    id: 'geopolitical',
    icon: Globe,
    title: '1. Geopolitical Conflict Analysis',
    subtitle: 'US – Iran – Israel | Real-Time Narrative Intelligence',
    color: 'from-red-500 to-orange-500',
    badge: '🌍 Global',
    badgeColor: 'bg-red-900/60 text-red-300 border-red-700/50',
    overview: `Geopolitical conflicts generate massive volumes of digital signals — 
leader tweets, state media broadcasts, UN statements, and citizen narratives. 
AI models can process these in real time to detect propaganda, track influence 
campaigns, and map how digital communication shapes global perception and policy decisions.`,
    keyAreas: [
      'Real-time monitoring of conflict-related social media signals',
      'AI sentiment analysis on leaders\' official communications',
      'Propaganda detection and counter-narrative mapping',
      'Influence network analysis across Twitter/X, Telegram, Reddit',
      'Timeline correlation: events → media narratives → public sentiment',
    ],
    aiTools: ['BERT-based multilingual NLP', 'Network graph analysis', 'Temporal sentiment tracking', 'Named Entity Recognition (NER)', 'Disinformation detection models'],
    codeExample: `# ── Geopolitical Narrative Tracking ────────────────────────────
import tweepy, torch
from transformers import pipeline

# Multi-class propaganda detection
nli_pipe = pipeline("zero-shot-classification",
    model="facebook/bart-large-mnli")

labels = ["propaganda","fact","opinion","diplomatic statement","threat"]

def classify_statement(text):
    result = nli_pipe(text, candidate_labels=labels, multi_label=True)
    top    = sorted(zip(result["labels"], result["scores"]),
                    key=lambda x: x[1], reverse=True)[:3]
    return {l: round(s, 3) for l, s in top}

stmt = "Our patience has limits. Any aggression will face decisive response."
print(classify_statement(stmt))
# -> {'threat': 0.89, 'diplomatic statement': 0.61, 'propaganda': 0.54}`,
    outcome: 'Students understand how AI-driven narrative analysis can reveal hidden geopolitical agendas and help policymakers respond faster to emerging threats.'
  },
  {
    id: 'energy',
    icon: Zap,
    title: '2. Energy Crisis in India (2026)',
    subtitle: 'Social Media Intelligence During Supply Disruptions',
    color: 'from-amber-500 to-yellow-500',
    badge: '⚡ National',
    badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
    overview: `India's 2026 energy supply disruptions — triggered by global conflict 
ripple effects — created a wave of public panic, misinformation, and policy criticism 
across social media. AI models can track how truth, rumor, and policy messaging compete 
in real time, enabling smarter crisis communication from government agencies.`,
    keyAreas: [
      'Public sentiment tracking during LPG/fuel shortages',
      'Misinformation spread modeling via network diffusion algorithms',
      'Policy communication effectiveness analysis',
      'Panic trend detection and early warning systems',
      'Impact of global conflicts on India\'s domestic energy discourse',
    ],
    aiTools: ['SIR epidemic model for misinformation spread', 'Time-series sentiment (LSTM)', 'Fake news detection (RoBERTa)', 'Graph-based influence propagation', 'Crisis NLP dashboards'],
    codeExample: `# ── Misinformation Spread Modeling (SIR + NLP) ─────────────────
import numpy as np
from scipy.integrate import odeint
from transformers import pipeline

# Fake news detector
fake_detector = pipeline("text-classification",
    model="hamzab/roberta-fake-news-classification")

def is_misinformation(text):
    result = fake_detector(text, truncation=True)[0]
    return result["label"] == "FAKE", round(result["score"], 3)

# SIR model for rumour spread
def sir_model(y, t, beta, gamma):
    S, I, R = y
    N       = S + I + R
    dS = -beta * S * I / N
    dI =  beta * S * I / N - gamma * I
    dR =  gamma * I
    return [dS, dI, dR]

# Simulate: 10M population, 1000 initial spreaders
N, I0    = 10_000_000, 1000
S0, R0   = N - I0, 0
beta, gamma = 0.35, 0.05   # tune from historical data
t        = np.linspace(0, 60, 60)   # 60 days
sol      = odeint(sir_model, [S0, I0, R0], t, args=(beta, gamma))
peak_day = int(sol[:,1].argmax())
print(f"Peak misinformation spread: Day {peak_day} | {sol[peak_day,1]/N:.1%} of population")`,
    outcome: 'Students learn to blend epidemiological models with NLP to predict, detect, and counter misinformation during national crises.'
  },
  {
    id: 'election',
    icon: Vote,
    title: '3. Tamil Nadu Assembly Election 2026',
    subtitle: 'Digital Campaign Analytics & Youth Influence Mapping',
    color: 'from-violet-500 to-purple-600',
    badge: '🗳️ Political',
    badgeColor: 'bg-violet-900/60 text-violet-300 border-violet-700/50',
    overview: `The Tamil Nadu Assembly Election 2026 represents one of India's most digitally 
contested elections — featuring AI-generated deepfakes, coordinated meme campaigns, 
hyper-targeted voter outreach, and real-time social media battles. 
Understanding AI's role in political communication is essential for 
democratic AI literacy.`,
    keyAreas: [
      'AI-driven political campaign analysis and message framing',
      'Deepfake detection in election-related video content',
      'Youth voter sentiment mapping via social media analytics',
      'Promise tracking: campaign commitments vs. post-election follow-up',
      'Drug narrative as political weapon: NLP analysis of party discourse',
    ],
    aiTools: ['Deepfake detection (FaceForensics++)', 'Political sentiment BERT fine-tuning', 'Voter segment clustering', 'Promise extraction (NER + IE)', 'Meme war impact analysis'],
    codeExample: `# ── Political Promise Extraction & Tracking ────────────────────
from transformers import pipeline
import re

# Information Extraction for political promises
ner  = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
zero = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

PROMISE_LABELS = ["campaign promise","policy announcement","past achievement","criticism"]
SECTORS = ["employment","agriculture","women safety","education","anti-drug","energy","healthcare"]

def analyse_political_statement(text):
    entities = [(e["word"], e["entity_group"]) for e in ner(text)]
    clf      = zero(text, candidate_labels=PROMISE_LABELS)
    sector   = zero(text, candidate_labels=SECTORS)
    return {
        "entities"      : entities,
        "statement_type": clf["labels"][0],
        "confidence"    : round(clf["scores"][0], 3),
        "sector"        : sector["labels"][0],
        "is_promise"    : clf["labels"][0] == "campaign promise"
    }

stmt = "We will provide free laptops and eradicate drug networks in all districts within 6 months."
result = analyse_political_statement(stmt)
print(result)
# -> {'statement_type': 'campaign promise', 'sector': 'education',
#     'is_promise': True, 'confidence': 0.94}`,
    outcome: 'Students develop critical AI literacy skills to analyse political communication, detect manipulation, and understand the ethical responsibilities of AI in democracy.'
  },
  {
    id: 'threat',
    icon: Shield,
    title: '4. Future Threat Intelligence in India',
    subtitle: 'Predictive AI for Social Media Risk & Radicalization',
    color: 'from-blue-500 to-cyan-600',
    badge: '🛡️ Security',
    badgeColor: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
    overview: `India's rapidly growing social media ecosystem creates new vectors for 
cyber threats, coordinated misinformation, and radicalization. Predictive AI systems 
can provide early warning signals by monitoring communication patterns, 
detecting anomalous network behavior, and flagging emerging risk clusters 
before they escalate into real-world incidents.`,
    keyAreas: [
      'Radicalization pathway detection via NLP + social graph analysis',
      'Cyber threat Actor profiling from open-source intelligence (OSINT)',
      'Predictive modeling of societal instability indicators',
      'Early warning systems using behavioral NLP',
      'Integration frameworks with national security policy thinking',
    ],
    aiTools: ['Graph Neural Networks (GNN)', 'Radicalization NLP (BERT)', 'Anomaly detection (Isolation Forest)', 'OSINT data pipelines', 'Temporal behavioral models'],
    codeExample: `# ── Radicalization Risk Score (NLP + Network Analysis) ──────────
import networkx as nx
from transformers import pipeline
import numpy as np

# Content-based radicalization detection
radical_pipe = pipeline("zero-shot-classification",
    model="facebook/bart-large-mnli")

RADICAL_LABELS = [
    "extremist content","hate speech","normal discourse",
    "political criticism","conspiracy theory"
]

def content_risk_score(text):
    result = radical_pipe(text, candidate_labels=RADICAL_LABELS)
    scores = dict(zip(result["labels"], result["scores"]))
    risk   = scores.get("extremist content",0)*0.5 + \
             scores.get("hate speech",0)*0.35      + \
             scores.get("conspiracy theory",0)*0.15
    return round(risk, 4)

# Network-based influence score (PageRank on follower graph)
def network_influence(G, user_id):
    pr = nx.pagerank(G, alpha=0.85)
    return round(pr.get(user_id, 0), 6)

# Combined threat score
def threat_score(text, G, user_id):
    content_risk = content_risk_score(text)
    net_influence= network_influence(G, user_id)
    combined     = 0.7 * content_risk + 0.3 * min(net_influence * 100, 1.0)
    level = "HIGH" if combined > 0.6 else "MODERATE" if combined > 0.3 else "LOW"
    return {"score": round(combined,4), "level": level,
            "content_risk": content_risk, "network_influence": net_influence}`,
    outcome: 'Students gain expertise in building responsible AI threat intelligence systems that balance national security with civil liberties and ethical AI principles.'
  },
  {
    id: 'drugs',
    icon: AlertTriangle,
    title: '5. Drug Distribution via Social Platforms',
    subtitle: 'AI Pattern Recognition in Student Ecosystem Risk Detection',
    color: 'from-rose-500 to-pink-600',
    badge: '⚠️ Social',
    badgeColor: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
    overview: `Drug distribution networks have migrated significantly to digital platforms, 
using coded language, encrypted messaging, and private groups to evade detection. 
AI pattern recognition can identify these hidden networks, detect coded lexicons, 
and flag behavioral anomalies — especially important within student ecosystems 
and educational institutions. This focus area is especially relevant in Tamil Nadu, 
where drug-related concerns have become a central electoral and social discourse issue.`,
    keyAreas: [
      'Coded language and slang detection using domain-adaptive NLP',
      'Anomalous behavioral pattern detection in social graphs',
      'Cross-platform signal correlation (Telegram, Instagram, WhatsApp)',
      'Student risk cluster identification in educational settings',
      'Policy-oriented AI recommendations for prevention and awareness',
    ],
    aiTools: ['Domain-adaptive BERT (slang/coded language)', 'Community detection (Louvain algorithm)', 'Anomaly detection in communication graphs', 'Cross-platform NLP pipelines', 'Risk cluster visualization'],
    codeExample: `# ── Drug Coded Language Detection + Network Analysis ────────────
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch, networkx as nx
from community import community_louvain

# Domain-adapted BERT for coded drug language detection
# Fine-tuned on annotated social media corpora
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

CODED_TERMS = {
    # Sample coded vocabulary (for research purposes)
    "party favors","snow","ice","green","plug","pack",
    "ship","drop","link","press"
}

def flag_coded_language(text):
    tokens    = text.lower().split()
    flagged   = [t for t in tokens if t in CODED_TERMS]
    risk      = len(flagged) / max(len(tokens), 1)
    return {
        "flagged_terms": flagged,
        "coded_ratio"  : round(risk, 4),
        "alert"        : risk > 0.08
    }

# Network-based community risk detection
def detect_risk_clusters(G):
    """
    Identify high-risk communities in social graph.
    G: NetworkX graph of user interactions.
    """
    partition    = community_louvain.best_partition(G)
    communities  = {}
    for node, comm_id in partition.items():
        communities.setdefault(comm_id, []).append(node)
    
    # Score each community by average coded language ratio
    risk_clusters= {}
    for comm_id, members in communities.items():
        member_scores = [G.nodes[m].get("coded_ratio", 0) for m in members]
        avg_risk      = sum(member_scores) / max(len(member_scores), 1)
        if avg_risk > 0.05:
            risk_clusters[comm_id] = {
                "members"        : len(members),
                "avg_coded_ratio": round(avg_risk, 4),
                "risk_level"     : "HIGH" if avg_risk > 0.1 else "MODERATE"
            }
    return risk_clusters`,
    outcome: 'Students learn to apply AI responsibly for social good — detecting harmful patterns in digital ecosystems while maintaining ethical standards, privacy considerations, and policy-oriented thinking.'
  },
]

const OUTCOMES = [
  { icon: TrendingUp, text: 'Real-time data analysis and decision-making under uncertainty' },
  { icon: Brain,      text: 'AI-driven intelligence modeling on live global datasets' },
  { icon: Scale,      text: 'Ethical AI and responsible data usage frameworks' },
  { icon: Target,     text: 'Policy-level thinking and AI-driven innovation' },
  { icon: Eye,        text: 'Exposure to live, high-impact global and national issues' },
  { icon: Users,      text: 'Collaborative problem solving in research teams' },
]

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(CASES[0].id)
  const [showCode,   setShowCode]   = useState(false)

  const current = CASES.find(c => c.id === activeCase) || CASES[0]
  const Icon    = current.icon

  return (
    <AppLayout title="Real-Time AI Case Studies & Intelligence Lab">
      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in" style={{ minHeight: 'calc(100vh - 120px)' }}>

        {/* ── Sidebar ───────────────────────────────────────── */}
        <div className="w-full lg:w-72 flex-shrink-0 glass rounded-2xl overflow-hidden flex flex-col border border-surface-border">
          <div className="p-4 border-b border-surface-border bg-surface-card">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={15} className="text-emerald-400" />
              <h2 className="font-display font-bold text-white text-sm">Intelligence Lab Cases</h2>
            </div>
            <p className="text-xs text-slate-400">Learning AI through Real-World Problems</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {CASES.map(({ id, title, icon: NavIcon, color }) => (
              <button
                key={id}
                onClick={() => { setActiveCase(id); setShowCode(false) }}
                className={clsx(
                  'w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between gap-2',
                  activeCase === id
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-hover border border-transparent'
                )}
              >
                <span className="flex items-center gap-2 overflow-hidden">
                  <NavIcon size={15} className={activeCase === id ? 'text-emerald-400 flex-shrink-0' : 'text-slate-500 flex-shrink-0'} />
                  <span className="truncate text-xs">{title.replace(/^\d+\.\s/, '')}</span>
                </span>
                {activeCase === id && <ChevronRight size={13} className="text-emerald-400 flex-shrink-0" />}
              </button>
            ))}
          </div>
          {/* Tagline */}
          <div className="p-4 border-t border-surface-border">
            <p className="text-xs text-center text-slate-500 italic">
              "Learning AI through Real-Time World Problems"
            </p>
            <p className="text-xs text-center text-emerald-400 font-semibold mt-1">ANJIT SCHOOL OF AI</p>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-16 pr-1 space-y-5">

          {/* Top Banner */}
          <div className="glass p-5 rounded-2xl border border-emerald-500/20"
            style={{ boxShadow: '0 0 30px rgba(16,185,129,0.06)' }}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">🎓 Real-Time AI Case Studies & Intelligence Lab</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-3xl">
                  At <span className="text-emerald-400 font-semibold">ANJIT SCHOOL OF AI</span>, we go beyond traditional learning by integrating 
                  live, real-world case studies into our curriculum — training students to analyze dynamic 
                  global and national scenarios using <span className="text-white font-medium">AI, data analytics, and social media intelligence.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Case Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              {/* Header Card */}
              <div className="glass p-7 rounded-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${current.color} opacity-5 blur-[120px] rounded-full pointer-events-none`} />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`min-w-[52px] min-h-[52px] rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${current.badgeColor}`}>
                          {current.badge}
                        </span>
                      </div>
                      <h1 className="font-display font-bold text-2xl text-white leading-tight">{current.title}</h1>
                      <p className="text-slate-400 text-sm mt-1 mb-4">{current.subtitle}</p>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{current.overview}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Areas + AI Tools */}
              <div className="grid xl:grid-cols-2 gap-5">
                {/* Key Study Areas */}
                <div className="glass p-5 rounded-2xl">
                  <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
                    <Target size={14} className="text-emerald-400" /> Key Study Areas
                  </h3>
                  <ul className="space-y-2.5">
                    {current.keyAreas.map((area, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className={`mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br ${current.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {i + 1}
                        </span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Tools Used */}
                <div className="glass p-5 rounded-2xl">
                  <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
                    <Brain size={14} className="text-violet-400" /> AI Tools & Techniques
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {current.aiTools.map((tool) => (
                      <span key={tool}
                        className="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-slate-200 font-medium hover:border-brand-500/40 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Learning Outcome */}
                  <div className="mt-5 p-4 rounded-xl bg-emerald-900/10 border border-emerald-700/20">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">📌 Learning Outcome</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="glass rounded-2xl overflow-hidden border border-surface-border">
                <div className="bg-surface-card px-4 py-3 border-b border-surface-border flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-1">
                      AI Implementation · Python
                    </span>
                  </div>
                  <button
                    onClick={() => setShowCode(v => !v)}
                    className={clsx(
                      'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                      showCode
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-surface-border text-slate-400 hover:text-white hover:border-emerald-600/50'
                    )}
                  >
                    {showCode ? '▼ Hide Code' : '▶ Show Code'}
                  </button>
                </div>
                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="overflow-x-auto bg-[#0d1117] p-5">
                        <pre className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
                          <code>{current.codeExample}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!showCode && (
                  <div className="bg-[#0d1117] px-5 py-3 text-xs text-slate-500 italic">
                    Click "Show Code" to view the Python implementation example →
                  </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* ── Learning Outcomes Section ────────────────── */}
          <div className="glass p-7 rounded-2xl border border-brand-700/20">
            <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-400" /> Program Learning Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OUTCOMES.map(({ icon: OIcon, text }) => (
                <div key={text} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-card border border-surface-border hover:border-brand-500/30 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500/20 transition-colors">
                    <OIcon size={15} className="text-brand-400" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div className="mt-6 text-center py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-900/30 to-emerald-900/30 border border-brand-700/20">
              <p className="font-display font-bold text-lg gradient-text">
                "Learning AI through Real-Time World Problems"
              </p>
              <p className="text-slate-400 text-sm mt-1">— ANJIT SCHOOL OF AI · Bengaluru, India</p>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}
