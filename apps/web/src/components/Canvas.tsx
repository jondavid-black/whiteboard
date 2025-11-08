import React, { useRef, useEffect, useState } from 'react';

/**
 * Canvas: Infinite panning and zooming canvas area.
 * - Fills available screen space
 * - Manages pan/zoom state
 */
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // Placeholder for future: content state

  // No need for resize effect: style uses 100vw/100vh for full-screen

  // Infinite panning and zooming logic
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPan((prev) => ({
        x: prev.x + (e.clientX - lastX),
        y: prev.y + (e.clientY - lastY),
      }));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMouseUp = () => {
      dragging = false;
      el.style.cursor = 'grab';
    };

    // Touch events
    let lastTouchDist = 0;
    const getTouchDist = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && dragging) {
        setPan((prev) => ({
          x: prev.x + (e.touches[0].clientX - lastX),
          y: prev.y + (e.touches[0].clientY - lastY),
        }));
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        if (lastTouchDist) {
          setZoom((prev) => Math.max(0.1, Math.min(10, prev * (dist / lastTouchDist))));
        }
        lastTouchDist = dist;
      }
    };
    const onTouchEnd = () => {
      dragging = false;
      lastTouchDist = 0;
    };

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom gesture
        setZoom((prev) => Math.max(0.1, Math.min(10, prev - e.deltaY * 0.01)));
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
      el.style.cursor = 'default';
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        background: '#f9f9fb',
        touchAction: 'none',
        outline: 'none',
        boxSizing: 'border-box',
      }}
      tabIndex={0}
      aria-label="Infinite Canvas"
      role="region"
      aria-live="polite"
    >
      {/* Canvas content will go here */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Future: Render canvas objects here */}
      </div>
    </div>
  );
};

export default Canvas;
