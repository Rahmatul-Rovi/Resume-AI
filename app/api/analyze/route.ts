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

    } catch(error){
         console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'AI analysis এ সমস্যা হয়েছে' },
      { status: 500 }
    )
    }
}