import AppLayout from '../components/AppLayout'
import {
  Brain, MapPin, Target, Eye, BookOpen, Mic, Lightbulb,
  Users, Award, Rocket, Globe, Building2, ChevronRight,
  GraduationCap, FlaskConical, Newspaper, Code2, Star
} from 'lucide-react'
import { motion } from 'framer-motion'

const OFFERINGS = [
  { icon: Brain,         title: 'AI & ML Training',       desc: 'Industry-oriented training in Artificial Intelligence, Machine Learning, Deep Learning, and Data Science.' },
  { icon: FlaskConical,  title: 'Workshops & Hackathons',  desc: 'Hands-on workshops, innovation hackathons, and real-world problem-solving programs.' },
  { icon: Newspaper,     title: 'IEEE Research Support',   desc: 'Expert guidance for research publications, IEEE paper writing, and academic contributions.' },
  { icon: Code2,         title: 'Live Project Deployment', desc: 'Real-time project development with full deployment exposure and industry pipelines.' },
  { icon: Rocket,        title: 'Startup Mentorship',      desc: 'Strategic mentorship for startups and AI-driven solution builders.' },
  { icon: GraduationCap, title: 'Academic Excellence',     desc: 'Structured programs for students, professionals, and researchers at every level.' },
]

const WHY_CHOOSE = [
  { icon: Target,  text: 'Practical, application-focused learning approach' },
  { icon: Globe,   text: 'Exposure to real-world datasets and AI challenges' },
  { icon: Award,   text: 'Expert mentorship and academic excellence' },
  { icon: Lightbulb, text: 'Strong focus on innovation, research, and entrepreneurship' },
  { icon: Building2, text: 'Located in Bengaluru — the Silicon Valley of India' },
  { icon: Users,   text: 'Diverse community of learners, researchers, and innovators' },
]

const STATS = [
  { label: 'Students Trained', value: '500+' },
  { label: 'Research Papers',  value: '30+' },
  { label: 'Live Projects',    value: '80+' },
  { label: 'Mentors',          value: '20+' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})

export default function AboutSchool() {
  return (
    <AppLayout title="About · ANJIT SCHOOL OF AI">
      <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-fade-in">

        {/* ── Hero Banner ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}
          className="glass rounded-3xl p-10 relative overflow-hidden border border-brand-700/30"
          style={{ boxShadow: '0 0 60px rgba(99,102,241,0.10)' }}
        >
          {/* Background glow blobs */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-brand-600 to-purple-700 opacity-10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-br from-violet-600 to-fuchsia-700 opacity-8 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Logo / Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-2xl flex-shrink-0"
              style={{ boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
              <Brain size={40} className="text-white" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-700/50 text-xs text-brand-300 mb-3">
                <Star size={11} className="text-amber-400" />
                AI Innovation & Training Hub · Bengaluru, India
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text leading-tight">
                ANJIT SCHOOL OF AI
              </h1>
              <p className="text-slate-400 text-base mt-2 max-w-2xl leading-relaxed">
                A forward-thinking institution dedicated to advancing knowledge and innovation in 
                Artificial Intelligence, Machine Learning, and emerging technologies.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 relative z-10">
            {STATS.map(({ label, value }) => (
              <div key={label} className="bg-surface-card/80 rounded-2xl p-4 text-center border border-surface-border">
                <p className="font-display font-bold text-3xl gradient-text">{value}</p>
                <p className="text-slate-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5">
          <motion.div {...fadeUp(0.1)} className="glass p-7 rounded-2xl border border-brand-700/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-500 to-purple-600 opacity-5 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <Target size={20} className="text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              To <span className="text-brand-300 font-semibold">democratize Artificial Intelligence education</span> by 
              making high-quality, industry-relevant learning accessible to students, innovators, 
              and professionals across diverse backgrounds.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="glass p-7 rounded-2xl border border-violet-700/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-5 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-white">Our Vision</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              To become a <span className="text-violet-300 font-semibold">leading AI innovation and training hub in India</span>, 
              fostering next-generation technologists, researchers, and entrepreneurs who can 
              solve real-world challenges using AI-driven solutions.
            </p>
          </motion.div>
        </div>

        {/* ── What We Offer ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.2)}>
          <div className="text-center mb-7">
            <h2 className="font-display font-bold text-3xl text-white">What We Offer</h2>
            <p className="text-slate-400 text-sm mt-2">Comprehensive AI education from fundamentals to cutting-edge research.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                className="glass glass-hover p-6 rounded-2xl group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Why Choose Us ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.3)} className="glass p-8 rounded-3xl border border-emerald-700/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Award size={20} className="text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Why Choose Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {WHY_CHOOSE.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-700/40 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon size={16} className="text-emerald-400" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Address Card ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.4)} className="glass p-8 rounded-3xl border border-amber-700/20 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-gradient-to-br from-amber-500 to-orange-600 opacity-5 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
            {/* Map Pin */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl"
                style={{ boxShadow: '0 0 30px rgba(245,158,11,0.25)' }}>
                <MapPin size={28} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-2xl text-white mb-1">Our Location</h2>
              <p className="text-amber-400 text-sm font-medium mb-4">Bengaluru — Silicon Valley of India 🇮🇳</p>
              <div className="bg-surface-card rounded-2xl p-5 border border-surface-border inline-block">
                <p className="font-display font-bold text-white text-lg">ANJIT SCHOOL OF AI</p>
                <div className="mt-2 space-y-1 text-sm text-slate-300">
                  <p>Begur – Koppa Road, Suraksha Nagar</p>
                  <p>Akshaya Vana, Akshayanagar</p>
                  <p className="text-amber-300 font-medium">Bengaluru, Karnataka, India</p>
                </div>
              </div>

              {/* Directions button */}
              <a
                href="https://maps.google.com/?q=Akshaya+Vana+Akshayanagar+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors group"
              >
                <MapPin size={15} />
                Get Directions
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Connect Banner ───────────────────────────────────── */}
        <motion.div {...fadeUp(0.5)}
          className="glass p-8 rounded-3xl text-center border border-brand-700/30 relative overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(99,102,241,0.08)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 to-purple-900/20 rounded-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl"
              style={{ boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}>
              <Rocket size={28} className="text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Built with E-Manam · Powered by ANJIT SCHOOL OF AI
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
              E-Manam is a flagship research product of ANJIT SCHOOL OF AI — developed to advance 
              multilingual sentiment analysis and mental health AI across English, Tamil, and Malayalam.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Sentiment Analysis','Mental Health AI','NLP Research','Tamil NLP','Malayalam NLP','Suicide Prevention AI','IEEE Research'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-brand-900/60 text-brand-300 text-xs border border-brand-700/50 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </AppLayout>
  )
}
