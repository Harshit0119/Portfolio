import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';

export function FloatingWhatsApp() {
  const prefersReducedMotion = useReducedMotion();
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Priyal Gandhi on WhatsApp"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2.5 h-12 px-3.5 sm:px-5 rounded-full bg-[#171717] text-white border border-white/15 shadow-[0_14px_30px_-8px_rgba(23,23,23,0.45)] hover:bg-[#286DFF] hover:border-[#286DFF] transition-colors"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        WhatsApp
      </span>
    </motion.a>
  );
}
