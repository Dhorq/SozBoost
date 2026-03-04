'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, Eye, EyeOff, Building2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'

type Role = 'BRAND' | 'CREATOR'

const INDUSTRIES = [
  'Fashion & Kecantikan',
  'Makanan & Minuman',
  'Teknologi',
  'Gaya Hidup',
  'Kesehatan & Wellness',
  'Travel & Wisata',
  'Pendidikan',
  'Hiburan & Musik',
  'Olahraga & Fitness',
  'Keuangan & Investasi',
  'Properti',
  'Otomotif',
  'Lainnya',
]

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeRole, setActiveRole] = useState<Role>('BRAND')

  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const role = searchParams.get('role')
    if (role === 'creator') setActiveRole('CREATOR')
    else setActiveRole('BRAND')
  }, [searchParams])

  const handleRoleChange = (role: Role) => {
    setActiveRole(role)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok')
      return
    }
    if (password.length < 8) {
      setError('Password minimal 8 karakter')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        role: activeRole,
        ...(activeRole === 'BRAND' && { companyName, industry }),
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Terjadi kesalahan. Coba lagi.')
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/login'), 2500)
  }

  const passwordStrength = (() => {
    if (!password) return null
    if (password.length < 8) return { label: 'Lemah', color: 'bg-red-400', width: '33%' }
    if (password.length < 12) return { label: 'Cukup', color: 'bg-yellow-400', width: '66%' }
    return { label: 'Kuat', color: 'bg-green-400', width: '100%' }
  })()

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Akun berhasil dibuat!</h2>
          <p className="text-sm text-gray-500">Mengarahkan ke halaman login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#C9A96E] rounded-xl flex items-center justify-center shadow-md">
            <Zap size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-2xl text-gray-900">SozBoost</span>
        </Link>
        <p className="text-gray-500 text-sm">Buat akun gratis dan mulai sekarang</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Role Selector */}
        <div className="p-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Saya bergabung sebagai:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Brand Card */}
            <button
              onClick={() => handleRoleChange('BRAND')}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                activeRole === 'BRAND'
                  ? 'border-[#C9A96E] bg-[#FAF5E8]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {activeRole === 'BRAND' && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#C9A96E] rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                  activeRole === 'BRAND' ? 'bg-[#C9A96E]' : 'bg-gray-100'
                }`}
              >
                <Building2
                  size={18}
                  className={activeRole === 'BRAND' ? 'text-white' : 'text-gray-500'}
                />
              </div>
              <p className={`font-semibold text-sm ${activeRole === 'BRAND' ? 'text-gray-900' : 'text-gray-600'}`}>
                Brand / Bisnis
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                Cari kreator & kelola kampanye
              </p>
            </button>

            {/* Creator Card */}
            <button
              onClick={() => handleRoleChange('CREATOR')}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                activeRole === 'CREATOR'
                  ? 'border-[#C9A96E] bg-[#FAF5E8]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {activeRole === 'CREATOR' && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#C9A96E] rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                  activeRole === 'CREATOR' ? 'bg-[#C9A96E]' : 'bg-gray-100'
                }`}
              >
                <Sparkles
                  size={18}
                  className={activeRole === 'CREATOR' ? 'text-white' : 'text-gray-500'}
                />
              </div>
              <p className={`font-semibold text-sm ${activeRole === 'CREATOR' ? 'text-gray-900' : 'text-gray-600'}`}>
                Kreator
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                Terima order & monetize konten
              </p>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {activeRole === 'BRAND' ? 'Nama Kontak Person' : 'Nama Lengkap'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={activeRole === 'BRAND' ? 'Nama PIC / Marketing' : 'Nama kreator Anda'}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors"
              />
            </div>

            {/* Brand-only fields */}
            {activeRole === 'BRAND' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Perusahaan / Brand <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="PT. Contoh Indonesia"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Industri <span className="text-gray-400 font-normal">(opsional)</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors bg-white"
                  >
                    <option value="">Pilih industri...</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeRole === 'BRAND' ? 'email@perusahaan.com' : 'email@gmail.com'}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
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
              {passwordStrength && (
                <div className="mt-1.5">
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Kekuatan: {passwordStrength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  required
                  className={`w-full px-4 py-2.5 pr-11 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-colors ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] text-white font-semibold py-3 rounded-lg hover:bg-[#B8925C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Membuat akun...
                </span>
              ) : (
                `Daftar sebagai ${activeRole === 'BRAND' ? 'Brand' : 'Kreator'}`
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Dengan mendaftar, Anda menyetujui{' '}
              <Link href="/terms" className="text-[#C9A96E] hover:underline">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="text-[#C9A96E] hover:underline">
                Kebijakan Privasi
              </Link>{' '}
              SozBoost.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link
              href={`/login?role=${activeRole.toLowerCase()}`}
              className="text-[#C9A96E] hover:text-[#B8925C] font-semibold"
            >
              Masuk sekarang
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-lg animate-pulse"><div className="bg-white rounded-2xl shadow-xl h-96" /></div>}>
      <RegisterForm />
    </Suspense>
  )
}
