import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Clapperboard,
  Feather,
  Film,
  Layers,
  PenTool,
  Share2,
  SlidersHorizontal,
  Wand2,
} from 'lucide-react';
import { SERVICES, type ServiceId, type ServiceItem } from '../data/portfolio';

interface ServicesSectionProps {
  onSelectService: (service: ServiceId) => void;
}

const ICON_MAP: Record<ServiceItem['iconName'], typeof PenTool> = {
  PenTool,
  Film,
  SlidersHorizontal,
  Clapperboard,
  Wand2,
  Layers,
  Share2,
  Feather,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#171717] text-white overflow-hidden"
    >
      {/* Subtle cobalt ambient glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-1/4 w-[520px] h-[360px] rounded-full bg-[#286DFF]/[0.14] blur-[130px]"
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#79A6FF] tracking-wide mb-3">
              Services &amp; Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.15rem] font-semibold tracking-[-0.025em] leading-[1.08] text-white">
              What I Can Do{' '}
              <span className="font-editorial italic font-normal text-[#6899FF]">
                For You
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-white/70 max-w-md tracking-[0.01em]">
            From brand identities and scroll-stopping graphics to short-form Reels,
            AI visuals, and channel handling — tailored for startups, cafes, creators,
            and growing brands.
          </p>
        </div>

        {/* Asymmetric Editorial Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.iconName];
            const isHighlighted = index === 0 || index === 5;

            return (
              <motion.article
                key={service.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.05, 0.25),
                  ease,
                }}
                className={`group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#286DFF]/[0.16] to-[#1F1F1F] border-[#286DFF]/35 hover:border-[#286DFF]/70'
                    : 'bg-[#1F1F1F] border-white/10 hover:border-white/25 hover:bg-[#242424]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
                        isHighlighted
                          ? 'bg-[#286DFF] text-white'
                          : 'bg-white/[0.06] text-[#79A6FF] group-hover:bg-[#286DFF] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-medium text-white/40 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.015em] leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-[1.65] text-white/70 tracking-[0.01em]">
                    {service.summary}
                  </p>

                  <ul className="mt-5 pt-5 border-t border-white/10 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13px] text-white/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1 h-1 rounded-full bg-[#6899FF] shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.formServiceValue)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#79A6FF] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Discuss this service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
