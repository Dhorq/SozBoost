import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Use Edge-compatible config (no Prisma) for middleware
export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
}
