/**
 * TypeScript Declarations for Google <model-viewer> Web Component in React 19
 */

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    src?: string;
    poster?: string;
    alt?: string;
    'auto-rotate'?: boolean | string;
    'camera-controls'?: boolean | string;
    'shadow-intensity'?: string | number;
    'shadow-softness'?: string | number;
    'exposure'?: string | number;
    'environment-image'?: string;
    'camera-orbit'?: string;
    'field-of-view'?: string;
    'min-camera-orbit'?: string;
    'max-camera-orbit'?: string;
    'interaction-prompt'?: string;
    'ar'?: boolean | string;
    'ar-modes'?: string;
    'ar-scale'?: string;
    loading?: 'auto' | 'lazy' | 'eager';
    reveal?: 'auto' | 'interaction' | 'manual';
    style?: React.CSSProperties;
    class?: string;
    className?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': ModelViewerAttributes;
      }
    }
  }
}

export {};
