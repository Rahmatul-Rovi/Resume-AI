'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend connect করলে এখানে API call হবে
    setSent(true)
  }

  return (
    <main className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            যোগাযোগ করো
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Contact <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Us</span></h1>
          <p className="text-xl max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            কোনো প্রশ্ন বা সমস্যা? আমরা সাহায্য করতে ready।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: '📧', title: 'Email', value: 'hello@resumeai.com', desc: 'সাধারণত ২৪ ঘণ্টার মধ্যে reply করা হয়।' },
              { icon: '💬', title: 'Live Chat', value: 'Available 9AM - 6PM', desc: 'সরাসরি chat করো আমাদের সাথে।' },
              { icon: '📍', title: 'Location', value: 'Dhaka, Bangladesh', desc: 'আমরা বাংলাদেশ থেকে operate করি।' },
              { icon: '🐦', title: 'Twitter / X', value: '@resumeai_bd', desc: 'Quick response এর জন্য Twitter এ DM করো।' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                  <p className="text-sm font-medium mb-1" style={{ color: '#c4b5fd' }}>{item.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="p-8 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {sent ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-5">✅</div>
                <h3 className="text-2xl font-black mb-3">Message পাঠানো হয়েছে!</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  আমরা শীঘ্রই reply করবো।
                </p>
                <button onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                  আবার পাঠাও
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black mb-6">Message পাঠাও</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>নাম</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="তোমার নাম"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Enter Your Email"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Subject</label>
                    <input type="text" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="কিসের বিষয়ে লিখছো?"
                      className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Message</label>
                    <textarea rows={5} required value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="তোমার message লেখো..."
                      className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <button type="submit"
                    className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                    Message পাঠাও →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}