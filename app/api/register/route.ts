import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'সব field পূরণ করো' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password কমপক্ষে ৬ character হতে হবে' },
        { status: 400 }
      )
    }

    // const existing = await prisma.user.findUnique({ where: { email } })
    // if (existing) {
    //   return NextResponse.json(
    //     { error: 'এই email দিয়ে আগেই account আছে' },
    //     { status: 400 }
    //   )
    // }

    // const hashed = await bcrypt.hash(password, 12)

    // const user = await prisma.user.create({
    //   data: { name, email, password: hashed },
    // })

    // return NextResponse.json({
    //   message: 'Account তৈরি হয়েছে!',
    //   userId: user.id,
    // })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Server এ সমস্যা হয়েছে' },
      { status: 500 }
    )
  }
}