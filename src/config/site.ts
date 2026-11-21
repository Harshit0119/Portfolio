export const SITE_CONFIG = {
  name: 'Priyal Gandhi',
  wordmark: 'PRIYAL GANDHI',
  location: 'Bhopal, Madhya Pradesh, India',
  phoneDisplay: '+91 9522098206',
  whatsappNumber: '919522098206',
  whatsappBaseUrl: 'https://wa.me/919522098206',
  defaultWhatsAppMessage:
    "Hi Priyal! I visited your portfolio and I'm interested in discussing a creative project with you.",
  tagline: 'Creating visuals. Building identities. Bringing ideas to life.',
  availability: 'Available for Freelance Projects',
  roles: 'Graphic Designer · Video Editor · AI Creative Specialist',
  /**
   * Configurable social profile URLs.
   * Leave empty string until live profile links are ready to connect.
   */
  social: {
    instagramUrl: '' as string,
    youtubeUrl: '' as string,
  },
  /**
   * Optional future backend endpoint for email/form delivery.
   * When empty, form submissions open a structured WhatsApp inquiry directly.
   */
  contactEndpoint: '' as string,
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(
    customMessage?.trim() || SITE_CONFIG.defaultWhatsAppMessage
  );
  return `${SITE_CONFIG.whatsappBaseUrl}?text=${text}`;
}

export interface ContactInquiryPayload {
  fullName: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

export function formatInquiryForWhatsApp(payload: ContactInquiryPayload): string {
  const lines = [
    `Hi Priyal! I'm reaching out from your portfolio website.`,
    ``,
    `Name: ${payload.fullName.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Service Required: ${payload.service}`,
  ];

  if (payload.budget) {
    lines.push(`Estimated Budget: ${payload.budget}`);
  }

  lines.push(``, `Project Details:`, payload.message.trim());

  return lines.join('\n');
}

export async function dispatchContactInquiry(
  payload: ContactInquiryPayload
): Promise<{ mode: 'api' | 'whatsapp'; whatsappUrl: string; formattedMessage: string }> {
  const formattedMessage = formatInquiryForWhatsApp(payload);
  const whatsappUrl = buildWhatsAppUrl(formattedMessage);

  if (SITE_CONFIG.contactEndpoint) {
    const response = await fetch(SITE_CONFIG.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to send message through the configured endpoint.');
    }

    return { mode: 'api', whatsappUrl, formattedMessage };
  }

  return { mode: 'whatsapp', whatsappUrl, formattedMessage };
}
