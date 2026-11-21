import { motion, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolio';

export function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="process"
      className="py-20 sm:py-28 lg:py-32 bg-white border-b border-[#171717]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="text-sm font-medium text-[#286DFF] tracking-wide mb-3">
            Creative Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.15rem] font-semibold tracking-[-0.025em] leading-[1.08] text-[#171717]">
            From Idea to{' '}
            <span className="font-editorial italic font-normal text-[#286DFF]">
              Creation
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5C5852]">
            A clear, collaborative four-step workflow designed to keep every project
            focused, expressive, and delivered smoothly.
          </p>
        </div>

        {/* Four-step horizontal timeline with animated connecting track */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-0 right-0 h-[1px] bg-[#171717]/10"
          >
            <motion.div
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease }}
              className="h-full w-full bg-[#286DFF] origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease }}
                className="relative"
              >
                {/* Step Node */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFF8EF] border border-[#286DFF]/35 text-[#286DFF] flex items-center justify-center text-sm font-semibold tabular-nums">
                    {step.number}
                  </div>
                  <div
                    aria-hidden="true"
                    className="lg:hidden flex-1 h-[1px] bg-[#171717]/12"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#171717] tracking-[-0.015em]">
                  <span className="text-[#5C5852] font-normal tabular-nums mr-2">
                    {step.number} —
                  </span>
                  {step.title}
                </h3>

                <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#171717]/90">
                  {step.description}
                </p>

                <p className="mt-2.5 text-sm leading-relaxed text-[#5C5852]">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
