/**
 * Header Component for EWENBUILDS.xyz
 * Adheres strictly to the 3-Zone Top Bar Contract from the Universal Frontend Design Constitution:
 * Zone 1: Brand wordmark (single text element)
 * Zone 2: 4-5 concise single-line nav links with smooth-scroll
 * Zone 3: 1 primary CTA button
 */

import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

interface HeaderProps {
  onOpenDeployGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDeployGuide }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'Build Guides & 3D', href: '#build-guides' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (label: string, href: string) => {
    trackEvent('nav_click', { label, href });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#0b0d13]/90 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-[#0b0d13]/70 backdrop-blur-sm border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            onClick={() => handleNavClick('Brand', '#overview')}
          >
            <span className="font-mono text-cyan-400 font-semibold">[EB]</span>
            <span className="tracking-wide">EWENBUILDS.xyz</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-cyan-400"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                trackEvent('open_deploy_guide_nav');
                onOpenDeployGuide();
              }}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors border border-slate-800 hover:border-slate-700 bg-slate-900/60 px-2.5 py-1 rounded whitespace-nowrap shrink-0"
              title="View Cloudflare Pages Deployment & Analytics Setup"
            >
              Cloudflare Docs
            </button>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={() => handleNavClick('Contact CTA', '#contact')}
              className="px-4 py-2 text-xs font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors rounded-lg font-sans shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                trackEvent('open_deploy_guide_mobile');
                onOpenDeployGuide();
              }}
              className="text-[11px] font-mono text-slate-400 border border-slate-800 bg-slate-900/60 px-2 py-1 rounded"
            >
              CF Guide
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Complies with 15% Mobile Sticky Cap) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e111a] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.label, link.href)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => handleNavClick('Contact CTA Mobile', '#contact')}
              className="block w-full text-center px-4 py-2 text-xs font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-md font-sans"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
