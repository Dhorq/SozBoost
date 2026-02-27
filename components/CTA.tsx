'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()
  const c = t.cta

  return (
    <section className="bg-[#C9A96E] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {c.title}
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{c.sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-[#C9A96E] font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
            {c.ctaBrand}
          </button>
          <button className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto">
            {c.ctaCreator}
          </button>
        </div>
        <p className="text-white/50 text-sm mt-6">
          {c.loginPrompt}{' '}
          <span className="text-white/80 underline cursor-pointer hover:text-white transition-colors">
            {c.loginLink}
          </span>
        </p>
      </div>
    </section>
  )
}

