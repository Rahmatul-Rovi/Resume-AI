import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GoogleGenerativeAI } from '@google/generative-ai'
 
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

const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'})
const result = await model.generateContent(prompt)
const text = result.response.text().trim()

//JSON Parse 
const jsonMatch = text.match(/\{[\s\S]*\}/)
if(!jsonMatch){
  throw new Error('Invalid AI Response')
}

const analysisData = JSON.parse(jsonMatch[0])

//Database Save
 const analysis = await prisma.analysis.create({
      data: {
        resumeId,
        score: analysisData.score,
        jobDesc: jobDesc || null,
        suggestions: analysisData,
      },
    })
 
    return NextResponse.json({
      analysisId: analysis.id,
      ...analysisData,
    })

    } catch(error){
         console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'AI analysis এ সমস্যা হয়েছে' },
      { status: 500 }
    )
    }
}