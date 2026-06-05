import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(){
 const session = await getServerSession (authOptions)
 if(!session?.user?.id){
    return NextResponse.json({error: 'Unauthorized'} , {status:401})
 }

 const resumes = await prisma.resume.findMany({
    where: {userId: session.user.id},
    orderBy: {createdAt: 'desc'},
    select: {id: true, title: true, fileUrl: true, createdAt: true},
 })
 return NextResponse.json(resumes)
}

export async function POST(req:Request) {
   const session = await getServerSession(authOptions)
   if(!session?.user?.id){
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
   }
   try{
     const {title, content, fileUrl} = await req.json()
     if(!content){
      return NextResponse.json({error: 'Content Missing'}, {status: 400})
     }
   }catch(error){

   }
}