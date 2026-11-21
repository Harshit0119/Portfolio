import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Send,
  User,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  dispatchContactInquiry,
  SITE_CONFIG,
} from '../config/site';
import {
  BUDGET_OPTIONS,
  SERVICE_FORM_OPTIONS,
  type ServiceId,
} from '../data/portfolio';

interface ContactSectionProps {
  preselectedService: ServiceId | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  message?: string;
}

interface SubmittedResult {
  mode: 'api' | 'whatsapp';
  whatsappUrl: string;
  formattedMessage: string;
  recipientName: string;
}

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<ServiceId>('Graphic Designing');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<SubmittedResult | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      setSubmittedResult(null);
    }
  }, [preselectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!service) {
      nextErrors.service = 'Please select the service you need.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message =
        'Please share a few details about your project (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await dispatchContactInquiry({
        fullName,
        email,
        service,
        budget,
        message,
      });

      setSubmittedResult({
        ...result,
        recipientName: fullName.trim(),
      });

      // Open WhatsApp via a synthetic anchor click rather than window.open
      if (result.mode === 'whatsapp') {
        const link = document.createElement('a');
        link.href = result.whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please message directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyMessage = async () => {
    if (!submittedResult) return;
    try {
      await navigator.clipboard.writeText(submittedResult.formattedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setFullName('');
    setEmail('');
    setBudget('');
    setMessage('');
    setErrors({});
    setSubmitError(null);
  };

  const directWhatsAppUrl = buildWhatsAppUrl();

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-[#FFF8EF]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Details & Prominent WhatsApp CTA */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <p className="text-sm font-medium text-[#286DFF] tracking-wide mb-3">
                Let&apos;s Connect
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[3.15rem] font-semibold tracking-[-0.025em] leading-[1.08] text-[#171717]">
                Have a{' '}
                <span className="font-editorial italic font-normal text-[#286DFF]">
                  Project in Mind?
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-[17px] leading-[1.68] text-[#5C5852] max-w-[44ch]">
                Let&apos;s create something amazing together. Tell me about your
                idea and let&apos;s bring it to life.
              </p>
            </div>

            {/* Direct Contact Metadata */}
            <div className="space-y-4 pt-6 border-t border-[#171717]/10">
              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white border border-[#171717]/10 flex items-center justify-center text-[#286DFF] shrink-0">
                  <User className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs text-[#5C5852]">Name</p>
                  <p className="text-base font-semibold text-[#171717]">
                    {SITE_CONFIG.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white border border-[#171717]/10 flex items-center justify-center text-[#286DFF] shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs text-[#5C5852]">Location</p>
                  <p className="text-base font-semibold text-[#171717]">
                    {SITE_CONFIG.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white border border-[#171717]/10 flex items-center justify-center text-[#286DFF] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs text-[#5C5852]">WhatsApp</p>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-[#171717] hover:text-[#286DFF] transition-colors tabular-nums"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Prominent WhatsApp Direct Action Card */}
            <div className="rounded-2xl bg-[#171717] text-white p-6 sm:p-7">
              <p className="text-xs font-medium text-[#79A6FF] tracking-wide">
                Fastest Way to Reach Out
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                Prefer a quick chat on WhatsApp?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Share your references, timelines, or creative brief directly on
                WhatsApp for a quick response.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#286DFF] text-white text-sm font-medium hover:bg-[#1C56DB] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Validated Inquiry Form with WhatsApp Dispatch */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 border border-[#171717]/10 shadow-[0_24px_48px_-28px_rgba(23,23,23,0.14)]">
              {submittedResult ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#286DFF]/10 text-[#286DFF]">
                    <Check className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#171717] tracking-[-0.02em]">
                      Your project brief is ready, {submittedResult.recipientName}.
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5C5852]">
                      {submittedResult.mode === 'api'
                        ? 'Your inquiry has been delivered. You can also follow up directly on WhatsApp below.'
                        : "Your structured project message has been prepared for Priyal's WhatsApp. If WhatsApp did not open automatically, click the button below."}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FFF8EF] border border-[#171717]/10 p-4 text-xs sm:text-sm text-[#171717] whitespace-pre-wrap leading-relaxed">
                    {submittedResult.formattedMessage}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={submittedResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#286DFF] text-white text-sm font-medium hover:bg-[#1C56DB] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Chat</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#171717]/15 text-[#171717] text-sm font-medium hover:border-[#286DFF] hover:text-[#286DFF] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#286DFF]" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-3 text-sm font-medium text-[#5C5852] hover:text-[#171717] transition-colors cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] tracking-[-0.02em]">
                      Tell me about your project
                    </h3>
                    <p className="mt-1.5 text-sm text-[#5C5852]">
                      Fill out the brief below to generate a ready-to-send WhatsApp
                      inquiry directly to Priyal Gandhi.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-sm font-medium text-[#171717] mb-1.5"
                      >
                        Full Name <span className="text-[#286DFF]">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.fullName)}
                        className={`w-full rounded-xl bg-[#FFF8EF]/70 px-4 py-3 text-sm text-[#171717] placeholder:text-[#5C5852]/65 border transition-colors focus:bg-white focus:outline-none ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-[#171717]/15 focus:border-[#286DFF]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#171717] mb-1.5"
                      >
                        Email Address <span className="text-[#286DFF]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full rounded-xl bg-[#FFF8EF]/70 px-4 py-3 text-sm text-[#171717] placeholder:text-[#5C5852]/65 border transition-colors focus:bg-white focus:outline-none ${
                          errors.email
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-[#171717]/15 focus:border-[#286DFF]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Service Required */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-sm font-medium text-[#171717] mb-1.5"
                      >
                        Service Required <span className="text-[#286DFF]">*</span>
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value as ServiceId)}
                        className="w-full rounded-xl bg-[#FFF8EF]/70 px-4 py-3 text-sm text-[#171717] border border-[#171717]/15 transition-colors focus:bg-white focus:border-[#286DFF] focus:outline-none"
                      >
                        {SERVICE_FORM_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Budget (Optional) */}
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-sm font-medium text-[#171717] mb-1.5"
                      >
                        Project Budget{' '}
                        <span className="text-[#5C5852] font-normal">(Optional)</span>
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-xl bg-[#FFF8EF]/70 px-4 py-3 text-sm text-[#171717] border border-[#171717]/15 transition-colors focus:bg-white focus:border-[#286DFF] focus:outline-none"
                      >
                        <option value="">Select a range (optional)</option>
                        {BUDGET_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#171717] mb-1.5"
                    >
                      Project Details / Message{' '}
                      <span className="text-[#286DFF]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Share your brand, deliverables needed, inspiration, or expected timeline..."
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full rounded-xl bg-[#FFF8EF]/70 px-4 py-3 text-sm text-[#171717] placeholder:text-[#5C5852]/65 border transition-colors focus:bg-white focus:outline-none resize-y ${
                        errors.message
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-[#171717]/15 focus:border-[#286DFF]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#286DFF] text-white text-sm font-medium hover:bg-[#1C56DB] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Preparing Brief...' : 'Send Message'}</span>
                    </button>

                    <p className="text-xs text-[#5C5852]">
                      Opens a prefilled WhatsApp inquiry to{' '}
                      <span className="tabular-nums font-medium text-[#171717]">
                        {SITE_CONFIG.phoneDisplay}
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
