import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';
import type { PortfolioProject, ServiceId } from '../data/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestService: (service: ServiceId) => void;
}

export function ProjectModal({
  project,
  onClose,
  onRequestService,
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (project.gallery.length > 1) {
        if (event.key === 'ArrowRight') {
          setActiveImageIndex((idx) => (idx + 1) % project.gallery.length);
        }
        if (event.key === 'ArrowLeft') {
          setActiveImageIndex(
            (idx) => (idx - 1 + project.gallery.length) % project.gallery.length
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const currentMedia = project?.gallery[activeImageIndex] || project?.gallery[0];

  const projectWhatsAppUrl = project
    ? buildWhatsAppUrl(
        `Hi Priyal! I viewed "${project.title}" in your portfolio and I'd love to discuss a similar ${project.relatedService.toLowerCase()} project with you.`
      )
    : buildWhatsAppUrl();

  return (
    <AnimatePresence>
      {project && currentMedia && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#171717]/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1060px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFF8EF] text-[#171717] border border-white/15 shadow-2xl"
          >
            {/* Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#171717]/10">
              <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                <span
                  className={`font-semibold ${
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

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#171717]/15 bg-white text-[#171717] hover:border-[#286DFF] hover:text-[#286DFF] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-8">
              {/* High-Resolution Media Viewer */}
              <div>
                <div
                  className={`relative overflow-hidden rounded-xl border border-[#171717]/10 ${
                    currentMedia.bgTone === 'dark' ? 'bg-[#171717]' : 'bg-[#F5ECE0]'
                  }`}
                >
                  <div className="aspect-[16/10] w-full flex items-center justify-center">
                    <ResilientImage
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      fallbackTitle={project.title}
                      loading="eager"
                      className="w-full h-full object-contain max-h-[540px]"
                    />
                  </div>

                  {project.gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex(
                            (idx) =>
                              (idx - 1 + project.gallery.length) %
                              project.gallery.length
                          )
                        }
                        aria-label="Previous project image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#171717] border border-[#171717]/15 flex items-center justify-center hover:bg-[#286DFF] hover:text-white transition-colors cursor-pointer shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex(
                            (idx) => (idx + 1) % project.gallery.length
                          )
                        }
                        aria-label="Next project image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#171717] border border-[#171717]/15 flex items-center justify-center hover:bg-[#286DFF] hover:text-white transition-colors cursor-pointer shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption & Thumbnail Strip */}
                <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm text-[#5C5852]">{currentMedia.caption}</p>

                  {project.gallery.length > 1 && (
                    <div className="flex items-center gap-2 shrink-0">
                      {project.gallery.map((media, idx) => (
                        <button
                          key={media.src}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={`View slide ${idx + 1}`}
                          className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === activeImageIndex
                              ? 'border-[#286DFF]'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <ResilientImage
                            src={media.src}
                            alt={media.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                <div className="lg:col-span-7 space-y-5">
                  <h3
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#171717]"
                  >
                    {project.title}
                  </h3>

                  {project.isConcept && (
                    <p className="text-xs font-medium text-[#5C5852] bg-[#F3EAE0] px-4 py-2.5 rounded-lg border border-[#171717]/8">
                      Note: This piece is a self-initiated{' '}
                      <strong className="text-[#171717]">{project.provenanceLabel}</strong>{' '}
                      created to demonstrate visual direction and capability—not a commissioned client project.
                    </p>
                  )}

                  <p className="text-base leading-[1.7] text-[#45423E]">
                    {project.overview}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-[#171717] mb-3">
                      Creative Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#45423E]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-[#286DFF] shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Metadata & Inquiry Column */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-xl bg-white border border-[#171717]/10">
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-[#171717]/8">
                      <p className="text-xs text-[#5C5852]">Role</p>
                      <p className="mt-1 text-sm font-semibold text-[#171717]">
                        {project.role}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-[#171717]/8">
                      <p className="text-xs text-[#5C5852]">Project Type</p>
                      <p className="mt-1 text-sm font-semibold text-[#171717]">
                        {project.provenanceLabel} · {project.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#5C5852] mb-1.5">Key Deliverables</p>
                      <p className="text-sm leading-relaxed text-[#171717]">
                        {project.deliverables.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <a
                      href={projectWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#286DFF] text-white text-sm font-medium hover:bg-[#1C56DB] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Discuss Similar Project on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onRequestService(project.relatedService);
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[#171717]/15 text-[#171717] text-sm font-medium hover:border-[#286DFF] hover:text-[#286DFF] transition-colors cursor-pointer"
                    >
                      <span>Inquire via Contact Form</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
