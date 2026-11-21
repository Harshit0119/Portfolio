/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyWorkSection } from './components/WhyWorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import type { PortfolioProject, ServiceId } from './data/portfolio';

const TRACKED_SECTIONS = ['home', 'about', 'services', 'work', 'contact'] as const;

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );
  const [preselectedService, setPreselectedService] = useState<ServiceId | null>(
    null
  );

  useEffect(() => {
    const elements = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-22% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, []);

  const handleSelectServiceForInquiry = useCallback(
    (service: ServiceId) => {
      setPreselectedService(service);
      scrollToSection('contact');
    },
    [scrollToSection]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FFF8EF] text-[#171717]">
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        <main>
          <Hero
            onExploreWork={() => scrollToSection('work')}
            onLetsWork={() => scrollToSection('contact')}
          />

          <AboutSection />

          <ServicesSection onSelectService={handleSelectServiceForInquiry} />

          <PortfolioSection onOpenProject={setSelectedProject} />

          <ProcessSection />

          <WhyWorkSection onStartProject={() => scrollToSection('contact')} />

          <ContactSection preselectedService={preselectedService} />
        </main>

        <Footer onNavigate={scrollToSection} />

        <FloatingWhatsApp />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRequestService={handleSelectServiceForInquiry}
        />
      </div>
    </MotionConfig>
  );
}
