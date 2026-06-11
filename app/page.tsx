'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LandingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [dragging, setDragging] = useState(false)

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
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-25 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #db2777, transparent)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
        style={{ background: 'rgba(15,12,41,0.7)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-base font-black tracking-tight group-hover:text-violet-300 transition-colors"
            style={{ background: 'linear-gradient(135deg, #e2d9f3, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ResumeAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Pricing'].map((item) => (
            <a key={item} href="#" className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.4)' }}>
                👋 {session.user?.name}
              </span>
              <Link href="/dashboard"
                className="px-5 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Dashboard →
              </Link>
            </>
          ) : (
            <>
              <Link href="/login"
                className="px-4 py-2 text-sm rounded-xl transition-colors hover:bg-white/5"
                style={{ color: 'rgba(255,255,255,0.6)' }}>
                Login
              </Link>
              <Link href="/register"
                className="px-5 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-20">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10 text-xs font-semibold"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#c4b5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            ✨ Powered by Gemini AI · সম্পূর্ণ বাংলায়
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tight">
            তোমার Resume কে{' '}
            <br className="hidden md:block" />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Smarter
            </span>{' '}করো
          </h1>

          <p className="text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            Resume upload করো, Job Description দাও —<br />
            AI বলবে কোথায় improve করতে হবে।
          </p>

          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              handleUploadClick()
            }}
            onClick={handleUploadClick}
            className="relative cursor-pointer mx-auto max-w-2xl rounded-3xl p-12 mb-10 transition-all hover:scale-[1.02]"
            style={{
              background: dragging ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
              border: dragging ? '2px dashed #7c3aed' : '2px dashed rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="text-6xl mb-5">📄</div>
            <p className="text-lg font-bold mb-2">
              {session ? 'Resume drag করো অথবা click করো' : 'Resume upload করতে login করো'}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {session ? 'PDF format · সর্বোচ্চ 4MB · Gemini AI analyze করবে' : 'Click করলে login page এ যাবে'}
            </p>
            {!session && (
              <div className="mt-5 inline-block px-6 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                Login করো →
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="w-full sm:w-auto px-10 py-4 rounded-xl text-base font-bold transition-all hover:scale-105 hover:opacity-90 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>
              Free তে শুরু করো →
            </Link>
            <a href="#how-it-works"
              className="w-full sm:w-auto px-10 py-4 rounded-xl text-base font-medium transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}>
              কিভাবে কাজ করে?
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            {['✅ সম্পূর্ণ Free', '⚡ ৩০ সেকেন্ডে Analysis', '🔒 100% Private', '🇧🇩 বাংলায় Suggestions'].map((item) => (
              <span key={item} className="text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Mock card */}
        <div className="relative z-10 mt-24 w-full max-w-2xl mx-auto">
          <div className="rounded-3xl p-8 text-left shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>resume-analysis.tsx</span>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Overall Match Score</p>
                  <span className="text-5xl font-black" style={{
                    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>87%</span>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Status</p>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>
                    ✅ Strong Match
                  </span>
                </div>
              </div>
              <div className="w-full rounded-full h-2.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-2.5 rounded-full w-[87%]"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb, #60a5fa)' }} />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Skills', val: '92%', color: '#4ade80' },
                  { label: 'Experience', val: '78%', color: '#facc15' },
                  { label: 'Keywords', val: '85%', color: '#60a5fa' },
                  { label: 'Format', val: '95%', color: '#c084fc' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                    <div className="text-xl font-black" style={{ color: item.color }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <p className="text-sm" style={{ color: '#c4b5fd' }}>
                  💡 "React" keyword টা আরো ২ বার mention করলে score ৯২% এ যাবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '১০,০০০+', label: 'Resume Analyzed' },
            { num: '৯৫%', label: 'Accuracy Rate' },
            { num: '৩০s', label: 'Average Time' },
            { num: '১০০%', label: 'Free to Use' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black mb-2" style={{
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{stat.num}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
              কিভাবে কাজ করে
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-5">মাত্র ৩টি Step</h2>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>সহজ, দ্রুত, কার্যকর</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', icon: '📤', title: 'Resume Upload করো', desc: 'PDF format এ তোমার resume upload করো। আমরা automatically text extract করি।', color: 'rgba(124,58,237,0.2)', border: 'rgba(124,58,237,0.3)' },
              { num: '02', icon: '📋', title: 'Job Description দাও', desc: 'যে job এ apply করবে সেই job description paste করো। AI match করবে।', color: 'rgba(37,99,235,0.2)', border: 'rgba(37,99,235,0.3)' },
              { num: '03', icon: '🤖', title: 'AI Analysis পাও', desc: 'Gemini AI তোমার resume analyze করে score এবং specific suggestions দেবে।', color: 'rgba(219,39,119,0.2)', border: 'rgba(219,39,119,0.3)' },
            ].map((step, i) => (
              <div key={step.num} className="relative p-8 rounded-3xl transition-all hover:-translate-y-2"
                style={{ background: step.color, border: `1px solid ${step.border}` }}>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-2xl z-10"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>→</div>
                )}
                <div className="text-6xl font-black mb-2" style={{ color: 'rgba(255,255,255,0.06)' }}>{step.num}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">কেন ResumeAI?</h2>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>সব কিছু এক জায়গায়, সম্পূর্ণ বাংলায়</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: '⚡', title: 'Instant Analysis', desc: 'মাত্র ৩০ সেকেন্ডে পুরো resume analyze হয়। কোনো অপেক্ষা নেই।', color: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.2)', iconBg: 'rgba(250,204,21,0.15)' },
              { icon: '🎯', title: 'Job-specific Score', desc: 'প্রতিটি job এর জন্য আলাদা match score পাবে। Accurate এবং detailed।', color: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)', iconBg: 'rgba(124,58,237,0.15)' },
              { icon: '💡', title: 'Smart Suggestions', desc: 'কোন keyword missing, কোথায় improve করতে হবে — সব বাংলায় বলে দেয়।', color: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.2)', iconBg: 'rgba(37,99,235,0.15)' },
              { icon: '🔒', title: 'সম্পূর্ণ Private', desc: 'তোমার resume data শুধু তোমার কাছেই থাকে। কোনো third party নেই।', color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', iconBg: 'rgba(16,185,129,0.15)' },
              { icon: '📊', title: 'Detailed Breakdown', desc: 'Skills, Experience, Keywords, Format — প্রতিটা category আলাদাভাবে score পাবে।', color: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)', iconBg: 'rgba(244,114,182,0.15)' },
              { icon: '🇧🇩', title: 'বাংলায় Feedback', desc: 'সব suggestion বাংলায় পাবে। বুঝতে সহজ, implement করতে সহজ।', color: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)', iconBg: 'rgba(251,146,60,0.15)' },
            ].map((f) => (
              <div key={f.title} className="flex gap-5 p-6 rounded-2xl transition-all hover:-translate-y-1"
                style={{ background: f.color, border: `1px solid ${f.border}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: f.iconBg }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-0 rounded-3xl blur-[80px] opacity-25"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }} />
          <div className="relative p-16 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.3)', backdropFilter: 'blur(20px)' }}>
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-5xl font-black mb-5">আজই শুরু করো</h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Account বানাও, resume upload করো — সম্পূর্ণ free। কোনো credit card লাগবে না।
            </p>
            <Link href="/register"
              className="inline-block px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 50px rgba(124,58,237,0.4)' }}>
              Free Account বানাও →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-6xl mx-auto px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-base font-black"
                  style={{ background: 'linear-gradient(135deg, #e2d9f3, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ResumeAI
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                AI দিয়ে তোমার resume কে smarter করো। বাংলাদেশের job seekers দের জন্য তৈরি।
              </p>
              <div className="flex gap-3">
                {['𝕏', 'in', 'f', '▶'].map((icon) => (
                  <div key={icon} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-colors hover:bg-white/15"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Product</h4>
              <div className="space-y-3">
                {['Features', 'How it Works', 'Pricing', 'Changelog', 'Roadmap'].map((item) => (
                  <div key={item} className="text-sm transition-colors hover:text-white cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Company</h4>
              <div className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'].map((item) => (
                  <div key={item} className="text-sm transition-colors hover:text-white cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Legal</h4>
              <div className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'GDPR'].map((item) => (
                  <div key={item} className="text-sm transition-colors hover:text-white cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2025 ResumeAI · All rights reserved · Made with ❤️ in Bangladesh
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <span key={item} className="text-xs cursor-pointer hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}