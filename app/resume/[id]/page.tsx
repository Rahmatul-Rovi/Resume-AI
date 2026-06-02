'use client'

import Link from 'next/link'

// Dummy data — backend connect হলে real data আসবে
const dummyAnalysis = {
  title: 'Software Engineer Resume',
  score: 87,
  createdAt: '2025-01-28',
  breakdown: [
    { label: 'Skills Match', score: 92, color: 'bg-green-500' },
    { label: 'Experience', score: 78, color: 'bg-yellow-500' },
    { label: 'Keywords', score: 85, color: 'bg-blue-500' },
    { label: 'Format & Structure', score: 95, color: 'bg-violet-500' },
  ],
  suggestions: [
    {
      type: 'warning',
      text: '"React" keyword টা আরো ২ বার mention করলে score বাড়বে।',
    },
    {
      type: 'warning',
      text: 'Experience section এ quantifiable result যোগ করো (যেমন: "৩০% performance বাড়িয়েছি")।',
    },
    {
      type: 'success',
      text: 'Skills section টা জব description এর সাথে ভালোভাবে match করছে।',
    },
    {
      type: 'success',
      text: 'Resume এর format এবং structure professional মনে হচ্ছে।',
    },
    {
      type: 'info',
      text: 'একটা GitHub link যোগ করলে recruiter এর কাছে ভালো impression হবে।',
    },
  ],
  jobDesc: 'Frontend Developer at a tech company requiring React, TypeScript, and Node.js experience.',
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={radius} fill="none"
          stroke="url(#grad)" strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <div className="text-3xl font-black text-white">{score}</div>
        <div className="text-xs text-white/40">/ 100</div>
      </div>
    </div>
  )
}

export default function AnalysisPage() {
  const analysis = dummyAnalysis

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            R
          </div>
          <span className="font-semibold text-sm">ResumeAI</span>
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Dashboard
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-1">{analysis.title}</h1>
          <p className="text-sm text-white/30">{analysis.createdAt} · Gemini AI দিয়ে analyze করা হয়েছে</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score card */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/3 flex flex-col items-center justify-center">
            <p className="text-xs text-white/40 mb-6 uppercase tracking-widest">Overall Match Score</p>
            <ScoreRing score={analysis.score} />
            <p className="text-sm text-white/50 mt-6 text-center">
              {analysis.score >= 80
                ? '🎉 দারুণ! এই job এর জন্য তুমি ভালো candidate।'
                : analysis.score >= 60
                ? '👍 মোটামুটি ভালো, কিছুটা improve করলে আরো ভালো হবে।'
                : '⚠️ Resume টা আরো improve করা দরকার।'}
            </p>
          </div>

          {/* Breakdown */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
            <h2 className="text-sm font-medium text-white/60 mb-6">Score Breakdown</h2>
            <div className="space-y-5">
              {analysis.breakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">{item.label}</span>
                    <span className="text-sm font-semibold">{item.score}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div
                      className={`${item.color} h-1.5 rounded-full transition-all`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job description used */}
        {analysis.jobDesc && (
          <div className="mb-6 p-4 rounded-xl border border-white/5 bg-white/3">
            <p className="text-xs text-white/30 mb-1">যে Job Description এর সাথে match করা হয়েছে</p>
            <p className="text-sm text-white/50">{analysis.jobDesc}</p>
          </div>
        )}

        {/* Suggestions */}
        <div>
          <h2 className="text-base font-semibold mb-4">AI এর Suggestions</h2>
          <div className="space-y-3">
            {analysis.suggestions.map((s, i) => {
              const styles = {
                warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: '⚠️', text: 'text-yellow-200' },
                success: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: '✅', text: 'text-green-200' },
                info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: '💡', text: 'text-blue-200' },
              }
              const style = styles[s.type as keyof typeof styles]
              return (
                <div
                  key={i}
                  className={`flex gap-3 p-4 rounded-xl border ${style.bg} ${style.border}`}
                >
                  <span className="text-base">{style.icon}</span>
                  <p className={`text-sm ${style.text} leading-relaxed`}>{s.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-10">
          <Link
            href="/resume/new"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            নতুন Resume Analyze করো
          </Link>
          <button className="px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all">
            PDF Download করো
          </button>
        </div>
      </main>
    </div>
  )
}