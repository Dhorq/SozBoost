'use client'

import { useState } from 'react'
import {
  Rocket,
  Instagram,
  Twitter,
  Facebook,
  Music,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const PLATFORMS = [
  {
    id: 'instagram',
    Icon: Instagram,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200 shadow-pink-100',
  },
  {
    id: 'twitter',
    Icon: Twitter,
    color: 'text-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-300 shadow-gray-100',
  },
  {
    id: 'facebook',
    Icon: Facebook,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200 shadow-blue-100',
  },
  {
    id: 'tiktok',
    Icon: Music,
    color: 'text-gray-900',
    bg: 'bg-gray-100',
    border: 'border-gray-900 shadow-gray-200',
  },
] as const satisfies ReadonlyArray<{
  id: string
  Icon: LucideIcon
  color: string
  bg: string
  border: string
}>

type PlatformId = (typeof PLATFORMS)[number]['id']

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
  const [selected, setSelected] = useState<PlatformId>('instagram')

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FAF5E8] text-[#A8895C] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-[#C9A96E]/30">
          <Rocket size={14} strokeWidth={2} />
          {h.badge}
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
          {h.headlinePre}
          <span className="text-[#C9A96E]">{h.headlineBrand}</span>
          {h.headlineMid}
          <span className="text-[#C9A96E]">{h.headlineCreator}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {h.sub}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-[#C9A96E] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#B8925C] transition-colors w-full sm:w-auto">
            {h.ctaBrand}
          </button>
          <button className="border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors w-full sm:w-auto">
            {h.ctaCreator}
          </button>
        </div>

        {/* Platform Selection */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {PLATFORMS.map(({ id, Icon, color, bg, border }, i) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all group ${
                selected === id
                  ? `${bg} ${border} scale-105 shadow-lg`
                  : 'bg-white border-transparent hover:border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon size={24} className={color} strokeWidth={2} />
              </div>
              <span
                className={`font-bold text-sm ${
                  selected === id ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {h.platforms[i]}
              </span>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-10">{h.moreCreators}</p>
      </div>
    </section>
  )
}

