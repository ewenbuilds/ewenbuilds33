/**
 * Footer Component for EWENBUILDS.xyz
 * Clean, quiet engineering footer adhering to Universal Frontend Design Constitution.
 */

import React from 'react';
import { trackEvent, triggerFileDownload } from '../utils/analytics';

interface FooterProps {
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-850">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold">[EB]</span>
              <span className="text-sm font-bold text-white tracking-wide">EWENBUILDS.xyz</span>
            </div>
            <p className="mt-1 text-slate-400 text-xs max-w-md">
              [INSERT FOOTER MOTTO: Open-source hardware engineering, electromechanical prototypes, and CAD repository.]
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a
              href="#overview"
              onClick={() => trackEvent('footer_nav', { target: 'overview' })}
              className="hover:text-cyan-400 transition-colors"
            >
              Overview
            </a>
            <a
              href="#projects"
              onClick={() => trackEvent('footer_nav', { target: 'projects' })}
              className="hover:text-cyan-400 transition-colors"
            >
              Projects &amp; BOMs
            </a>
            <a
              href="#build-guides"
              onClick={() => trackEvent('footer_nav', { target: 'build-guides' })}
              className="hover:text-cyan-400 transition-colors"
            >
              3D CAD &amp; Build Guides
            </a>
            <a
              href="#resume"
              onClick={() => trackEvent('footer_nav', { target: 'resume' })}
              className="hover:text-cyan-400 transition-colors"
            >
              Resume (PDF)
            </a>
            <a
              href="#contact"
              onClick={() => trackEvent('footer_nav', { target: 'contact' })}
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
            <button
              onClick={() => {
                trackEvent('footer_open_deploy_guide');
                onOpenDeployGuide();
              }}
              className="text-cyan-400 hover:text-cyan-300 font-mono underline"
            >
              Cloudflare Deploy Guide
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {currentYear} EWENBUILDS.xyz</span>
            <span aria-hidden="true">·</span>
            <span>All open-source hardware licensed under CERN-OHL-S v2</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                trackEvent('footer_download_full_archive');
                triggerFileDownload(
                  '/downloads/[INSERT PROJECT NAME: complete-engineering-portfolio-archive].zip',
                  '[INSERT PROJECT NAME: complete-engineering-portfolio-archive].zip',
                  'project_zip'
                );
              }}
              className="hover:text-cyan-400 font-mono transition-colors"
            >
              Download Full Repo (.zip)
            </button>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span className="font-mono text-slate-400">Deployed on Cloudflare Pages Static</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
