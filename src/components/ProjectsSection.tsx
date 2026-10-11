/**
 * Projects Section Component
 * Displays academic and personal engineering projects with native on-page documentation:
 * [INSERT ABSTRACT], [INSERT METHODOLOGY], [INSERT BILL OF MATERIALS (BOM)], [INSERT CONCLUSION].
 * Each project includes a prominent .zip download button.
 */

import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';
import { trackEvent, triggerFileDownload } from '../utils/analytics';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [activeDocTab, setActiveDocTab] = useState<'abstract' | 'methodology' | 'bom' | 'conclusion'>('abstract');

  const categories = ['All', 'Academic Research', 'Hardware Prototyping'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const activeProject: Project =
    PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  const handleDownloadZip = (project: Project) => {
    trackEvent('download_project_zip', {
      projectId: project.id,
      title: project.title,
      fileName: project.zipArchiveFilename,
    });
    triggerFileDownload(project.zipDownloadPath, project.zipArchiveFilename, 'project_zip');
  };

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              ACADEMIC & PERSONAL HARDWARE ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Peer-Reviewed Projects & Documentation
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Full web-integrated engineering dossiers including mechanical methodology, electrical architectures, component BOMs, and empirical conclusions.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  trackEvent('filter_projects', { category: cat });
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects Selector Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider px-1">
              SELECT REPOSITORY ({filteredProjects.length})
            </div>

            {filteredProjects.map((project) => {
              const isSelected = project.id === activeProjectId;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    trackEvent('select_project_detail', { projectId: project.id });
                    setActiveProjectId(project.id);
                  }}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/30'
                      : 'bg-[#0e111a] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-cyan-400">{project.category}</span>
                    <span className="font-mono text-slate-500">{project.date}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
                    <span className="font-mono text-slate-400">{project.codeName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.tags.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Native Web-Integrated Project Documentation Dossier */}
          <div className="lg:col-span-8 bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Dossier Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{activeProject.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{activeProject.codeName}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{activeProject.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white text-balance">
                  {activeProject.title}
                </h3>
              </div>

              {/* HIGHLY VISIBLE DOWNLOAD BUTTON FOR ORIGINAL PROJECT .ZIP */}
              <button
                onClick={() => handleDownloadZip(activeProject)}
                className="px-5 py-3 text-xs font-mono font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-400/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                title={`Download original project files as .zip (${activeProject.zipArchiveFilename})`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>DOWNLOAD PROJECT (.ZIP)</span>
              </button>
            </div>

            {/* Documentation Section Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 my-6 p-1 bg-slate-950 border border-slate-800/90 rounded-lg">
              <button
                onClick={() => {
                  trackEvent('tab_doc_abstract', { project: activeProject.id });
                  setActiveDocTab('abstract');
                }}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  activeDocTab === 'abstract'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                [INSERT ABSTRACT]
              </button>

              <button
                onClick={() => {
                  trackEvent('tab_doc_methodology', { project: activeProject.id });
                  setActiveDocTab('methodology');
                }}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  activeDocTab === 'methodology'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                [INSERT METHODOLOGY]
              </button>

              <button
                onClick={() => {
                  trackEvent('tab_doc_bom', { project: activeProject.id });
                  setActiveDocTab('bom');
                }}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  activeDocTab === 'bom'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                [INSERT BILL OF MATERIALS (BOM)]
              </button>

              <button
                onClick={() => {
                  trackEvent('tab_doc_conclusion', { project: activeProject.id });
                  setActiveDocTab('conclusion');
                }}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  activeDocTab === 'conclusion'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                [INSERT CONCLUSION]
              </button>
            </div>

            {/* Tab 1: Abstract */}
            {activeDocTab === 'abstract' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  EXECUTIVE ABSTRACT & PROBLEM FORMULATION
                </div>
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-300 leading-relaxed font-sans">
                  {activeProject.documentation.abstract}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                      [INSERT RESEARCH NOVELTY]
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      [INSERT NOVELTY DETAILS: Demonstrates mathematical convergence of high-torque direct-drive actuation with zero backlash harmonic reductions.]
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                      [INSERT VALIDATION CRITERIA]
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      [INSERT CRITERIA: High-speed dynamometer load testing under 100% duty cycle at ambient temperature of 25°C.]
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Methodology */}
            {activeDocTab === 'methodology' && (
              <div className="space-y-5">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  SYSTEM METHODOLOGY & ENGINEERING ARCHITECTURE
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <h4 className="text-xs font-mono font-semibold text-white mb-2 uppercase">
                      1. Kinematic & System Architecture
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.methodology.systemArchitecture}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <h4 className="text-xs font-mono font-semibold text-white mb-2 uppercase">
                      2. Schematic Design & Electronics Interfacing
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.methodology.schematicDesign}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <h4 className="text-xs font-mono font-semibold text-white mb-2 uppercase">
                      3. Fabrication, Tolerances & Machining
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.methodology.fabricationNotes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Bill of Materials (BOM) */}
            {activeDocTab === 'bom' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    [INSERT BILL OF MATERIALS (BOM)] — SOURCING AUDIT
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {activeProject.documentation.bom.length} Line Items
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Component Name</th>
                        <th className="py-3 px-3">Ref Des</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Supplier & Part #</th>
                        <th className="py-3 px-3 text-right">Qty</th>
                        <th className="py-3 px-4 text-right">Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 font-sans">
                      {activeProject.documentation.bom.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-200">
                            {item.partName}
                            <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                              {item.datasheetUrl}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-400">{item.designator}</td>
                          <td className="py-3 px-3 text-slate-400">{item.category}</td>
                          <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                            {item.supplier}
                            <div className="text-slate-500">{item.partNumber}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-4 text-right font-mono tabular-nums text-cyan-300">
                            {item.estCost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
                  <span>Component prices are estimated for single-unit prototyping batches.</span>
                  <span className="font-mono text-slate-400">All parts RoHS & REACH verified</span>
                </div>
              </div>
            )}

            {/* Tab 4: Conclusion */}
            {activeDocTab === 'conclusion' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  [INSERT CONCLUSION] — EMPIRICAL VALIDATION & FINDINGS
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 mb-1">
                      1. Measured Test Results & Benchmarks
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.conclusion.testResults}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 mb-1">
                      2. Efficiency & Power Consumption Metrics
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.conclusion.efficiencyMetrics}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 mb-1">
                      3. Future Architectural Iterations
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProject.documentation.conclusion.futureIterations}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Archive Download Ribbon */}
            <div className="mt-8 pt-6 border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
              <div className="text-xs text-slate-400">
                <div className="font-mono text-slate-300 font-medium">Archive path: {activeProject.zipDownloadPath}</div>
                <div>Includes full source code, native CAD models (.step / .stl), and schematic PDFs.</div>
              </div>

              <button
                onClick={() => handleDownloadZip(activeProject)}
                className="py-2.5 px-4 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download {activeProject.zipArchiveFilename}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
