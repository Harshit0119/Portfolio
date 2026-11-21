import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_HIGHLIGHTS } from '../data/portfolio';
import { SITE_CONFIG } from '../config/site';
import { ResilientImage } from './ResilientImage';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-[#FFF8EF] border-b border-[#171717]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Priyal Gandhi Portrait + Real Workspace Inset */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-[#EFE6D9] border border-[#171717]/10 shadow-[0_24px_56px_-26px_rgba(23,23,23,0.22)] aspect-[4/5]">
                <ResilientImage
                  src="/assets/aistudio/ev__port_75564c44.jpeg"
                  alt="Priyal Gandhi — Creative Designer and Digital Content Creator"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Inset detail from Priyal's creative desk visual */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
                className="hidden sm:block absolute -bottom-6 -right-6 w-[210px] rounded-xl bg-white p-2 border border-[#171717]/10 shadow-[0_18px_36px_-16px_rgba(23,23,23,0.2)]"
              >
                <div className="overflow-hidden rounded-lg aspect-[16/10] bg-[#F7EFE3]">
                  <ResilientImage
                    src="/assets/work/priyal-workspace-desk.png"
                    alt="Create Design Inspire studio workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 px-1 text-xs font-medium text-[#171717]">
                  Create · Design · Inspire
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio & Authentic Focus Highlights */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="lg:col-span-7"
          >
            <p className="text-sm font-medium text-[#286DFF] tracking-wide mb-3">
              About · {SITE_CONFIG.name}
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold tracking-[-0.025em] leading-[1.1] text-[#171717]">
              A Little{' '}
              <span className="font-editorial italic font-normal text-[#286DFF]">
                About Me
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-base sm:text-[17px] leading-[1.72] text-[#45423E] max-w-[62ch]">
              <p>
                Hi, I&apos;m <strong className="font-semibold text-[#171717]">Priyal Gandhi</strong>,
                a creative individual who enjoys transforming ideas into visually appealing
                designs and engaging digital content.
              </p>
              <p>
                I work across graphic design, branding, video editing, AI-powered content
                creation and social media management.
              </p>
              <p>
                I love experimenting with new creative tools, exploring different visual
                styles and creating content that helps brands and creators communicate
                better.
              </p>
              <p className="text-[#171717] font-medium">
                My goal is simple — to turn creative ideas into meaningful digital
                experiences.
              </p>
            </div>

            {/* Clean Typographic Highlights Grid (No invented stats or fake numbers) */}
            <div className="mt-10 pt-8 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium text-[#5C5852] tracking-wide">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#171717]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
