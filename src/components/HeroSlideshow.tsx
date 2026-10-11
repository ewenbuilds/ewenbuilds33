/**
 * Hero & Smooth Photo Slideshow Component
 * Displays "EWENBUILDS.xyz", introduction, metrics, and interactive hardware slideshow.
 */

import React, { useState, useEffect, useRef } from 'react';
import { SLIDESHOW_ITEMS } from '../data/mockData';
import { trackEvent, triggerFileDownload } from '../utils/analytics';

interface HeroSlideshowProps {
  onOpenDeployGuide: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ onOpenDeployGuide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDESHOW_ITEMS.length) % SLIDESHOW_ITEMS.length);
  };

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, currentSlide]);

  const activeItem = SLIDESHOW_ITEMS[currentSlide];

  return (
    <section id="overview" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* Subtle Engineering Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Kicker & Identity */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-semibold">PORTFOLIO & OPEN-SOURCE HARDWARE LAB</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>PUBLIC DOMAIN & CERN-OHL</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-500 text-[11px]">DOMAIN: EWENBUILDS.XYZ</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-500 text-[11px]">CLOUDFLARE PAGES HOSTED</span>
          </div>
        </div>

        {/* Hero Headline & Overview Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
              EWENBUILDS<span className="text-cyan-400">.xyz</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              [INSERT HERO SUBTITLE: PRECISION ELECTROMECHANICAL ENGINEERING, KINEMATIC CAD REPOSITORIES, AND OPEN-SOURCE HARDWARE INSTRUMENTATION.]
            </p>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed font-sans">
              <span className="font-semibold text-cyan-300 block mb-1 font-mono text-xs uppercase tracking-wider">
                [INSERT OVERVIEW / STATEMENT OF PURPOSE]
              </span>
              [INSERT OVERVIEW TEXT: Welcome to EWENBUILDS.xyz. This platform serves as a complete archive for both peer-reviewed academic research projects and open-source hardware mechanisms. Every release provides full Bill of Materials (BOM), verifiable schematics, assembly build guides, STEP/STL 3D CAD files, and downloadable project archives.]
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => trackEvent('cta_explore_projects')}
                className="px-6 py-3 text-sm font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors rounded-lg shadow-md shadow-cyan-500/10 font-sans"
              >
                Browse Projects & Documentation
              </a>

              <a
                href="#build-guides"
                onClick={() => trackEvent('cta_view_3d_builds')}
                className="px-6 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors rounded-lg"
              >
                3D CAD Viewer & Build Guides
              </a>

              <button
                onClick={() => {
                  trackEvent('cta_download_all_repos_zip');
                  triggerFileDownload(
                    '/downloads/[INSERT PROJECT NAME: complete-engineering-portfolio-archive].zip',
                    '[INSERT PROJECT NAME: complete-engineering-portfolio-archive].zip',
                    'project_zip'
                  );
                }}
                className="px-5 py-3 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition-colors rounded-lg flex items-center gap-2"
                title="Download full project repository archive as .zip"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Repo (.zip)</span>
              </button>
            </div>
          </div>

          {/* Metrics Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Open-Source Repos
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                [INSERT COUNT: 12+]
              </div>
              <div className="text-xs text-slate-500 mt-1">CERN-OHL & MIT Licensed</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                CAD Models
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">
                [INSERT COUNT: 38]
              </div>
              <div className="text-xs text-slate-500 mt-1">Native STEP & STL Exports</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Academic Papers
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                [INSERT COUNT: 03]
              </div>
              <div className="text-xs text-slate-500 mt-1">IEEE & University Research</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Total Downloads
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">
                [INSERT METRIC: 2.4k]
              </div>
              <div className="text-xs text-slate-500 mt-1">Public CAD / Firmware Builds</div>
            </div>

            <div className="col-span-2 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-400">CLOUDFLARE PAGES DEPLOYED</span>
              <button
                onClick={onOpenDeployGuide}
                className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
              >
                View Deploy Instructions →
              </button>
            </div>
          </div>
        </div>

        {/* Smooth-Transitioning Photo Slideshow */}
        <div className="mt-8 border border-slate-800 rounded-2xl bg-[#0e111a] p-4 sm:p-6 shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                FEATURED PROTOTYPE SLIDESHOW
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                {activeItem.title}
              </h2>
            </div>

            {/* Slideshow Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">
                0{currentSlide + 1} / 0{SLIDESHOW_ITEMS.length}
              </span>

              <button
                onClick={() => {
                  trackEvent('slideshow_prev');
                  prevSlide();
                }}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Previous Slide"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  trackEvent('slideshow_toggle_play', { playing: !isPlaying });
                  setIsPlaying(!isPlaying);
                }}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              >
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>

              <button
                onClick={() => {
                  trackEvent('slideshow_next');
                  nextSlide();
                }}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Next Slide"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slide Visual Presentation with Fallback Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center group">
              {/* Image Container with Fallback & Explicit Placeholder Notice */}
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-[#0b0f19] rounded-lg p-6">
                <svg className="w-16 h-16 text-cyan-500/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-cyan-400 font-mono text-sm font-semibold mb-1">
                  {activeItem.imagePlaceholder}
                </div>
                <div className="text-xs text-slate-400 max-w-md">
                  Image path: <code className="font-mono text-slate-300">{activeItem.imagePath}</code>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Drop your real prototype photo into <span className="font-mono text-slate-400">public/images/</span> to replace this visual frame.
                </div>
              </div>

              {/* Tag Ribbon */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 text-cyan-300 font-mono text-xs px-3 py-1 rounded-md">
                {activeItem.tag}
              </div>
            </div>

            {/* Slide Technical Specs & Quick Links */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-sm text-slate-300 leading-relaxed font-sans">
                {activeItem.subtitle}
              </div>

              <div className="border-t border-slate-800 pt-3 space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  ENGINEERING SPECIFICATIONS
                </div>
                {activeItem.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">{spec.label}:</span>
                    <span className="font-mono font-medium text-slate-200">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    trackEvent('download_slide_cad', { slide: activeItem.title });
                    triggerFileDownload(
                      activeItem.cadFileRef,
                      `[INSERT DOWNLOAD FILE: ${activeItem.id}].zip`,
                      'cad_stl'
                    );
                  }}
                  className="w-full py-2.5 px-4 text-xs font-mono text-center rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Download CAD Asset ({activeItem.cadFileRef})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {SLIDESHOW_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  trackEvent('slideshow_dot_select', { index: idx });
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
