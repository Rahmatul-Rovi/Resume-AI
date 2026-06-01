'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password কমপক্ষে ৬ character হতে হবে।')
      return
    }

    setLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'কিছু একটা সমস্যা হয়েছে।')
    } else {
      router.push('/login?registered=true')
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-700/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            R
          </div>
          <span className="font-semibold text-white">ResumeAI</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Account বানাও</h1>
          <p className="text-sm text-white/40 mb-8">সম্পূর্ণ free, কোনো credit card লাগবে না</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">
                তোমার নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 character"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Account বানানো হচ্ছে...
                </span>
              ) : (
                'Register করো →'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-6">
            Account আছে?{' '}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
              Login করো
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link href="/" className="text-xs text-white/20 hover:text-white/40 transition-colors">
            ← Home এ ফিরে যাও
          </Link>
        </p>
      </div>
    </main>
  )
}