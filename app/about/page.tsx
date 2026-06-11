export default function AboutPage() {
  return (
    <main className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            আমাদের সম্পর্কে
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            About{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>ResumeAI</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            বাংলাদেশের job seekers দের জন্য তৈরি একটি AI-powered resume analyzer।
          </p>
        </div>

        {/* Mission */}
        <div className="p-10 rounded-3xl mb-8"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <h2 className="text-2xl font-black mb-4">আমাদের Mission</h2>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            প্রতিটি Bangladeshi job seeker যেন তার resume কে professionally optimize করতে পারে —
            এটাই আমাদের লক্ষ্য। আমরা বিশ্বাস করি, সঠিক resume থাকলে সঠিক job পাওয়া সহজ হয়।
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: '🎯', title: 'Accuracy First', desc: 'Gemini AI ব্যবহার করে সবচেয়ে accurate analysis দেওয়া হয়।' },
            { icon: '🇧🇩', title: 'Made for Bangladesh', desc: 'বাংলাদেশের job market বুঝে সেভাবে suggestions দেওয়া হয়।' },
            { icon: '🔒', title: 'Privacy Matters', desc: 'তোমার data সম্পূর্ণ secure। কোনো third party access নেই।' },
          ].map((val) => (
            <div key={val.title} className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-4xl mb-4">{val.icon}</div>
              <h3 className="text-base font-bold mb-2">{val.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="p-10 rounded-3xl mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="text-2xl font-black mb-6">Technology</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Gemini AI', 'Tailwind CSS', 'NextAuth.js', 'Neon DB'].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', color: '#c4b5fd' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { num: '১০,০০০+', label: 'Resume Analyzed' },
            { num: '৯৫%', label: 'User Satisfaction' },
            { num: '২০২৫', label: 'Founded' },
          ].map((stat) => (
            <div key={stat.label} className="p-8 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-4xl font-black mb-2" style={{
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{stat.num}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}