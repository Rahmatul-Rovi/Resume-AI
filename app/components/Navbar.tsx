'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/resume')) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
      style={{ background: 'rgba(15,12,41,0.8)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-base font-black tracking-tight group-hover:opacity-80 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #e2d9f3, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ResumeAI
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="text-sm transition-all hover:text-white relative"
            style={{ color: pathname === item.href ? 'white' : 'rgba(255,255,255,0.5)' }}>
            {item.label}
            {pathname === item.href && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
            )}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {session.user?.name?.split(' ')[0]}
              </span>
            </div>
            <Link href="/dashboard"
              className="px-5 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 text-sm rounded-xl transition-all hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Logout
            </button>
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
  )
}