import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import pdf from 'pdf-parse'


export async function POST(req:Request) {
    const session = await getServerSession(authOptions)
    if(!session?.user?.id){
        return NextResponse.json({error: 'unAuthorized'}, {status: 401})
    }

    try{
   const formData = await req.formData()
   const file = formData.get('file') as File
    
   if (!file) {
      return NextResponse.json({ error: 'File নেই' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'শুধু PDF চলবে' }, { status: 400 })
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'File 4MB এর বেশি' }, { status: 400 })
    }

    } catch(error){

    }
}