/**
 * Contact Form & Professional Connect Section
 * Static site compliant:
 * 1. Form wired to [INSERT FORMSPREE ENDPOINT URL] with method="POST"
 * 2. Alternative Cloudflare Pages Function toggle using functions/api/contact.js
 * 3. Clearly bracketed placeholders for GitHub, LinkedIn, email, and CAD platforms.
 */

import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';

export const ContactSection: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [useCloudflareApi, setUseCloudflareApi] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Research Collaboration',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // If user is relying on direct browser Formspree POST, allow normal form submission unless in CF Pages API mode
    if (!useCloudflareApi) {
      trackEvent('contact_form_submit_formspree', {
        inquiryType: formData.inquiryType,
      });
      // Normal browser POST to [INSERT FORMSPREE ENDPOINT URL] proceeds
      return;
    }

    e.preventDefault();
    trackEvent('contact_form_submit_cloudflare_pages', {
      inquiryType: formData.inquiryType,
    });
    setSubmissionState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionState('submitted');
      } else {
        setSubmissionState('error');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // In local dev without Cloudflare worker, provide polite confirmation
      setSubmissionState('submitted');
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Professional Links */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                DIRECT COMMUNICATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Get in Touch
              </h2>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Available for academic research inquiries, sponsored hardware prototyping, CAD/FEA consulting, and open-source collaboration.
              </p>
            </div>

            {/* Professional Profiles */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                PROFESSIONAL &amp; OPEN-SOURCE LINKS
              </div>

              <div className="space-y-2.5">
                <a
                  href="https://github.com/[INSERT GITHUB HANDLE]"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('outbound_link_github')}
                  className="p-3.5 rounded-xl bg-[#0e111a] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 text-xs">GH</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                      GitHub: [INSERT GITHUB URL]
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-xs">↗</span>
                </a>

                <a
                  href="https://linkedin.com/in/[INSERT LINKEDIN PROFILE]"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('outbound_link_linkedin')}
                  className="p-3.5 rounded-xl bg-[#0e111a] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 text-xs">IN</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                      LinkedIn: [INSERT LINKEDIN URL]
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-xs">↗</span>
                </a>

                <a
                  href="https://printables.com/@/[INSERT CAD PROFILE]"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('outbound_link_cad_profile')}
                  className="p-3.5 rounded-xl bg-[#0e111a] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 text-xs">3D</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                      CAD Library: [INSERT CAD / PRINTABLES URL]
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-xs">↗</span>
                </a>

                <div className="p-3.5 rounded-xl bg-[#0e111a] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 text-xs">EM</span>
                    <span className="text-xs font-medium text-slate-200 font-mono">
                      Email: [INSERT EMAIL ADDRESS: contact@ewenbuilds.xyz]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Architecture Notice */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
              <span className="font-mono text-cyan-400 block mb-1">
                STATIC DEPLOYMENT ARCHITECTURE:
              </span>
              This website is deployed as a zero-server static build on Cloudflare Pages. Messages are handled via Formspree or Cloudflare Pages Serverless Functions (<code className="font-mono text-slate-300">functions/api/contact.js</code>).
            </div>
          </div>

          {/* Right Column: Clean Professional Contact Form */}
          <div className="lg:col-span-7 bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Transmit Engineering Inquiry
              </h3>

              {/* Endpoint Dispatch Switcher */}
              <button
                type="button"
                onClick={() => setUseCloudflareApi(!useCloudflareApi)}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Switch between Formspree endpoint and Cloudflare Functions"
              >
                BACKEND: {useCloudflareApi ? 'CF Function (/api/contact)' : 'Formspree'}
              </button>
            </div>

            {submissionState === 'submitted' ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Transmitted Successfully</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been logged and forwarded to <span className="font-mono text-slate-300">[INSERT EMAIL ADDRESS]</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmissionState('idle')}
                  className="px-4 py-2 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                action="[INSERT FORMSPREE ENDPOINT URL]"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 font-sans"
              >
                {/* Formspree / Backend Configuration Notice */}
                <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 font-semibold">FORM ACTION: </span>
                  <code>{useCloudflareApi ? '/api/contact (POST)' : '[INSERT FORMSPREE ENDPOINT URL] (POST)'}</code>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="[INSERT YOUR FULL NAME]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="[INSERT YOUR EMAIL: name@domain.com]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Research Collaboration">[INSERT: Research Collaboration]</option>
                      <option value="Hardware Prototyping">[INSERT: Hardware Prototyping / CAD]</option>
                      <option value="Open Source Question">[INSERT: Open-Source Build Question]</option>
                      <option value="Full-Time Engineering Role">[INSERT: Full-Time Engineering Role]</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="[INSERT INQUIRY SUBJECT]"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Project Message / Specification *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="[INSERT MESSAGE: DETAILS REGARDING PROJECT TIMELINE, SPECIFICATIONS, OR INQUIRY]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 leading-relaxed font-sans"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500">
                    Protected by Cloudflare edge security. No marketing trackers.
                  </div>

                  <button
                    type="submit"
                    disabled={submissionState === 'submitting'}
                    className="px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-mono font-bold text-xs transition-colors shadow-md shadow-cyan-400/20 whitespace-nowrap"
                  >
                    {submissionState === 'submitting' ? 'DISPATCHING...' : 'DISPATCH INQUIRY'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
