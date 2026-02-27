'use client'

import {
  UserRound,
  Search,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const STEP_ICONS: LucideIcon[] = [UserRound, Search, ClipboardList, CheckCircle2]

export default function HowItWorks() {
  const { t } = useLanguage()
  const hw = t.howItWorks

  return (
    <section id="cara-kerja" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {hw.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{hw.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hw.steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div key={i} className="relative">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:border-[#C9A96E]/50 hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5E8] flex items-center justify-center mb-4">
                    <Icon
                      size={22}
                      className="text-[#C9A96E]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-[#C9A96E] text-xs font-bold tracking-wider mb-2">
                    {hw.stepLabel} {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-base leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < hw.steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 -right-4 z-10 text-gray-300 pointer-events-none">
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

