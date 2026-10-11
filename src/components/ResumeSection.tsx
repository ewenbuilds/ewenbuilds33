/**
 * Resume Section Component
 * Displays candidate resume fully and cleanly integrated on the webpage.
 * Features a prominent "Download Original PDF" button and explicit bracket placeholders.
 */

import React, { useState } from 'react';
import { RESUME_DATA } from '../data/mockData';
import { trackEvent, triggerFileDownload } from '../utils/analytics';

export const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'skills' | 'education'>('all');

  const handleDownloadPdf = () => {
    trackEvent('download_resume_pdf', {
      candidate: RESUME_DATA.candidateName,
      filePath: RESUME_DATA.pdfDownloadPath,
    });
    triggerFileDownload(
      RESUME_DATA.pdfDownloadPath,
      '[INSERT RESUME FILE: Ewen_Chen_Hardware_Systems_Engineer_Resume].pdf',
      'resume'
    );
  };

  return (
    <section id="resume" className="py-20 border-t border-slate-800/80 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              CURRICULUM VITAE & TECHNICAL DOSSIER
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Professional Engineering Resume
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Native on-page curriculum vitae covering hardware research, production electromechanical design, and engineering competencies.
            </p>
          </div>

          {/* PROMINENT "DOWNLOAD ORIGINAL PDF" BUTTON */}
          <button
            onClick={handleDownloadPdf}
            className="px-6 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            title="Download Original Resume in PDF Format"
          >
            <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>DOWNLOAD ORIGINAL PDF</span>
          </button>
        </div>

        {/* Integrated Clean Document Container */}
        <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          {/* Resume Header Header Lockup */}
          <div className="pb-8 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {RESUME_DATA.candidateName}
                </h3>
                <div className="text-sm font-mono text-cyan-400 mt-1">
                  {RESUME_DATA.headline}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 sm:text-right space-y-1">
                <div>{RESUME_DATA.location}</div>
                <div>PDF PATH: <span className="text-slate-300">{RESUME_DATA.pdfDownloadPath}</span></div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <span className="font-mono text-xs uppercase text-slate-400 block mb-1">
                EXECUTIVE SUMMARY
              </span>
              {RESUME_DATA.summary}
            </div>
          </div>

          {/* Section 1: Education */}
          <div className="py-8 border-b border-slate-800">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              ACADEMIC EDUCATION & DEGREES
            </h4>

            {RESUME_DATA.education.map((edu, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-base font-bold text-white">
                    {edu.degree}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {edu.duration}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  <span>{edu.institution}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-cyan-300">{edu.gpa}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                  {edu.coursework}
                </p>
              </div>
            ))}
          </div>

          {/* Section 2: Professional Experience */}
          <div className="py-8 border-b border-slate-800">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              ENGINEERING EXPERIENCE & INDUSTRY ROLES
            </h4>

            <div className="space-y-8">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="text-base font-bold text-white">
                      {exp.role}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span>{exp.organization}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-2 pt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-1 font-mono">▸</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Technical Skills Matrix */}
          <div className="py-8 border-b border-slate-800">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              TECHNICAL COMPETENCIES & TOOLCHAINS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs font-mono font-semibold text-white mb-2">
                  CAD &amp; Geometric Modeling
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  {RESUME_DATA.skills.cadModeling.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs font-mono font-semibold text-white mb-2">
                  Simulation &amp; FEA/CFD
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  {RESUME_DATA.skills.simulationAnalysis.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs font-mono font-semibold text-white mb-2">
                  PCB Layout &amp; Power Electronics
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  {RESUME_DATA.skills.electricalEda.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs font-mono font-semibold text-white mb-2">
                  Embedded Firmware &amp; Software
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  {RESUME_DATA.skills.firmwareSoftware.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 sm:col-span-2">
                <div className="text-xs font-mono font-semibold text-white mb-2">
                  Machining &amp; Laboratory Fabrication
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
                  {RESUME_DATA.skills.fabricationTools.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Publications */}
          <div className="pt-8">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
              PUBLICATIONS & PATENTS
            </h4>

            {RESUME_DATA.publications.map((pub, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white text-sm">{pub.title}</div>
                <div className="text-slate-400 font-mono">{pub.venue} · {pub.year}</div>
                <div className="text-cyan-400 font-mono">{pub.doi}</div>
              </div>
            ))}
          </div>

          {/* Bottom Download Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              Direct PDF archive: <span className="text-slate-200">{RESUME_DATA.pdfDownloadPath}</span>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
