import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

function ScoreRing({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        <circle cx="80" cy="80" r={radius} fill="none" stroke="url(#grad)" strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <div className="text-4xl font-black text-white">{score}</div>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>/ 100</div>
      </div>
    </div>
  )
}

export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const resume = await prisma.resume.findFirst({
   where: { id: id, userId: session.user.id },
    include: {
      analyses: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  })

  if (!resume) notFound()
  const analysis = resume.analyses[0]
  const analysisData = analysis?.suggestions as any

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(15,12,41,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>R</div>
          <span className="font-bold text-sm group-hover:text-violet-300 transition-colors">ResumeAI</span>
        </Link>
        <Link href="/dashboard" className="text-xs transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.3)' }}>← Dashboard</Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            ✨ Gemini AI Analysis
          </div>
          <h1 className="text-3xl font-black mb-2">{resume.title}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {new Date(resume.createdAt).toLocaleDateString('bn-BD')} · AI দিয়ে analyze করা হয়েছে
          </p>
        </div>

        {!analysis ? (
          <div className="text-center py-24 rounded-2xl"
            style={{ border: '2px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-lg font-bold mb-2">এখনো Analyze হয়নি</h3>
            <Link href="/resume/new"
              className="inline-block mt-4 px-8 py-3 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              নতুন Resume Upload করো
            </Link>
          </div>
        ) : (
          <>
            {analysisData?.summary && (
              <div className="mb-6 p-5 rounded-2xl"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#c4b5fd' }}>💬 {analysisData.summary}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-8 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Overall Match Score</p>
                <ScoreRing score={analysis.score} />
                <p className="text-sm mt-6 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {analysis.score >= 80 ? '🎉 দারুণ! এই job এর জন্য তুমি ভালো candidate।'
                    : analysis.score >= 60 ? '👍 মোটামুটি ভালো, কিছুটা improve করলে আরো ভালো হবে।'
                    : '⚠️ Resume টা আরো improve করা দরকার।'}
                </p>
              </div>

              <div className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 className="text-sm font-semibold mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Score Breakdown</h2>
                <div className="space-y-5">
                  {[
                    { label: 'Skills Match', value: analysisData?.breakdown?.skills, color: '#4ade80' },
                    { label: 'Experience', value: analysisData?.breakdown?.experience, color: '#facc15' },
                    { label: 'Keywords', value: analysisData?.breakdown?.keywords, color: '#60a5fa' },
                    { label: 'Format & Structure', value: analysisData?.breakdown?.format, color: '#c084fc' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>{item.value ?? '—'}%</span>
                      </div>
                      <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${item.value ?? 0}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {analysis.jobDesc && (
              <div className="mb-6 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>যে Job Description এর সাথে match করা হয়েছে</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{analysis.jobDesc}</p>
              </div>
            )}

            <div>
              <h2 className="text-base font-bold mb-4">AI এর Suggestions</h2>
              <div className="space-y-3">
                {(analysisData?.suggestions || []).map((s: any, i: number) => {
                  const styles: Record<string, any> = {
                    warning: { bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.2)', icon: '⚠️', color: '#fef08a' },
                    success: { bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)', icon: '✅', color: '#bbf7d0' },
                    info: { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', icon: '💡', color: '#bfdbfe' },
                  }
                  const style = styles[s.type] || styles.info
                  return (
                    <div key={i} className="flex gap-3 p-4 rounded-xl"
                      style={{ background: style.bg, border: `1px solid ${style.border}` }}>
                      <span className="text-base flex-shrink-0">{style.icon}</span>
                      <p className="text-sm leading-relaxed" style={{ color: style.color }}>{s.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 mt-10">
              <Link href="/resume/new"
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                নতুন Resume Analyze করো
              </Link>
              <Link href="/dashboard"
                className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                Dashboard এ যাও
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}