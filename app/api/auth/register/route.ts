import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, role, companyName, industry } = body

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password minimal 8 karakter' }, { status: 400 })
    }

    if (!['BRAND', 'CREATOR'].includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 })
    }

    if (role === 'BRAND' && !companyName) {
      return NextResponse.json({ error: 'Nama perusahaan wajib diisi' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        ...(role === 'BRAND' && {
          brandProfile: {
            create: {
              companyName: companyName || name,
              industry: industry || null,
            },
          },
        }),
        ...(role === 'CREATOR' && {
          creatorProfile: {
            create: {},
          },
        }),
      },
    })

    return NextResponse.json({ message: 'Akun berhasil dibuat' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
