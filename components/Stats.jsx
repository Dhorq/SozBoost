'use client'

import { Clapperboard, Building2, CheckCircle, Wallet } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const ICONS = [Clapperboard, Building2, CheckCircle, Wallet]

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => {
            const Icon = ICONS[i]
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5E8] flex items-center justify-center">
                    <Icon size={22} className="text-[#C9A96E]" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
