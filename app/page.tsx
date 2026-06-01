import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            R
          </div>
          <span className="font-semibold text-sm tracking-wide">ResumeAI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Powered by Gemini AI
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            তোমার Resume কে{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Smarter
            </span>{" "}
            করো
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Resume upload করো, Job Description দাও — AI তোমাকে বলবে কোথায়
            কোথায় improve করতে হবে এবং কতটা match করছো।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
            >
              Free তে শুরু করো →
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all"
            >
              কিভাবে কাজ করে?
            </Link>
          </div>
        </div>

        {/* Mock UI card */}
        <div className="relative z-10 mt-20 w-full max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-left shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-white/30">analysis-result.tsx</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Match Score</span>
                <span className="text-2xl font-bold text-violet-400">87%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2 rounded-full w-[87%]" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { label: "Skills Match", val: "92%", color: "text-green-400" },
                  { label: "Experience", val: "78%", color: "text-yellow-400" },
                  { label: "Keywords", val: "85%", color: "text-blue-400" },
                  { label: "Format", val: "95%", color: "text-violet-400" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 rounded-lg p-3 border border-white/5"
                  >
                    <div className="text-xs text-white/40 mb-1">{item.label}</div>
                    <div className={`text-lg font-semibold ${item.color}`}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <p className="text-xs text-violet-300">
                  💡 "React" keyword টা আরো ২ বার mention করলে score বাড়বে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              মাত্র ৩টি Step
            </h2>
            <p className="text-white/40 text-sm">সহজ, দ্রুত, কার্যকর</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Resume Upload করো",
                desc: "PDF format এ তোমার resume upload করো। আমরা automatically text extract করি।",
                color: "from-violet-500/20 to-violet-500/5",
                border: "border-violet-500/20",
              },
              {
                num: "02",
                title: "Job Description দাও",
                desc: "যে job এ apply করবে সেই job description paste করো।",
                color: "from-indigo-500/20 to-indigo-500/5",
                border: "border-indigo-500/20",
              },
              {
                num: "03",
                title: "AI Analysis পাও",
                desc: "Gemini AI তোমার resume analyze করে score এবং specific suggestions দেবে।",
                color: "from-blue-500/20 to-blue-500/5",
                border: "border-blue-500/20",
              },
            ].map((step) => (
              <div
                key={step.num}
                className={`relative p-6 rounded-2xl bg-gradient-to-b ${step.color} border ${step.border}`}
              >
                <div className="text-4xl font-black text-white/10 mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">কেন ResumeAI?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "⚡", title: "Instant Analysis", desc: "মাত্র কয়েক সেকেন্ডে পুরো resume analyze হয়।" },
              { icon: "🎯", title: "Job-specific Score", desc: "প্রতিটি job এর জন্য আলাদা match score পাবে।" },
              { icon: "💡", title: "Smart Suggestions", desc: "কোন keyword missing সেটা সরাসরি বলে দেয়।" },
              { icon: "🔒", title: "সম্পূর্ণ Private", desc: "তোমার resume data শুধু তোমার কাছেই থাকে।" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
              >
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-[60px]" />
          <div className="relative p-12 rounded-3xl border border-violet-500/20 bg-violet-500/5">
            <h2 className="text-3xl font-bold mb-4">
              আজই শুরু করো
            </h2>
            <p className="text-white/40 text-sm mb-8">
              Account বানাও, resume upload করো — সম্পূর্ণ free।
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Free Account বানাও →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-xs text-white/20">
          © 2025 ResumeAI · Built with Next.js + Gemini AI
        </p>
      </footer>
    </main>
  );
}