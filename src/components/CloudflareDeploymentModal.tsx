/**
 * Cloudflare Deployment & Analytics Guide Modal
 * Complete architectural reference and step-by-step deployment instructions for EWENBUILDS.xyz
 */

import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';

interface CloudflareDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareDeploymentModal: React.FC<CloudflareDeploymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    trackEvent('copy_cf_command', { section: sectionId });
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0d13] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left font-sans">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>DEPLOYMENT PIPELINE</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>CLOUDFLARE PAGES OPTIMIZED</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Cloudflare Pages Deployment &amp; Domain Setup
            </h3>
          </div>

          <button
            onClick={() => {
              trackEvent('close_deploy_guide');
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close Modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-8 text-sm text-slate-300">
          {/* CRITICAL NOTE: Why _redirects is removed */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-200">
            <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase text-cyan-300 mb-1">
              <span>✓ SPA ROUTING LOOP PERMANENTLY RESOLVED</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 font-sans">
              Cloudflare Pages automatically detects Vite single-page applications and applies native SPA fallback routing (<code className="text-cyan-300 font-mono">"not_found_handling": "single-page-application"</code>). Manual <code className="text-cyan-300 font-mono">public/_redirects</code> rules cause infinite routing loops on Cloudflare and have been removed. Basic security headers are maintained cleanly in <code className="text-cyan-300 font-mono">public/_headers</code>.
            </p>
          </div>

          {/* STEP 1: Git Connection */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <span className="w-6 h-6 rounded bg-slate-800 text-cyan-400 text-xs flex items-center justify-center">1</span>
              <span>Connect GitHub Repository to Cloudflare Pages</span>
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 pl-2 leading-relaxed">
              <li>Log in to <strong className="text-white">dash.cloudflare.com</strong>.</li>
              <li>In the left sidebar, navigate to <strong className="text-cyan-300">Workers &amp; Pages</strong>.</li>
              <li>Click <strong className="text-white">Create application</strong> &gt; Select the <strong className="text-cyan-300">Pages</strong> tab.</li>
              <li>Click <strong className="text-white">Connect to Git</strong> and select your <code className="font-mono text-cyan-300">ewenbuilds</code> repository.</li>
            </ol>
          </div>

          {/* STEP 2: Build Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded bg-slate-800 text-cyan-400 text-xs flex items-center justify-center">2</span>
                <span>Configure Exact Build Settings</span>
              </h4>
              <button
                onClick={() => copyToClipboard('Framework preset: Vite\nBuild command: npm run build\nBuild output directory: dist\nNode version: 20', 'build-settings')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
              >
                {copiedSection === 'build-settings' ? 'Copied!' : 'Copy Settings'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 uppercase text-[10px] mb-1">Framework Preset</div>
                <div className="text-white font-semibold">Vite</div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 uppercase text-[10px] mb-1">Build command</div>
                <div className="text-cyan-300 font-semibold">npm run build</div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 uppercase text-[10px] mb-1">Build output directory</div>
                <div className="text-cyan-300 font-semibold">dist</div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 uppercase text-[10px] mb-1">Node Environment (.nvmrc)</div>
                <div className="text-white font-semibold">20 (Specifed in .nvmrc)</div>
              </div>
            </div>

            <div className="text-xs text-amber-300/80 bg-amber-950/20 border border-amber-800/40 p-3 rounded-lg font-mono">
              Notice: Artificial lockfiles (bun.lock, yarn.lock, .npmrc) have been removed from the repository. Only package.json is provided to ensure smooth Cloudflare Pages builds.
            </div>
          </div>

          {/* STEP 3: Custom Domain Setup */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <span className="w-6 h-6 rounded bg-slate-800 text-cyan-400 text-xs flex items-center justify-center">3</span>
              <span>Custom Domain Setup (ewenbuilds.xyz)</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed pl-2">
              <p>
                1. <strong>Add Zone:</strong> In Cloudflare, if <code className="font-mono text-cyan-300">ewenbuilds.xyz</code> is not yet added, click <em>Add Site</em>, select the Free plan, and point your domain registrar nameservers to Cloudflare.
              </p>
              <p>
                2. <strong>Attach to Pages Project:</strong> Inside your Pages project, go to <strong className="text-white">Settings</strong> &gt; <strong className="text-cyan-300">Custom Domains</strong> &gt; Click <strong className="text-white">Set up a custom domain</strong>.
              </p>
              <p>
                3. Enter <code className="font-mono text-cyan-300">ewenbuilds.xyz</code> (and optional <code className="font-mono text-cyan-300">www.ewenbuilds.xyz</code>). Cloudflare automatically creates CNAME DNS records and provisions free SSL/TLS Edge Certificates with zero downtime.
              </p>
            </div>
          </div>

          {/* STEP 4: Analytics & Admin Dashboard Access */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <span className="w-6 h-6 rounded bg-slate-800 text-cyan-400 text-xs flex items-center justify-center">4</span>
              <span>Web Analytics &amp; Admin Data Access</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed font-sans">
              <p>
                <strong className="text-white">No Custom Auth or Firebase Required:</strong> The administrative dashboard for this site is the native Cloudflare Dashboard. As the site owner, view real-time traffic, geography, referral sources, and core web vitals by visiting:
              </p>
              <div className="font-mono text-cyan-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                dash.cloudflare.com &gt; Analytics &amp; Logs &gt; Web Analytics &gt; ewenbuilds.xyz
              </div>
              <p className="text-slate-400">
                Replace <code className="font-mono text-slate-200">[INSERT CLOUDFLARE WEB ANALYTICS TOKEN]</code> in <code className="font-mono text-slate-200">index.html</code> with your site token to start collecting privacy-first telemetry immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              trackEvent('close_deploy_guide_bottom');
              onClose();
            }}
            className="px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs transition-colors"
          >
            Dismiss Guide
          </button>
        </div>
      </div>
    </div>
  );
};
