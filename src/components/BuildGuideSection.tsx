/**
 * Build Guides & 3D Open Source Downloads Section
 * Native on-page integration of build guide steps, Bill of Materials (BOM),
 * Google <model-viewer> 3D inspector, and the TWO MANDATORY DISTINCT DOWNLOAD BUTTONS:
 * 1. Specific build files (CAD, STL/STEP only)
 * 2. FULL project repository (.zip)
 */

import React, { useState } from 'react';
import { OPEN_SOURCE_SHOWCASE } from '../data/mockData';
import { ThreeDModelViewer } from './ThreeDModelViewer';
import { trackEvent, triggerFileDownload } from '../utils/analytics';

export const BuildGuideSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [bomFilter, setBomFilter] = useState<string>('All');

  const release = OPEN_SOURCE_SHOWCASE;

  const handleDownloadCadStl = () => {
    trackEvent('download_cad_stl_specific', {
      releaseId: release.id,
      title: release.title,
      filePath: release.cadStlZipPath,
    });
    triggerFileDownload(
      release.cadStlZipPath,
      '[INSERT CAD STL STEP FILE: hexapod-cad-stl-step-pack].zip',
      'cad_stl'
    );
  };

  const handleDownloadFullRepo = () => {
    trackEvent('download_full_repository_zip', {
      releaseId: release.id,
      title: release.title,
      filePath: release.fullRepoZipPath,
    });
    triggerFileDownload(
      release.fullRepoZipPath,
      '[INSERT FULL REPO: hexapod-complete-open-source-repo].zip',
      'project_zip'
    );
  };

  const currentStep = release.buildSteps[activeStepIndex];

  const filteredBom =
    bomFilter === 'All'
      ? release.bom
      : release.bom.filter((item) => item.category === bomFilter);

  const bomCategories = ['All', 'Mechanical', 'Firmware/MCU', 'Fasteners', 'Electronics'];

  return (
    <section id="build-guides" className="py-20 border-t border-slate-800/80 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            OPEN-SOURCE HARDWARE LAB & BUILD GUIDES
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                3D CAD Models, Assembly Instructions & BOM
              </h2>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
                Step-by-step fabrication manuals with mechanical clearances, heat-set insert procedures, firmware flashing steps, and interactive 3D model visualization.
              </p>
            </div>

            {/* MANDATORY: TWO DISTINCT DOWNLOAD BUTTONS PER ITEM */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* BUTTON 1: Specific Build Files (CAD, STL/STEP only) */}
              <button
                onClick={handleDownloadCadStl}
                className="px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                title="Download specific CAD, STL 3D-printable meshes, and STEP models only"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>1. DOWNLOAD CAD &amp; STL/STEP ONLY</span>
              </button>

              {/* BUTTON 2: FULL Project Repository (.zip) */}
              <button
                onClick={handleDownloadFullRepo}
                className="px-5 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold transition-all shadow-md shadow-cyan-400/20 flex items-center justify-center gap-2"
                title="Download full project repository (.zip) including firmware, schematics, and docs"
              >
                <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>2. DOWNLOAD FULL REPO (.ZIP)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Model Viewer & Release Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* 3D Model Viewer Column */}
          <div className="lg:col-span-7">
            <ThreeDModelViewer
              modelPath={release.modelGlbPath}
              modelPlaceholder={release.modelGlbPlaceholder}
              title={release.title}
            />
          </div>

          {/* Release Specifications & License Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>RELEASE: {release.version}</span>
                  <span aria-hidden="true">·</span>
                  <span>OPEN-SOURCE HARDWARE</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {release.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {release.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-mono">Hardware License:</span>
                  <span className="text-slate-200 font-mono text-[11px] text-right truncate max-w-[200px]">
                    {release.license}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-mono">CAD Environment:</span>
                  <span className="text-slate-200 font-mono">SolidWorks / STEP AP242</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-mono">Total Part Count:</span>
                  <span className="text-cyan-400 font-mono tabular-nums">42 Components (18 Servos)</span>
                </div>
              </div>

              {/* Two Distinct Download Action Cards */}
              <div className="pt-2 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Specific Build Files</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {release.cadStlZipPath}
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadCadStl}
                    className="px-3.5 py-1.5 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700 transition-colors whitespace-nowrap"
                  >
                    CAD/STL (.zip)
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Full Project Repository</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {release.fullRepoZipPath}
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadFullRepo}
                    className="px-3.5 py-1.5 text-xs font-mono bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded transition-colors whitespace-nowrap"
                  >
                    Full Repo (.zip)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NATIVE ON-PAGE INTEGRATION OF BUILD GUIDE STEPS */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                FABRICATION & ASSEMBLY PROTOCOL
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Native Step-by-Step Build Guide
              </h3>
            </div>

            {/* Step Selection Buttons */}
            <div className="flex items-center gap-2">
              {release.buildSteps.map((step, idx) => (
                <button
                  key={step.stepNumber}
                  onClick={() => {
                    trackEvent('select_build_step', { step: step.stepNumber });
                    setActiveStepIndex(idx);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    idx === activeStepIndex
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Step 0{step.stepNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Detailed Card */}
          <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  PHASE 0{currentStep.stepNumber}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentStep.title}
                </h4>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                Duration: <span className="text-slate-200">{currentStep.estimatedTime}</span>
              </div>
            </div>

            {/* Tools Required Bar */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                REQUIRED TOOLS & INSTRUMENTATION:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentStep.requiredTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-sans text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Step Instructions */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-300 leading-relaxed font-sans">
              {currentStep.description}
            </div>

            {/* Safety Note if present */}
            {currentStep.safetyNote && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/50 text-xs text-amber-300/90 leading-relaxed font-sans">
                <span className="font-mono font-bold text-amber-400 block mb-1">
                  CRITICAL LAB SAFETY DIRECTIVE:
                </span>
                {currentStep.safetyNote}
              </div>
            )}

            {/* Diagram / CAD Snapshot Reference Box */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">SCHEMATIC DIAGRAM:</span>
                <span>{currentStep.cadSnapshotPlaceholder}</span>
              </div>
              <span className="text-slate-500 hidden sm:inline">Reference Assembly View 2.4-A</span>
            </div>
          </div>
        </div>

        {/* NATIVE BILL OF MATERIALS (BOM) SECTION */}
        <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                SOURCING & PROCUREMENT LEDGER
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Required Bill of Materials (BOM)
              </h3>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
              {bomCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    trackEvent('filter_bom', { category: cat });
                    setBomFilter(cat);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    bomFilter === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* BOM Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Component & Description</th>
                  <th className="py-3 px-3">Designator</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Supplier &amp; Part #</th>
                  <th className="py-3 px-3 text-right">Qty</th>
                  <th className="py-3 px-4 text-right">Est. Unit / Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 font-sans">
                {filteredBom.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-200">
                      {item.partName}
                      <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                        {item.datasheetUrl}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{item.designator}</td>
                    <td className="py-3.5 px-3 text-slate-400">{item.category}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-300">
                      {item.supplier}
                      <div className="text-slate-500">{item.partNumber}</div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-200">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-cyan-300">
                      {item.estCost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div>
              <span>Export BOM as CSV / JSON available in full repository bundle.</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCadStl}
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Download CAD Package →
              </button>
              <button
                onClick={handleDownloadFullRepo}
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Download Entire Repo (.zip) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
