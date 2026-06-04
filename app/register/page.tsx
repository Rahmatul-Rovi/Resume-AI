'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'nav/link'

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

    try {
      // Step 1: Register
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'কিছু একটা সমস্যা হয়েছে।')
        setLoading(false)
        return
      }

      // Step 2: Auto login
      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (loginRes?.error) {
        router.push('/login')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('কোথাও একটা সমস্যা হয়েছে। আবার চেষ্টা করো।')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft Background Gradient Effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-violet-600/20">
            R
          </div>
          <span className="font-semibold text-slate-800 text-lg">ResumeAI</span>
        </div>

        {/* Card Section */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Account বানাও</h1>
          <p className="text-sm text-slate-500 mb-8">সম্পূর্ণ free, কোনো credit card লাগবে না</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">তোমার নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahim Ahmed"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ character"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-600/20 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Account বানানো হচ্ছে...
                </>
              ) : (
                'Register করো →'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Account আছে?{' '}
            <Link href="/login" className="text-violet-600 hover:text-violet-700 transition-colors font-semibold">
              Login করো
            </Link>
          </p>
        </div>

        {/* Home Link */}
        <p className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium">
            ← Home এ ফিরে যাও
          </Link>
        </p>
      </div>
    </main>
  )
}