import { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { buildWhatsAppUrl, SITE_CONFIG } from '../config/site';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'My Work' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const whatsappUrl = buildWhatsAppUrl();

  const handleSocialClick = (platform: 'Instagram' | 'YouTube', url: string) => {
    if (url) return;
    setSocialNotice(
      `${platform} profile link is configurable and will be added soon. Feel free to reach out on WhatsApp.`
    );
    window.setTimeout(() => {
      setSocialNotice((current) =>
        current?.startsWith(platform) ? null : current
      );
    }, 4500);
  };

  return (
    <footer className="bg-[#171717] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="text-xl sm:text-2xl font-bold tracking-[0.06em] text-white hover:text-[#6899FF] transition-colors"
            >
              {SITE_CONFIG.wordmark}
            </a>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 max-w-sm">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium text-white/50 tracking-wide mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="text-sm text-white/80 hover:text-[#6899FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Configurable Socials */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-medium text-white/50 tracking-wide">
              Contact &amp; Channels
            </p>
            <div className="space-y-1.5 text-sm text-white/80">
              <p>{SITE_CONFIG.location}</p>
              <p>
                WhatsApp:{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#6899FF] transition-colors tabular-nums font-medium"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {SITE_CONFIG.social.instagramUrl ? (
                <a
                  href={SITE_CONFIG.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 text-xs font-medium text-white/85 hover:border-[#286DFF] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSocialClick('Instagram', '')}
                  aria-label="Instagram profile link"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 text-xs font-medium text-white/80 hover:border-[#6899FF] hover:text-white transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </button>
              )}

              {SITE_CONFIG.social.youtubeUrl ? (
                <a
                  href={SITE_CONFIG.social.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 text-xs font-medium text-white/85 hover:border-[#286DFF] hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSocialClick('YouTube', '')}
                  aria-label="YouTube channel link"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 text-xs font-medium text-white/80 hover:border-[#6899FF] hover:text-white transition-colors cursor-pointer"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </button>
              )}
            </div>

            {socialNotice && (
              <p
                role="status"
                className="text-xs text-[#9BBBFF] leading-relaxed pt-1"
              >
                {socialNotice}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>© 2026 Priyal Gandhi. All Rights Reserved.</p>
          <p>{SITE_CONFIG.roles}</p>
        </div>
      </div>
    </footer>
  );
}
