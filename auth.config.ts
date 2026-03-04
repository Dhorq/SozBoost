import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

// Edge-compatible config — NO Prisma imports here
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage =
        nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')
      const isDashboard = nextUrl.pathname.startsWith('/dashboard')

      if (isLoggedIn && isAuthPage) {
        const role = auth?.user?.role
        return NextResponse.redirect(
          new URL(role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/brand', nextUrl)
        )
      }

      if (!isLoggedIn && isDashboard) {
        return NextResponse.redirect(new URL('/login', nextUrl))
      }

      return NextResponse.next()
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.id
        token.role = (user as { role: string }).role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  providers: [], // providers are added in auth.ts (Node.js only)
  session: { strategy: 'jwt' },
}
