'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Zap, Eye, EyeOff, Building2, Sparkles, AlertCircle } from 'lucide-react'

type Role = 'BRAND' | 'CREATOR'

export default function LoginPage() {
  const router = useRouter()
  const [activeRole, setActiveRole] = useState<Role>('BRAND')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email atau password salah. Silakan coba lagi.')
      setLoading(false)
      return
    }

    // After successful login, fetch session to verify role matches selected tab
    const sessionRes = await fetch('/api/auth/session')
    const session = await sessionRes.json()

    if (session?.user?.role && session.user.role !== activeRole) {
      const roleLabel = session.user.role === 'BRAND' ? 'Brand' : 'Creator'
      setError(
        `Akun ini terdaftar sebagai ${roleLabel}. Silakan pilih tab "${roleLabel}" untuk masuk.`
      )
      setLoading(false)
      return
    }

    router.push(session?.user?.role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/brand')
    router.refresh()
  }

  const tabs: { role: Role; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      role: 'BRAND',
      label: 'Brand / Bisnis',
      icon: <Building2 size={16} />,
      desc: 'Temukan kreator untuk kampanye Anda',
    },
    {
      role: 'CREATOR',
      label: 'Kreator',
      icon: <Sparkles size={16} />,
      desc: 'Terima order dan monetize kontenmu',
    },
  ]

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#C9A96E] rounded-xl flex items-center justify-center shadow-md">
            <Zap size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-2xl text-gray-900">SozBoost</span>
        </Link>
        <p className="text-gray-500 text-sm">Masuk ke akun Anda</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Role Tabs */}
        <div className="grid grid-cols-2 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.role}
              onClick={() => {
                setActiveRole(tab.role)
                setError('')
              }}
              className={`flex flex-col items-center gap-1 py-4 px-3 text-sm font-medium transition-all border-b-2 ${
                activeRole === tab.role
                  ? 'border-[#C9A96E] text-[#C9A96E] bg-[#FAF5E8]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
              <span className="text-xs font-normal text-gray-400 hidden sm:block">{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {activeRole === 'BRAND' ? 'Selamat datang, Brand!' : 'Selamat datang, Kreator!'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {activeRole === 'BRAND'
              ? 'Masuk untuk mengelola kampanye dan kreator Anda'
              : 'Masuk untuk melihat order dan mengelola kontenmu'}
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@perusahaan.com"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#C9A96E] hover:text-[#B8925C] font-medium"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] text-white font-semibold py-3 rounded-lg hover:bg-[#B8925C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                `Masuk sebagai ${activeRole === 'BRAND' ? 'Brand' : 'Kreator'}`
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link
              href={`/register?role=${activeRole.toLowerCase()}`}
              className="text-[#C9A96E] hover:text-[#B8925C] font-semibold"
            >
              Daftar sebagai {activeRole === 'BRAND' ? 'Brand' : 'Kreator'}
            </Link>
          </p>
        </div>
      </div>

      {/* Back to home */}
      <p className="text-center mt-6 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          ← Kembali ke beranda
        </Link>
      </p>
    </div>
  )
}
