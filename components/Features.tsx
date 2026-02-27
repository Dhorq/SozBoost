'use client'

import {
  Search,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Star,
  RefreshCw,
  Package,
  Trophy,
  CalendarDays,
  Users,
  TrendingUp,
  Building2,
  Clapperboard,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const BRAND_ICONS: LucideIcon[] = [
  Search,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Star,
  RefreshCw,
]
const CREATOR_ICONS: LucideIcon[] = [
  Package,
  ShieldCheck,
  Trophy,
  CalendarDays,
  Users,
  TrendingUp,
]

function FeatureCard({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#C9A96E]" strokeWidth={1.5} />
      </div>
      <div>
        <div className="font-semibold text-gray-900 mb-1 text-sm">{title}</div>
        <div className="text-gray-500 text-sm leading-relaxed">{desc}</div>
      </div>
    </div>
  )
}

export default function Features() {
  const { t } = useLanguage()
  const f = t.features

  return (
    <section id="fitur" className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {f.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{f.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Untuk Brand */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#C9A96E] rounded-xl flex items-center justify-center">
                <Building2
                  size={18}
                  className="text-white"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">{f.brandTitle}</div>
                <div className="text-xs text-gray-500">{f.brandSub}</div>
              </div>
            </div>
            <div className="space-y-6">
              {f.brand.map((item, i) => (
                <FeatureCard
                  key={i}
                  Icon={BRAND_ICONS[i]}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </div>

          {/* Untuk Creator */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#C9A96E] rounded-xl flex items-center justify-center">
                <Clapperboard
                  size={18}
                  className="text-white"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {f.creatorTitle}
                </div>
                <div className="text-xs text-gray-500">{f.creatorSub}</div>
              </div>
            </div>
            <div className="space-y-6">
              {f.creator.map((item, i) => (
                <FeatureCard
                  key={i}
                  Icon={CREATOR_ICONS[i]}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

