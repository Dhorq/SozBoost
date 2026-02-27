'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLanguage, t } = useLanguage()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C9A96E] rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-gray-900">SozBoost</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#cara-kerja"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href="#fitur"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t.nav.features}
            </Link>
            <Link
              href="#harga"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t.nav.pricing}
            </Link>
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'id'
                    ? 'bg-[#C9A96E] text-white'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                ID
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'en'
                    ? 'bg-[#C9A96E] text-white'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Desktop Right: Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              {t.nav.login}
            </button>
            <button className="bg-[#C9A96E] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#B8925C] transition-colors">
              {t.nav.signUp}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div
              className={`w-5 h-0.5 bg-gray-600 mb-1 transition-all ${
                mobileOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-600 mb-1 transition-all ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-600 transition-all ${
                mobileOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2">
              <Link
                href="#cara-kerja"
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 text-sm font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
              >
                {t.nav.howItWorks}
              </Link>
              <Link
                href="#fitur"
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 text-sm font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
              >
                {t.nav.features}
              </Link>
              <Link
                href="#harga"
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 text-sm font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
              >
                {t.nav.pricing}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="text-xs text-gray-500 font-medium">
                  Bahasa:
                </span>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden text-xs font-bold">
                  <button
                    onClick={() => setLanguage('id')}
                    className={`px-3 py-1.5 transition-colors ${
                      lang === 'id'
                        ? 'bg-[#C9A96E] text-white'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    ID
                  </button>
                  <div className="w-px h-4 bg-gray-200" />
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 transition-colors ${
                      lang === 'en'
                        ? 'bg-[#C9A96E] text-white'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="pt-1 flex gap-3">
                <button className="text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg w-full hover:bg-gray-50 transition-colors">
                  {t.nav.login}
                </button>
                <button className="bg-[#C9A96E] text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-full hover:bg-[#B8925C] transition-colors">
                  {t.nav.signUp}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

