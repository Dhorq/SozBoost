'use client'

import { Check } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Pricing() {
  const { t } = useLanguage()
  const p = t.pricing

  return (
    <section id="harga" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {p.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{p.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {p.plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 p-8 ${
                plan.highlight
                  ? 'border-[#C9A96E] bg-[#FAF5E8]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.highlight && (
                <div className="inline-block bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {p.popular}
                </div>
              )}

              <div className="font-bold text-gray-900 text-lg mb-1">
                {plan.name}
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                )}
              </div>

              <div className="text-gray-500 text-sm mb-6">{plan.desc}</div>

              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-colors ${
                  plan.highlight
                    ? 'bg-[#C9A96E] text-white hover:bg-[#B8925C]'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-[#C9A96E] hover:text-[#C9A96E]'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <Check
                      size={15}
                      className="text-[#C9A96E] mt-0.5 flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">{p.feeNote}</p>
      </div>
    </section>
  )
}

