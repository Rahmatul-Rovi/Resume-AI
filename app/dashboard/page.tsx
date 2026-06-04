import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null)
    return (
      <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
        Analyzed হয়নি
      </span>
    )
  const color =
    score >= 80
      ? 'text-green-400 bg-green-400/10'
      : score >= 60
      ? 'text-yellow-400 bg-yellow-400/10'
      : 'text-red-400 bg-red-400/10'
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
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
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            R
          </div>
          <span className="font-semibold text-sm">ResumeAI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/40">
            স্বাগতম, {session.user.name} 👋
          </span>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold mb-1">তোমার Resumes</h1>
            <p className="text-sm text-white/40">{resumes.length}টা resume আছে</p>
          </div>
          <Link
            href="/resume/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            <span>+</span>
            <span>নতুন Resume</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'মোট Resume', value: resumes.length },
            { label: 'Average Score', value: avgScore ? `${avgScore}%` : '—' },
            { label: 'Best Score', value: bestScore ? `${bestScore}%` : '—' },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-xl border border-white/5 bg-white/3">
              <div className="text-2xl font-bold text-violet-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium mb-2">কোনো Resume নেই</h3>
            <p className="text-sm text-white/40 mb-6">প্রথম resume upload করো</p>
            <Link href="/resume/new" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-colors">
              Upload করো
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => {
              const lastScore = resume.analyses.length > 0 ? resume.analyses[0].score : null
              return (
                <div key={resume.id} className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">📄</div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">{resume.title}</h3>
                      <p className="text-xs text-white/30">{new Date(resume.createdAt).toLocaleDateString('bn-BD')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ScoreBadge score={lastScore} />
                    <Link href={`/resume/${resume.id}`} className="text-xs text-violet-400 hover:text-violet-300 opacity-0 group-hover:opacity-100 transition-all">
                      দেখো →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}