'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LandingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleFile = (f: File) => {
    if (!session) {
      router.push('/login')
      return
    }
    if (f.type !== 'application/pdf') {
      alert('শুধু PDF file upload করো!')
      return
    }
    setFile(f)
    router.push('/resume/new')
  }

  const handleUploadClick = () => {
    if (!session) {
      router.push('/login')
      return
    }
    router.push('/resume/new')
  }

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #db2777, transparent)' }} />
        <div className="absolute bottom-[-10%] right-[20%] w-[450px] h-[450px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0891b2, transparent)' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(15, 12, 41, 0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            R
          </div>
          <span className="font-bold text-sm tracking-wide group-hover:text-violet-300 transition-colors">ResumeAI</span>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="text-xs text-white/40 mr-2">👋 {session.user?.name}</span>
              <Link href="/dashboard"
                className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                Login
              </Link>
              <Link href="/register"
                className="px-4 py-2 text-sm font-medium rounded-xl transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium"
            style={{ background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)', color: '#c4b5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            ✨ Powered by Gemini AI — সম্পূর্ণ বাংলায়
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            তোমার Resume কে{' '}
            <span className="relative">
              <span style={{
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Smarter
              </span>
            </span>
            {' '}করো
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Resume upload করো, Job Description দাও — AI বলবে কোথায় improve করতে হবে এবং কতটা match করছে।
          </p>

          {/* Upload Box — Hero তে */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              const f = e.dataTransfer.files[0]
              if (f) handleFile(f)
            }}
            onClick={handleUploadClick}
            className="relative cursor-pointer mx-auto max-w-xl rounded-2xl p-10 mb-8 transition-all"
            style={{
              background: dragging ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.03)',
              border: dragging ? '2px dashed #7c3aed' : '2px dashed rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-5xl mb-4">📄</div>
            <p className="text-base font-semibold mb-1">
              {session ? 'Resume drag করো অথবা click করো' : 'Resume upload করতে login করো'}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {session ? 'PDF format · সর্বোচ্চ 4MB' : 'Click করলে login page এ যাবে'}
            </p>
            {!session && (
              <div className="mt-4 inline-block px-5 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Login করো →
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Free তে শুরু করো →
            </Link>
            <a href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              কিভাবে কাজ করে?
            </a>
          </div>
        </div>

        {/* Floating mock card */}
        <div className="relative z-10 mt-20 w-full max-w-2xl mx-auto">
          <div className="rounded-2xl p-6 text-left shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>analysis-result.tsx</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Match Score</span>
                <span className="text-3xl font-black" style={{
                  background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>87%</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-2 rounded-full w-[87%]"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { label: 'Skills Match', val: '92%', color: '#4ade80' },
                  { label: 'Experience', val: '78%', color: '#facc15' },
                  { label: 'Keywords', val: '85%', color: '#60a5fa' },
                  { label: 'Format', val: '95%', color: '#c084fc' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                    <div className="text-xl font-bold" style={{ color: item.color }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <p className="text-xs" style={{ color: '#c4b5fd' }}>💡 "React" keyword টা আরো ২ বার mention করলে score বাড়বে।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
              কিভাবে কাজ করে
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">মাত্র ৩টি Step</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>সহজ, দ্রুত, কার্যকর</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Resume Upload করো', desc: 'PDF format এ তোমার resume upload করো। আমরা automatically text extract করি।', gradient: 'from-violet-600/20 to-violet-600/5', border: 'rgba(124,58,237,0.25)', glow: '#7c3aed' },
              { num: '02', title: 'Job Description দাও', desc: 'যে job এ apply করবে সেই job description paste করো।', gradient: 'from-blue-600/20 to-blue-600/5', border: 'rgba(37,99,235,0.25)', glow: '#2563eb' },
              { num: '03', title: 'AI Analysis পাও', desc: 'Gemini AI তোমার resume analyze করে score এবং specific suggestions দেবে।', gradient: 'from-pink-600/20 to-pink-600/5', border: 'rgba(219,39,119,0.25)', glow: '#db2777' },
            ].map((step) => (
              <div key={step.num} className={`relative p-7 rounded-2xl bg-gradient-to-b ${step.gradient} transition-all hover:-translate-y-1`}
                style={{ border: `1px solid ${step.border}` }}>
                <div className="text-5xl font-black mb-5" style={{ color: 'rgba(255,255,255,0.06)' }}>{step.num}</div>
                <h3 className="text-base font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">কেন ResumeAI?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Instant Analysis', desc: 'মাত্র কয়েক সেকেন্ডে পুরো resume analyze হয়।', color: 'rgba(250,204,21,0.1)', border: 'rgba(250,204,21,0.2)' },
              { icon: '🎯', title: 'Job-specific Score', desc: 'প্রতিটি job এর জন্য আলাদা match score পাবে।', color: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.2)' },
              { icon: '💡', title: 'Smart Suggestions', desc: 'কোন keyword missing সেটা সরাসরি বলে দেয়।', color: 'rgba(37,99,235,0.1)', border: 'rgba(37,99,235,0.2)' },
              { icon: '🔒', title: 'সম্পূর্ণ Private', desc: 'তোমার resume data শুধু তোমার কাছেই থাকে।', color: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: f.color, border: `1px solid ${f.border}` }}>
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <h3 className="text-sm font-bold mb-1">{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 rounded-3xl blur-[60px] opacity-30"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }} />
          <div className="relative p-14 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.3)', backdropFilter: 'blur(20px)' }}>
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">আজই শুরু করো</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Account বানাও, resume upload করো — সম্পূর্ণ free।
            </p>
            <Link href="/register"
              className="inline-block px-10 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Free Account বানাও →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>R</div>
          <span className="text-sm font-semibold">ResumeAI</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2025 ResumeAI · Built with Next.js + Gemini AI
        </p>
      </footer>
    </main>
  )
}