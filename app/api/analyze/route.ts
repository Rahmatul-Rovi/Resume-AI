import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { error } from 'console'
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req:Request) {
    const session = await getServerSession(authOptions)
    if(!session?.user?.id){
        return NextResponse.json({error: 'UnAuthorized'}, {status: 401})
    }
    try{
       const { resumeId, jobDesc } = await req.json()
 
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId: session.user.id },
    })
 
    if (!resume) {
      return NextResponse.json({ error: 'Resume পাওয়া যায়নি' }, { status: 404 })
    }

      const prompt = `
You are a professional resume analyzer. Analyze the resume against the job description and return ONLY valid JSON.
 
RESUME:
${resume.content.slice(0, 3000)}
 
JOB DESCRIPTION:
${jobDesc || 'No specific job description provided. Do a general analysis.'}
 
Return this exact JSON structure (no markdown, no extra text):
{
  "score": <number 0-100>,
  "breakdown": {
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "keywords": <number 0-100>,
    "format": <number 0-100>
  },
  "suggestions": [
    { "type": "warning", "text": "<improvement needed in Bengali>" },
    { "type": "success", "text": "<what is good in Bengali>" },
    { "type": "info", "text": "<additional tip in Bengali>" }
  ],
  "summary": "<2-3 sentence overall assessment in Bengali>"
}
 
Rules:
- All suggestion text must be in Bengali
- Provide at least 2 warnings, 2 successes, 1 info
- Be specific and actionable
`

    } catch(error){
         console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'AI analysis এ সমস্যা হয়েছে' },
      { status: 500 }
    )
    }
}