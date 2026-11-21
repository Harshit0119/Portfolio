import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { WHY_WORK_ITEMS } from '../data/portfolio';
import { ResilientImage } from './ResilientImage';

interface WhyWorkSectionProps {
  onStartProject: () => void;
}

export function WhyWorkSection({ onStartProject }: WhyWorkSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="why-me"
      className="py-20 sm:py-28 lg:py-32 bg-[#F7EFE3] border-b border-[#171717]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Sticky Editorial Anchor + Real Workspace Visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-sm font-medium text-[#286DFF] tracking-wide mb-3">
              Why Collaborate
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold tracking-[-0.025em] leading-[1.08] text-[#171717]">
              Why Work{' '}
              <span className="font-editorial italic font-normal text-[#286DFF]">
                With Me?
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5C5852] max-w-[44ch]">
              Great creative work comes from listening closely, sweating the small
              visual details, and uniting design, motion, and AI into one cohesive
              voice for your brand.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#171717]/10 bg-white p-2.5">
              <div className="overflow-hidden rounded-xl aspect-[16/10] bg-[#EFE6D9]">
                <ResilientImage
                  src="/assets/work/priyal-workspace-desk.png"
                  alt="Design desk with Create Design Inspire artwork and Let's Create Together sign"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 pb-1 px-1.5 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#5C5852]">
                  Thoughtful craft · Responsive freelance partnership
                </span>
                <button
                  type="button"
                  onClick={onStartProject}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#286DFF] hover:text-[#1C56DB] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Six Authentic Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_WORK_ITEMS.map((item, index) => (
              <motion.div
                key={item.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                className="rounded-2xl bg-[#FFF8EF] p-6 sm:p-7 border border-[#171717]/10 transition-colors duration-200 hover:border-[#286DFF]/40"
              >
                <span className="text-xs font-semibold text-[#286DFF] tabular-nums">
                  {item.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#171717] tracking-[-0.015em] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.68] text-[#5C5852]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
