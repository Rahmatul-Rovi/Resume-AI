
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null)
    return (
      <span className="text-xs px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
        Analyzed হয়নি
      </span>
    )
  const style =
    score >= 80
      ? { background: 'rgba(74,222,128,0.1)', color: '#4ade80' }
      : score >= 60
      ? { background: 'rgba(250,204,21,0.1)', color: '#facc15' }
      : { background: 'rgba(248,113,113,0.1)', color: '#f87171' }
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={style}>
      {score}% match
    </span>
  )
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      analyses: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  const analyzedResumes = resumes.filter((r) => r.analyses.length > 0)
  const avgScore =
    analyzedResumes.length > 0
      ? Math.round(
          analyzedResumes.reduce((a, b) => a + b.analyses[0].score, 0) /
            analyzedResumes.length
        )
      : null
  const bestScore =
    analyzedResumes.length > 0
      ? Math.max(...analyzedResumes.map((r) => r.analyses[0].score))
      : null

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(15,12,41,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            R
          </div>
          <span className="font-bold text-sm group-hover:text-violet-300 transition-colors">ResumeAI</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {session.user.name}
            </span>
          </div>
          <LogoutButton />
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black mb-1">
              স্বাগতম, {session.user.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              তোমার সব resume এক জায়গায়
            </p>
          </div>
          <Link href="/resume/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            <span>+</span>
            <span>নতুন Resume</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              label: 'মোট Resume',
              value: resumes.length,
              icon: '📄',
              color: 'rgba(124,58,237,0.15)',
              border: 'rgba(124,58,237,0.25)',
              textColor: '#a78bfa'
            },
            {
              label: 'Average Score',
              value: avgScore ? `${avgScore}%` : '—',
              icon: '📊',
              color: 'rgba(37,99,235,0.15)',
              border: 'rgba(37,99,235,0.25)',
              textColor: '#60a5fa'
            },
            {
              label: 'Best Score',
              value: bestScore ? `${bestScore}%` : '—',
              icon: '🏆',
              color: 'rgba(16,185,129,0.15)',
              border: 'rgba(16,185,129,0.25)',
              textColor: '#34d399'
            },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: stat.color, border: `1px solid ${stat.border}` }}>
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: stat.textColor }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Resume list */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {resumes.length > 0 ? `${resumes.length}টা Resume` : 'Resume গুলো'}
          </h2>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-24 rounded-2xl"
            style={{ border: '2px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-bold mb-2">কোনো Resume নেই</h3>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              প্রথম resume upload করো, AI analyze করবে
            </p>
            <Link href="/resume/new"
              className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Upload করো →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => {
              const lastScore = resume.analyses.length > 0 ? resume.analyses[0].score : null
              return (
                <Link href={`/resume/${resume.id}`} key={resume.id}>
                  <div className="flex items-center justify-between p-5 rounded-2xl transition-all hover:-translate-y-0.5 group cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                   >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
                        📄
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1">{resume.title}</h3>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {new Date(resume.createdAt).toLocaleDateString('bn-BD')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ScoreBadge score={lastScore} />
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-all"
                        style={{ color: '#a78bfa' }}>
                        দেখো →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}