'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewResumePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      alert('শুধু PDF file upload করো!')
      return
    }
    setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleSubmit = async () => {
    if (!file) return
    setUploading(true)
    // Backend connect হলে এখানে actual upload হবে
    await new Promise((r) => setTimeout(r, 2000)) // simulate
    setUploading(false)
    router.push('/resume/1') // dummy redirect
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            R
          </div>
          <span className="font-semibold text-sm">ResumeAI</span>
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Dashboard
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Resume Upload করো</h1>
          <p className="text-sm text-white/40">
            PDF upload করো, AI analyze করবে
          </p>
        </div>

        <div className="space-y-6">
          {/* Title input */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">
              Resume এর নাম
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: Software Engineer Resume"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>

          {/* Drop zone */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">
              PDF File
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
                dragging
                  ? 'border-violet-500 bg-violet-500/10'
                  : file
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-white/10 hover:border-white/20 bg-white/3'
              }`}
            >
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
              />

              {file ? (
                <div>
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-sm font-medium text-green-400">{file.name}</p>
                  <p className="text-xs text-white/30 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null) }}
                    className="mt-3 text-xs text-white/30 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-3">📄</div>
                  <p className="text-sm font-medium text-white/60 mb-1">
                    PDF drag করো অথবা click করো
                  </p>
                  <p className="text-xs text-white/30">সর্বোচ্চ 4MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Job description */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">
              Job Description{' '}
              <span className="text-white/20">(optional)</span>
            </label>
            <textarea
              rows={5}
              placeholder="যে job এ apply করবে সেই job description paste করো। AI এর সাথে match করে score দেবে।"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!file || uploading}
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Upload হচ্ছে...
              </span>
            ) : (
              'Upload করো এবং Analyze করো →'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}