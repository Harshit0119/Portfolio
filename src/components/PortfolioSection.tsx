import { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  type PortfolioCategory,
  type PortfolioProject,
} from '../data/portfolio';
import { ResilientImage } from './ResilientImage';

interface PortfolioSectionProps {
  onOpenProject: (project: PortfolioProject) => void;
}

interface PortfolioCardProps {
  project: PortfolioProject;
  layoutClass: string;
  aspectClass: string;
  enableParallax?: boolean;
  onOpen: (project: PortfolioProject) => void;
}

function PortfolioCard({
  project,
  layoutClass,
  aspectClass,
  enableParallax = false,
  onOpen,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || !enableParallax ? [0, 0] : [-14, 14]
  );

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col ${layoutClass}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="w-full text-left flex flex-col h-full rounded-2xl bg-white border border-[#171717]/10 overflow-hidden transition-all duration-300 hover:border-[#286DFF]/45 hover:shadow-[0_24px_48px_-24px_rgba(23,23,23,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286DFF] cursor-pointer"
      >
        {/* Media Frame */}
        <div
          className={`relative w-full overflow-hidden ${aspectClass}`}
          style={{ backgroundColor: project.coverBg || '#F3EAE0' }}
        >
          <motion.div
            style={{ y: parallaxY }}
            className="w-full h-full will-change-transform"
          >
            <ResilientImage
              src={project.coverImage}
              alt={project.coverAlt}
              fallbackTitle={project.title}
              className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                project.coverFit === 'contain'
                  ? 'object-contain p-4 sm:p-6'
                  : 'object-cover scale-[1.04]'
              }`}
            />
          </motion.div>

          {/* Subtle Hover Scrim & View Project Action */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
            <span className="text-sm font-medium text-white inline-flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
            {project.gallery.length > 1 && (
              <span className="text-xs text-white/85 tabular-nums translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {project.gallery.length} visuals
              </span>
            )}
          </div>
        </div>

        {/* Clean Editorial Caption (Zero Static Pills) */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs mb-2">
              <span
                className={`font-semibold tracking-wide ${
                  project.isConcept ? 'text-[#5C5852]' : 'text-[#286DFF]'
                }`}
              >
                {project.provenanceLabel}
              </span>
              <span aria-hidden="true" className="text-[#171717]/25">
                ·
              </span>
              <span className="text-[#5C5852]">{project.category}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-[#171717] tracking-[-0.015em] leading-snug group-hover:text-[#286DFF] transition-colors">
              {project.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[#5C5852] line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#171717]/8 flex items-center justify-between text-xs font-medium text-[#171717]/75">
            <span>{project.role}</span>
            <span className="inline-flex items-center gap-1 text-[#286DFF] group-hover:translate-x-0.5 transition-transform">
              <span>View details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export function PortfolioSection({ onOpenProject }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter(
      (project) =>
        project.category === activeCategory ||
        project.secondaryCategories?.includes(activeCategory)
    );
  }, [activeCategory]);

  const getCardLayout = (project: PortfolioProject, index: number, isAll: boolean) => {
    if (!isAll) {
      return {
        layoutClass: 'lg:col-span-6',
        aspectClass: 'aspect-[16/11]',
        enableParallax: index === 0,
      };
    }

    // Curated editorial rhythm across 12-column desktop grid for the full showcase
    switch (index) {
      case 0:
        return {
          layoutClass: 'lg:col-span-7',
          aspectClass: 'aspect-[16/11]',
          enableParallax: true,
        };
      case 1:
        return {
          layoutClass: 'lg:col-span-5',
          aspectClass: 'aspect-[16/11] lg:aspect-[4/3]',
          enableParallax: false,
        };
      case 2:
        return {
          layoutClass: 'lg:col-span-5',
          aspectClass: 'aspect-[4/3]',
          enableParallax: false,
        };
      case 3:
        return {
          layoutClass: 'lg:col-span-7',
          aspectClass: 'aspect-[16/10]',
          enableParallax: true,
        };
      case 4:
        return {
          layoutClass: 'lg:col-span-6',
          aspectClass: 'aspect-[4/3]',
          enableParallax: false,
        };
      case 5:
        return {
          layoutClass: 'lg:col-span-6',
          aspectClass: 'aspect-[16/10]',
          enableParallax: true,
        };
      case 6:
        return {
          layoutClass: 'lg:col-span-4',
          aspectClass: 'aspect-[4/3]',
          enableParallax: false,
        };
      case 7:
        return {
          layoutClass: 'lg:col-span-4',
          aspectClass: 'aspect-[4/5]',
          enableParallax: false,
        };
      case 8:
        return {
          layoutClass: 'lg:col-span-4',
          aspectClass: 'aspect-[4/3]',
          enableParallax: false,
        };
      default:
        return {
          layoutClass: 'lg:col-span-12',
          aspectClass: 'aspect-[16/9] lg:aspect-[21/9]',
          enableParallax: project.featuredSize === 'wide',
        };
    }
  };

  return (
    <section
      id="work"
      className="py-20 sm:py-28 lg:py-32 bg-[#FFF8EF] border-b border-[#171717]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#286DFF] tracking-wide mb-3">
              Featured Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-[-0.025em] leading-[1.08] text-[#171717]">
              Selected{' '}
              <span className="font-editorial italic font-normal text-[#286DFF]">
                Creative Work
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#5C5852] max-w-md">
            A curated showcase combining my original brand, YouTube, and Instagram
            work alongside clearly labeled concept and creative practice projects.
          </p>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#171717]/10">
          <div
            role="tablist"
            aria-label="Filter portfolio projects by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'text-white'
                      : 'text-[#171717]/75 hover:text-[#171717] hover:bg-[#171717]/5'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activePortfolioFilter"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#286DFF]"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#5C5852] tabular-nums whitespace-nowrap shrink-0">
            Showing {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Editorial Bento / Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const { layoutClass, aspectClass, enableParallax } = getCardLayout(
                project,
                index,
                activeCategory === 'All'
              );
              return (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  layoutClass={layoutClass}
                  aspectClass={aspectClass}
                  enableParallax={enableParallax}
                  onOpen={onOpenProject}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Transparent Provenance Legend */}
        <div className="mt-10 pt-6 border-t border-[#171717]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C5852]">
          <p>
            <strong className="font-semibold text-[#286DFF]">Original Work</strong>{' '}
            represents Priyal Gandhi&apos;s own client and personal channel pieces.
          </p>
          <p>
            <strong className="font-semibold text-[#171717]">
              Concept Project / Sample Work / Creative Practice
            </strong>{' '}
            showcases self-initiated visual direction.
          </p>
        </div>
      </div>
    </section>
  );
}
