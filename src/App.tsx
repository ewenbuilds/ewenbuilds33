/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlideshow } from './components/HeroSlideshow';
import { ProjectsSection } from './components/ProjectsSection';
import { BuildGuideSection } from './components/BuildGuideSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CloudflareDeploymentModal } from './components/CloudflareDeploymentModal';

export default function App() {
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen for custom analytics events to provide immediate visual feedback for file downloads
  useEffect(() => {
    const handleTelemetry = (e: any) => {
      const detail = e.detail;
      if (detail && detail.event === 'file_download') {
        setToastMessage(`Initiated download: ${detail.file || 'archive'}`);
        setTimeout(() => setToastMessage(null), 3500);
      }
    };

    window.addEventListener('ewenbuilds:telemetry', handleTelemetry);
    return () => window.removeEventListener('ewenbuilds:telemetry', handleTelemetry);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Header Bar */}
      <Header onOpenDeployGuide={() => setDeployGuideOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero & Slideshow */}
        <HeroSlideshow onOpenDeployGuide={() => setDeployGuideOpen(true)} />

        {/* Section 2: Projects Grid & Web-Integrated Documentation */}
        <ProjectsSection />

        {/* Section 3: Build Guides & 3D Open Source Downloads */}
        <BuildGuideSection />

        {/* Section 4: Resume & Curriculum Vitae */}
        <ResumeSection />

        {/* Section 5: Contact & Professional Links */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenDeployGuide={() => setDeployGuideOpen(true)} />

      {/* Cloudflare Pages Deployment & Analytics Setup Guide Modal */}
      <CloudflareDeploymentModal
        isOpen={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
      />

      {/* Download / Action Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-sm"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </aside>
      )}
    </div>
  );
}
