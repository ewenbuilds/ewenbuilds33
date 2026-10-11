/**
 * Google <model-viewer> Web Component Integration
 * Statically loads 3D .glb models from public/models/ without server-side dependencies.
 * Includes interactive camera controls, auto-rotate toggles, lighting presets,
 * and an active fallback canvas with geometry controls.
 */

import React, { useState, useRef, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

interface ThreeDModelViewerProps {
  modelPath: string;
  modelPlaceholder: string;
  title: string;
}

export const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({
  modelPath,
  modelPlaceholder,
  title,
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<'shaded' | 'wireframe' | 'xray'>('shaded');
  const [activePreset, setActivePreset] = useState<'studio' | 'neutral' | 'dramatic'>('studio');
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);
  const modelViewerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check if model file exists statically; if not, render high-fidelity canvas simulation
  useEffect(() => {
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        setModelAvailable(res.ok);
      })
      .catch(() => {
        setModelAvailable(false);
      });
  }, [modelPath]);

  // Fallback 3D Canvas rendering a rotating mechanical kinematic gimbal
  useEffect(() => {
    if (modelAvailable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0.6;
    let angleY = 0;
    let angleZ = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      if (autoRotate) {
        angleY += 0.012;
        angleZ += 0.004;
      }

      // Draw subtle isometric grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = -width; x < width * 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x + height * 0.5, 0);
        ctx.stroke();
      }

      // Draw 3D Kinematic Hexapod / Gimbal wireframe representation
      ctx.save();
      ctx.translate(centerX, centerY);

      // Rings of the actuator / chassis
      const rings = [
        { r: 90, tilt: angleY, color: '#38bdf8' },
        { r: 65, tilt: -angleY * 1.5, color: '#06b6d4' },
        { r: 40, tilt: angleY * 0.8, color: '#a855f7' },
      ];

      rings.forEach((ring) => {
        ctx.strokeStyle = viewMode === 'xray' ? 'rgba(56, 189, 248, 0.4)' : ring.color;
        ctx.lineWidth = viewMode === 'wireframe' ? 1.5 : 2;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const px = ring.r * Math.cos(a);
          const py = ring.r * Math.sin(a) * Math.sin(angleX + ring.tilt);
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // 6-Leg Hexapod Kinematic Vectors
      const legs = 6;
      for (let i = 0; i < legs; i++) {
        const baseAngle = (i * (Math.PI * 2)) / legs + angleY;
        const x1 = Math.cos(baseAngle) * 75;
        const y1 = Math.sin(baseAngle) * 75 * Math.sin(angleX);

        // Femur joint
        const femurAngle = baseAngle + 0.3 * Math.sin(angleY * 2 + i);
        const x2 = x1 + Math.cos(femurAngle) * 55;
        const y2 = y1 + Math.sin(femurAngle) * 40;

        // Tibia joint to ground
        const x3 = x2 + Math.cos(femurAngle + 0.6) * 45;
        const y3 = y2 + 35 + Math.sin(angleY * 3 + i) * 10;

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();

        // Joint hubs
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x1, y1, 3.5, 0, Math.PI * 2);
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Foot contact pad
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(x3, y3, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [modelAvailable, autoRotate, viewMode]);

  const handleResetCamera = () => {
    trackEvent('model_reset_camera', { model: title });
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = '0deg 75deg 105%';
      modelViewerRef.current.fieldOfView = 'auto';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e111a] overflow-hidden shadow-2xl relative">
      {/* 3D Top Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 text-xs font-semibold">3D CAD INSPECTOR</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-xs text-slate-300 font-mono truncate max-w-xs">{title}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">ENGINE:</span>
          <span className="text-cyan-300">Google &lt;model-viewer&gt; 4.0</span>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#07090e] flex items-center justify-center overflow-hidden">
        {modelAvailable ? (
          /* Actual Google <model-viewer> Web Component */
          <model-viewer
            ref={modelViewerRef}
            src={modelPath}
            alt={`${title} 3D GLB Model`}
            auto-rotate={autoRotate ? true : undefined}
            camera-controls
            shadow-intensity="1"
            shadow-softness="0.8"
            exposure={activePreset === 'dramatic' ? '1.4' : activePreset === 'neutral' ? '0.9' : '1.1'}
            loading="lazy"
            reveal="auto"
            style={{ width: '100%', height: '100%', outline: 'none' }}
          />
        ) : (
          /* Interactive Procedural 3D Canvas Fallback with Visual Instructions */
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
            />

            {/* Static Asset Placeholder Instruction Badge */}
            <div className="absolute top-4 left-4 max-w-sm bg-slate-950/85 backdrop-blur-md border border-slate-800 p-3 rounded-lg text-left shadow-lg pointer-events-auto">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-1">
                STATIC 3D MODEL TARGET PATH:
              </div>
              <code className="text-[11px] text-white block bg-slate-900 p-1.5 rounded border border-slate-800/80 break-all font-mono">
                {modelPlaceholder}
              </code>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                To view your real CAD mesh, export as <span className="text-cyan-300">.glb</span> from Fusion 360 / Blender and place in <span className="text-slate-300 font-mono">public/models/</span>.
              </p>
            </div>
          </div>
        )}

        {/* Floating Viewport Quick Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1.5 rounded-lg shadow-xl text-xs font-mono">
          <button
            onClick={() => {
              trackEvent('model_toggle_rotate', { autoRotate: !autoRotate });
              setAutoRotate(!autoRotate);
            }}
            className={`px-2.5 py-1 rounded transition-colors ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Automatic Camera Orbit"
          >
            {autoRotate ? 'ROTATING' : 'PAUSED'}
          </button>

          <button
            onClick={() => {
              const nextMode = viewMode === 'shaded' ? 'wireframe' : viewMode === 'wireframe' ? 'xray' : 'shaded';
              trackEvent('model_toggle_render_mode', { mode: nextMode });
              setViewMode(nextMode);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
            title="Toggle Render Shading"
          >
            {viewMode.toUpperCase()}
          </button>

          <button
            onClick={handleResetCamera}
            className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-900 rounded transition-colors"
            title="Reset Camera Orientation"
          >
            RESET
          </button>
        </div>

        {/* Viewport Coordinates Overlay */}
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 bg-slate-950/70 backdrop-blur-sm px-2 py-1 rounded border border-slate-800/60 pointer-events-none">
          ORBIT: X:0° Y:0° Z:0° · FOV: 45° · SCALE: 1:1
        </div>
      </div>

      {/* Model Spec Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-t border-slate-800 text-xs font-mono">
        <div className="px-2 py-1">
          <span className="text-slate-500 block text-[10px]">TOLERANCE FIT</span>
          <span className="text-slate-200">ISO 286-2 (JS7/h6)</span>
        </div>
        <div className="px-2 py-1">
          <span className="text-slate-500 block text-[10px]">EXPORT FORMATS</span>
          <span className="text-cyan-300">STEP, STL, GLB</span>
        </div>
        <div className="px-2 py-1">
          <span className="text-slate-500 block text-[10px]">CAD SYSTEM</span>
          <span className="text-slate-200">SolidWorks 2025</span>
        </div>
        <div className="px-2 py-1">
          <span className="text-slate-500 block text-[10px]">LICENSE</span>
          <span className="text-slate-200">CERN-OHL-S v2</span>
        </div>
      </div>
    </div>
  );
};
