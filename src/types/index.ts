/**
 * Type definitions for EWENBUILDS.xyz
 */

export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imagePlaceholder: string;
  imagePath: string;
  cadFileRef: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface BomItem {
  id: string;
  partName: string;
  designator: string;
  category: 'Mechanical' | 'Electronics' | 'Fasteners' | 'Sensors' | 'Firmware/MCU';
  supplier: string;
  partNumber: string;
  quantity: number;
  estCost: string;
  datasheetUrl: string;
}

export interface BuildStep {
  stepNumber: number;
  title: string;
  estimatedTime: string;
  requiredTools: string[];
  description: string;
  safetyNote?: string;
  cadSnapshotPlaceholder: string;
}

export interface ProjectDocumentation {
  abstract: string;
  methodology: {
    systemArchitecture: string;
    schematicDesign: string;
    fabricationNotes: string;
  };
  bom: BomItem[];
  conclusion: {
    testResults: string;
    efficiencyMetrics: string;
    futureIterations: string;
  };
}

export interface Project {
  id: string;
  title: string;
  codeName: string;
  category: 'Academic Research' | 'Hardware Prototyping' | 'Robotics & Control' | 'Embedded Systems';
  date: string;
  summary: string;
  tags: string[];
  zipArchiveFilename: string;
  zipDownloadPath: string;
  cadModelFilename?: string;
  documentation: ProjectDocumentation;
}

export interface OpenSourceRelease {
  id: string;
  title: string;
  version: string;
  license: string;
  description: string;
  modelGlbPath: string;
  modelGlbPlaceholder: string;
  cadStlZipPath: string;
  fullRepoZipPath: string;
  buildSteps: BuildStep[];
  bom: BomItem[];
}
