'use client'

import Link from 'next/link'
import { Zap, Heart } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#C9A96E] rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-gray-900">SozBoost</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {f.desc}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                TikTok
              </a>
              <a
                href="#"
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <div className="font-semibold text-gray-900 mb-4 text-sm">
              {f.platformTitle}
            </div>
            <div className="space-y-2.5">
              {f.platform.map((item, i) => {
                const hrefs = ['#', '#', '#harga', '#'] as const
                const href = hrefs[i] ?? '#'
                return (
                  <Link
                    key={i}
                    href={href}
                    className="block text-gray-500 text-sm hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Help Links */}
          <div>
            <div className="font-semibold text-gray-900 mb-4 text-sm">
              {f.helpTitle}
            </div>
            <div className="space-y-2.5">
              {f.help.map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="block text-gray-500 text-sm hover:text-gray-900 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm">{f.copyright}</p>
          <p className="text-gray-400 text-sm flex items-center gap-1.5">
            Made with{' '}
            <Heart size={13} className="text-[#C9A96E]" fill="#C9A96E" />{' '}
            {f.madeFor}
          </p>
        </div>
      </div>
    </footer>
  )
}

