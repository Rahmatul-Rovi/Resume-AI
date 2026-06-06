'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewResumePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<'idle' | 'extracting' | 'saving' | 'analyzing' | 'done'>('idle')
  const [error, setError] = useState('')

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      setError('শুধু PDF file upload করো!')
      return
    }
    if (f.size > 4 * 1024 * 1024) {
      setError('File 4MB এর বেশি হওয়া যাবে না')
      return
    }
    setError('')
    setFile(f)
  }

  const handleSubmit = async () => {
    if (!file) return
    setError('')

    try {
      // Step 1: PDF text extract
      setStep('extracting')
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error)

      // Step 2: Resume save
      setStep('saving')
      const resumeRes = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || file.name.replace('.pdf', ''),
          content: uploadData.text,
          fileUrl: '',
        }),
      })
      const resumeData = await resumeRes.json()
      if (!resumeRes.ok) throw new Error(resumeData.error)

      // Step 3: AI Analyze
      setStep('analyzing')
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId: resumeData.resumeId,
          jobDesc: jobDesc || null,
        }),
      })
      const analyzeData = await analyzeRes.json()
      if (!analyzeRes.ok) throw new Error(analyzeData.error)

      setStep('done')
      setTimeout(() => router.push(`/resume/${resumeData.resumeId}`), 500)
    } catch (err: any) {
      setError(err.message || 'কিছু একটা সমস্যা হয়েছে')
      setStep('idle')
    }
  }

  const stepLabels = {
    idle: null,
    extracting: 'PDF থেকে text বের করা হচ্ছে...',
    saving: 'Resume save হচ্ছে...',
    analyzing: 'Gemini AI analyze করছে...',
    done: '✅ সম্পন্ন! redirect হচ্ছে...',
  }

  const isLoading = step !== 'idle' && step !== 'done'

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #0d1b2a 60%, #0a1628 100%)'
    }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(15,12,41,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>R</div>
          <span className="font-bold text-sm group-hover:text-violet-300 transition-colors">ResumeAI</span>
        </Link>
        <Link href="/dashboard" className="text-xs transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.3)' }}>
          ← Dashboard
        </Link>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            ✨ AI-Powered Analysis
          </div>
          <h1 className="text-3xl font-black mb-2">Resume Upload করো</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            PDF upload করো, Gemini AI analyze করবে
          </p>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Resume এর নাম
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: Software Engineer Resume"
              className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Drop zone */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              PDF File <span style={{ color: 'rgba(255,255,255,0.2)' }}>(সর্বোচ্চ 4MB)</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => document.getElementById('fileInput')?.click()}
              className="relative cursor-pointer rounded-2xl p-12 text-center transition-all"
              style={{
                background: dragging ? 'rgba(124,58,237,0.15)' : file ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
                border: dragging ? '2px dashed #7c3aed' : file ? '2px dashed rgba(16,185,129,0.4)' : '2px dashed rgba(255,255,255,0.1)',
              }}
            >
              <input id="fileInput" type="file" accept=".pdf" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

              {file ? (
                <div>
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>{file.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null) }}
                    className="mt-3 text-xs transition-colors hover:text-red-400"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-4">📄</div>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    PDF drag করো অথবা click করো
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>সর্বোচ্চ 4MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Job Description <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional — দিলে better score পাবে)</span>
            </label>
            <textarea
              rows={5}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="যে job এ apply করবে সেই job description paste করো।"
              className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
              <p className="text-xs" style={{ color: '#fca5a5' }}>❌ {error}</p>
            </div>
          )}

          {/* Progress */}
          {step !== 'idle' && (
            <div className="px-4 py-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="flex items-center gap-3">
                {step !== 'done' && (
                  <svg className="animate-spin w-4 h-4 flex-shrink-0" style={{ color: '#a78bfa' }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                <p className="text-sm" style={{ color: '#c4b5fd' }}>{stepLabels[step]}</p>
              </div>
              {/* Progress bar */}
              <div className="mt-3 w-full rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed, #2563eb)',
                    width: step === 'extracting' ? '33%' : step === 'saving' ? '66%' : step === 'analyzing' ? '90%' : '100%'
                  }} />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!file || isLoading}
            className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            {isLoading ? 'Processing...' : 'Upload করো এবং AI Analyze করো →'}
          </button>
        </div>
      </main>
    </div>
  )
}