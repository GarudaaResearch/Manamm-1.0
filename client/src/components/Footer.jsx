import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-border bg-surface-card/50">
      <div className="px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} <span className="text-slate-300 font-medium">E-Manam</span> — Multilingual Sentiment Analysis Research Platform
        </p>
        <a
          href="https://www.linkedin.com/in/profanjitraja/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium"
        >
          Theme &amp; Developed by <span className="font-semibold">Prof. Anjit Raja R</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </footer>
  )
}
