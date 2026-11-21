import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, MessageCircle, Play } from 'lucide-react';
import { buildWhatsAppUrl, SITE_CONFIG } from '../config/site';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreWork: () => void;
  onLetsWork: () => void;
}

const MARQUEE_DISCIPLINES = [
  'Graphic Designing',
  'Brand Identity',
  'Video Editing',
  'AI Video Creation',
  'AI Image Generation',
  'Instagram Content',
  'YouTube Channel Management',
  'Promotional Creatives',
  'Content Writing',
];

export function Hero({ onExploreWork, onLetsWork }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const whatsappHref = buildWhatsAppUrl();

  const revealEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#FFF8EF] pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Subtle architectural ambient gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[560px] h-[560px] rounded-full bg-[#286DFF]/[0.07] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 -left-24 w-[420px] h-[420px] rounded-full bg-[#F5D9A6]/[0.28] blur-[100px]"
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: revealEase }}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#5C5852] mb-6"
            >
              <span className="font-medium text-[#286DFF]">
                {SITE_CONFIG.availability}
              </span>
              <span aria-hidden="true" className="text-[#171717]/25">
                ·
              </span>
              <span>{SITE_CONFIG.location}</span>
            </motion.div>

            <h1 className="text-[2.65rem] sm:text-[3.5rem] lg:text-[4.25rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#171717]">
              <motion.span
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: revealEase }}
                className="block"
              >
                Turning Ideas Into
              </motion.span>
              <motion.span
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14, ease: revealEase }}
                className="block font-editorial italic font-normal text-[#286DFF] mt-1"
              >
                Visual Experiences.
              </motion.span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: revealEase }}
              className="mt-7 text-base sm:text-lg leading-[1.68] text-[#5C5852] max-w-[54ch]"
            >
              I&apos;m <strong className="font-semibold text-[#171717]">Priyal Gandhi</strong>, a
              creative designer and digital content creator passionate about building
              beautiful visuals, engaging content and memorable brand experiences.
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: revealEase }}
              className="mt-4 text-sm font-medium text-[#171717]/80 tracking-wide"
            >
              Graphic Designer{' '}
              <span aria-hidden="true" className="mx-1.5 text-[#286DFF]">
                •
              </span>{' '}
              Video Editor{' '}
              <span aria-hidden="true" className="mx-1.5 text-[#286DFF]">
                •
              </span>{' '}
              AI Creative Specialist
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: revealEase }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] text-white text-sm font-medium hover:bg-[#286DFF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onLetsWork}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#171717]/20 bg-white/80 text-[#171717] text-sm font-medium hover:border-[#286DFF] hover:text-[#286DFF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Direct WhatsApp Line */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="mt-7 pt-6 border-t border-[#171717]/10 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] hover:text-[#286DFF] transition-colors group"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#286DFF]/10 text-[#286DFF] group-hover:bg-[#286DFF] group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span>Chat directly on WhatsApp</span>
                <span className="text-[#5C5852] group-hover:text-[#286DFF] tabular-nums">
                  {SITE_CONFIG.phoneDisplay}
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Art-Directed Creative Visual Composition */}
          <div className="lg:col-span-6 flex items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.16, ease: revealEase }}
              className="relative w-full min-h-[430px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center"
            >
              {/* Main Editorial Showcase Card: Packaging & Brand Craft */}
              <div className="relative w-full max-w-[520px] rounded-2xl bg-white p-3.5 sm:p-4 border border-[#171717]/8 shadow-[0_24px_60px_-24px_rgba(23,23,23,0.16)]">
                <div className="grid grid-cols-12 gap-3">
                  {/* Real Branding Work: Monika's Magic */}
                  <div className="col-span-7 overflow-hidden rounded-xl bg-[#FCE8A6] aspect-square">
                    <ResilientImage
                      src="/assets/work/monikas-magic-logo.png"
                      alt="Monika's Magic food brand identity designed by Priyal Gandhi"
                      loading="eager"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>

                  {/* Right Stack inside frame: Skincare Concept + Social Grid */}
                  <div className="col-span-5 flex flex-col gap-3">
                    <div className="flex-1 overflow-hidden rounded-xl bg-[#EFE6D9]">
                      <ResilientImage
                        src="/src/assets/images/concept_skincare_branding_1795259322711.jpg"
                        alt="Luxury botanical skincare branding concept mockup"
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden rounded-xl bg-[#171717]">
                      <ResilientImage
                        src="/assets/work/instagram-content-grid.png"
                        alt="Magic Lens Instagram Reels and miniature visual content grid"
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Editorial Frame Caption */}
                <div className="mt-3.5 px-1 flex items-center justify-between gap-4 text-xs text-[#5C5852]">
                  <span className="font-medium text-[#171717]">
                    Selected Visuals · Branding, Reels &amp; AI Concepts
                  </span>
                  <span className="tabular-nums text-[#286DFF] font-medium">
                    2026 Showcase
                  </span>
                </div>
              </div>

              {/* Floating Video Editing Timeline Preview Card (bottom-left) */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -7, 0] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="hidden sm:block absolute -bottom-3 left-0 lg:-left-5 w-[250px] rounded-xl bg-[#171717] text-white p-3.5 shadow-[0_20px_40px_-14px_rgba(23,23,23,0.45)] border border-white/10"
              >
                <div className="flex items-center justify-between text-[11px] text-white/75 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 font-medium text-white">
                    <Play className="w-3 h-3 fill-[#286DFF] text-[#286DFF]" />
                    Reels &amp; AI Cut
                  </span>
                  <span className="tabular-nums text-white/60">00:15:08</span>
                </div>
                <div className="relative space-y-1.5">
                  <div className="h-2.5 rounded-sm bg-[#286DFF]/90 w-[82%]" />
                  <div className="flex gap-1.5">
                    <div className="h-2 rounded-sm bg-amber-300/85 w-[44%]" />
                    <div className="h-2 rounded-sm bg-white/30 w-[52%]" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2 rounded-sm bg-white/20 w-[30%]" />
                    <div className="h-2 rounded-sm bg-[#5B92FF]/70 w-[62%]" />
                  </div>
                  {/* Playhead line */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-[58%] w-[1.5px] bg-white"
                  />
                </div>
              </motion.div>

              {/* Floating AI Visual Frame Preview (top-right) */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, 8, 0] }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="hidden sm:block absolute -top-3 right-0 lg:-right-4 w-[184px] rounded-xl bg-white p-2 shadow-[0_18px_36px_-14px_rgba(23,23,23,0.22)] border border-[#171717]/10"
              >
                <div className="overflow-hidden rounded-lg aspect-video bg-[#171717]">
                  <ResilientImage
                    src="/src/assets/images/concept_ai_cinematic_ad_1795259381356.jpg"
                    alt="AI cinematic fragrance advertisement concept"
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-1.5 px-0.5 text-[11px] font-medium text-[#171717] truncate">
                  AI Cinematic Concept
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Editorial Marquee Section Divider */}
      <div className="border-y border-[#171717]/10 bg-[#F7EFE3]/70 py-4 overflow-hidden">
        <div className="animate-marquee items-center">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {MARQUEE_DISCIPLINES.map((discipline) => (
                <div
                  key={`${dup}-${discipline}`}
                  className="flex items-center shrink-0"
                >
                  <span className="px-6 text-sm sm:text-[15px] font-medium tracking-wide text-[#171717]/80 whitespace-nowrap">
                    {discipline}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#286DFF] font-editorial italic text-lg"
                  >
                    /
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
