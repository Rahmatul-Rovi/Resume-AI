import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'ResumeAI — AI দিয়ে Resume Smarter করো',
  description: 'Resume upload করো, Gemini AI analyze করবে। বাংলাদেশের job seekers দের জন্য।',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="bn">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}