import React, { useRef, useEffect, useState } from 'react';
import Toolbar, { ToolKey } from './Toolbar';

/**
 * Canvas: Infinite panning and zooming canvas area.
 * - Fills available screen space
 * - Manages pan/zoom state
 */
type Shape =
  | {
      id: string;
      type: 'rectangle' | 'circle' | 'line';
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
    }
  | { id: string; type: 'text'; x: number; y: number; text: string; color: string };

const defaultColor = '#1976d2';

const Canvas: React.FC = () => {
  // Dummy state to force update
  const [, forceUpdate] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [activeTool, setActiveTool] = useState<ToolKey>('rectangle');
  const [drawing, setDrawing] = useState<
    | null
    | { type: 'rectangle' | 'circle' | 'line'; startX: number; startY: number }
    | { type: 'text'; startX: number; startY: number; text?: string }
    | { type: 'eraser'; startX: number; startY: number; x: number; y: number }
  >(null);
  const [inputPos, setInputPos] = useState<{ x: number; y: number } | null>(null);
  const [inputValue, setInputValue] = useState('');

  // No need for resize effect: style uses 100vw/100vh for full-screen

  // Pan/zoom/hand tool logic
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastTouchDist = 0;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      if (activeTool === 'hand') {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        el.style.cursor = 'grabbing';
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (activeTool === 'hand' && dragging) {
        setPan((prev) => ({
          x: prev.x + (e.clientX - lastX),
          y: prev.y + (e.clientY - lastY),
        }));
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onMouseUp = () => {
      dragging = false;
      el.style.cursor = 'grab';
    };

    // Touch events
    const getTouchDist = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (activeTool === 'hand' && e.touches.length === 1) {
        dragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (activeTool === 'hand' && e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (activeTool === 'hand' && e.touches.length === 1 && dragging) {
        setPan((prev) => ({
          x: prev.x + (e.touches[0].clientX - lastX),
          y: prev.y + (e.touches[0].clientY - lastY),
        }));
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (activeTool === 'hand' && e.touches.length === 2) {
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
      if (activeTool === 'hand' && (e.ctrlKey || e.metaKey)) {
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
    el.style.cursor = activeTool === 'hand' ? 'grab' : 'crosshair';

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
  }, [activeTool, pan.x, pan.y, zoom]);

  // Drawing logic for shapes and erasing
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'hand') return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    if (activeTool === 'eraser') {
      setDrawing({ type: 'eraser', startX: x, startY: y, x, y });
      return;
    }
    if (activeTool === 'text') {
      setInputPos({ x, y });
      setInputValue('');
      return;
    }
    if (activeTool === 'rectangle' || activeTool === 'circle' || activeTool === 'line') {
      setDrawing({ type: activeTool, startX: x, startY: y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;
    if (drawing.type === 'eraser') {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      setDrawing((prev) => (prev && prev.type === 'eraser' ? { ...prev, x, y } : prev));
      return;
    }
    // For live preview, could update a temp shape here
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    if (drawing.type === 'rectangle' || drawing.type === 'circle') {
      // Normalize to always use top-left as (x, y) and positive width/height
      const x1 = drawing.startX;
      const y1 = drawing.startY;
      const x2 = x;
      const y2 = y;
      const left = Math.min(x1, x2);
      const top = Math.min(y1, y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);
      setShapes((prev) => [
        ...prev,
        {
          id: `${drawing.type}-${Date.now()}`,
          type: drawing.type,
          x: left,
          y: top,
          w: width,
          h: height,
          color: defaultColor,
        } as Shape,
      ]);
    } else if (drawing.type === 'line') {
      setShapes((prev) => [
        ...prev,
        {
          id: `${drawing.type}-${Date.now()}`,
          type: drawing.type,
          x: drawing.startX,
          y: drawing.startY,
          w: x - drawing.startX,
          h: y - drawing.startY,
          color: defaultColor,
        } as Shape,
      ]);
    }
    if (drawing.type === 'eraser') {
      // Compute selection box
      const x1 = Math.min(drawing.startX, drawing.x);
      const y1 = Math.min(drawing.startY, drawing.y);
      const x2 = Math.max(drawing.startX, drawing.x);
      const y2 = Math.max(drawing.startY, drawing.y);
      const isPoint = Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1;
      setShapes((prev) =>
        prev.filter((shape) => {
          if (isPoint) {
            // Single click: erase shape if point is inside
            if (shape.type === 'rectangle') {
              // Always use min/max for bounds to handle negative width/height
              const rx1 = Math.min(shape.x, shape.x + shape.w);
              const rx2 = Math.max(shape.x, shape.x + shape.w);
              const ry1 = Math.min(shape.y, shape.y + shape.h);
              const ry2 = Math.max(shape.y, shape.y + shape.h);
              return !(x1 >= rx1 && x1 <= rx2 && y1 >= ry1 && y1 <= ry2);
            }
            if (shape.type === 'circle') {
              // Check if point is inside ellipse
              const rx = shape.w / 2;
              const ry = shape.h / 2;
              const cx = shape.x + rx;
              const cy = shape.y + ry;
              const norm = (x1 - cx) ** 2 / rx ** 2 + (y1 - cy) ** 2 / ry ** 2;
              // Force update to ensure DOM is updated for tests
              forceUpdate((n) => n + 1);
              return norm > 1;
            }
            if (shape.type === 'line') {
              // Check if point is near the line segment
              const xA = shape.x,
                yA = shape.y,
                xB = shape.x + shape.w,
                yB = shape.y + shape.h;
              const dist =
                ((xB - xA) * (yA - y1) - (xA - x1) * (yB - yA)) / Math.hypot(xB - xA, yB - yA);
              const minX = Math.min(xA, xB),
                maxX = Math.max(xA, xB);
              const minY = Math.min(yA, yB),
                maxY = Math.max(yA, yB);
              const onSegment = x1 >= minX && x1 <= maxX && y1 >= minY && y1 <= maxY;
              return !(Math.abs(dist) < 4 && onSegment); // 4px tolerance
            }
            return true;
          } else {
            // Box: erase shape if fully inside selection box
            if (shape.type === 'rectangle') {
              // Always use min/max for bounds to handle negative width/height
              const sx1 = Math.min(shape.x, shape.x + shape.w);
              const sy1 = Math.min(shape.y, shape.y + shape.h);
              const sx2 = Math.max(shape.x, shape.x + shape.w);
              const sy2 = Math.max(shape.y, shape.y + shape.h);
              return sx1 < x1 || sy1 < y1 || sx2 > x2 || sy2 > y2;
            }
            if (shape.type === 'circle') {
              const sx1 = Math.min(shape.x, shape.x + shape.w);
              const sy1 = Math.min(shape.y, shape.y + shape.h);
              const sx2 = Math.max(shape.x, shape.x + shape.w);
              const sy2 = Math.max(shape.y, shape.y + shape.h);
              return sx1 < x1 || sy1 < y1 || sx2 > x2 || sy2 > y2;
            }
            if (shape.type === 'line') {
              const xA = shape.x,
                yA = shape.y,
                xB = shape.x + shape.w,
                yB = shape.y + shape.h;
              const inA = xA >= x1 && xA <= x2 && yA >= y1 && yA <= y2;
              const inB = xB >= x1 && xB <= x2 && yB >= y1 && yB <= y2;
              return !(inA && inB);
            }
            return true;
          }
        }),
      );
    }
    setDrawing(null);
  };

  const handleTextInputBlur = () => {
    setInputPos(null);
    setInputValue('');
  };

  return (
    <div
      ref={canvasRef}
      aria-label="Infinite Canvas"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#fff',
        touchAction: 'none',
      }}
      tabIndex={0}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          left: pan.x,
          top: pan.y,
          width: '100%',
          height: '100%',
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        {/* Shape preview while drawing */}
        {drawing &&
          (drawing.type === 'rectangle' || drawing.type === 'circle' || drawing.type === 'line') &&
          (() => {
            const { startX, startY } = drawing;
            // Use current mouse position from drawing state
            let currX = startX,
              currY = startY;
            if ('x' in drawing && typeof drawing.x === 'number') currX = drawing.x;
            if ('y' in drawing && typeof drawing.y === 'number') currY = drawing.y;
            if (drawing.type === 'rectangle' || drawing.type === 'circle') {
              // Normalize preview to always use top-left and positive width/height
              const x1 = startX;
              const y1 = startY;
              const x2 = currX;
              const y2 = currY;
              const left = Math.min(x1, x2);
              const top = Math.min(y1, y2);
              const width = Math.abs(x2 - x1);
              const height = Math.abs(y2 - y1);
              if (drawing.type === 'rectangle') {
                return (
                  <div
                    className="canvas-shape-preview"
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width,
                      height,
                      border: '2px dashed #bbb',
                      background: 'rgba(200,200,200,0.08)',
                      pointerEvents: 'none',
                      zIndex: 30,
                    }}
                    aria-label="Rectangle preview"
                  />
                );
              } else {
                // circle
                return (
                  <div
                    className="canvas-shape-preview"
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width,
                      height,
                      borderRadius: '50%',
                      border: '2px dashed #bbb',
                      background: 'rgba(200,200,200,0.08)',
                      pointerEvents: 'none',
                      zIndex: 30,
                    }}
                    aria-label="Circle preview"
                  />
                );
              }
            }
            if (drawing.type === 'line') {
              const x1 = startX;
              const y1 = startY;
              const x2 = currX;
              const y2 = currY;
              return (
                <svg
                  className="canvas-shape-preview"
                  style={{
                    position: 'absolute',
                    left: Math.min(x1, x2),
                    top: Math.min(y1, y2),
                    pointerEvents: 'none',
                    overflow: 'visible',
                    zIndex: 30,
                  }}
                  width={Math.abs(x2 - x1)}
                  height={Math.abs(y2 - y1)}
                  aria-label="Line preview"
                >
                  <line
                    x1={x1 < x2 ? 0 : Math.abs(x2 - x1)}
                    y1={y1 < y2 ? 0 : Math.abs(y2 - y1)}
                    x2={x1 < x2 ? Math.abs(x2 - x1) : 0}
                    y2={y1 < y2 ? Math.abs(y2 - y1) : 0}
                    stroke="#bbb"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                </svg>
              );
            }
            return null;
          })()}
        {shapes.map((shape) => {
          if (shape.type === 'rectangle') {
            return (
              <div
                key={shape.id}
                className="canvas-shape"
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.w,
                  height: shape.h,
                  border: `2px solid ${shape.color}`,
                  background: 'transparent',
                  pointerEvents: 'none',
                }}
                aria-label="Rectangle"
              />
            );
          }
          if (shape.type === 'circle') {
            return (
              <div
                key={shape.id}
                className="canvas-shape"
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.w,
                  height: shape.h,
                  borderRadius: '50%',
                  border: `2px solid ${shape.color}`,
                  background: 'transparent',
                  pointerEvents: 'none',
                }}
                aria-label="Circle"
              />
            );
          }
          if (shape.type === 'line') {
            return (
              <svg
                key={shape.id}
                className="canvas-shape"
                style={{
                  position: 'absolute',
                  left: Math.min(shape.x, shape.x + shape.w),
                  top: Math.min(shape.y, shape.y + shape.h),
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
                width={Math.abs(shape.w)}
                height={Math.abs(shape.h)}
                aria-label="Line"
              >
                <line
                  x1={0}
                  y1={0}
                  x2={shape.w}
                  y2={shape.h}
                  stroke={shape.color}
                  strokeWidth={2}
                />
              </svg>
            );
          }
          if (shape.type === 'text') {
            return (
              <div
                key={shape.id}
                className="canvas-shape"
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  color: shape.color,
                  fontSize: 18,
                  fontFamily: 'inherit',
                  pointerEvents: 'none',
                }}
                aria-label="Text"
              >
                {shape.text}
              </div>
            );
          }
          return null;
        })}

        {/* Eraser selection box */}
        {drawing &&
          drawing.type === 'eraser' &&
          typeof drawing.x === 'number' &&
          typeof drawing.y === 'number' && (
            <div
              style={{
                position: 'absolute',
                left: Math.min(drawing.startX, drawing.x),
                top: Math.min(drawing.startY, drawing.y),
                width: Math.abs(drawing.x - drawing.startX),
                height: Math.abs(drawing.y - drawing.startY),
                border: '2px dashed #bbb',
                background: 'rgba(200,200,200,0.08)',
                pointerEvents: 'none',
                zIndex: 20,
              }}
              aria-label="Eraser selection box"
            />
          )}

        {/* Text input for placing text */}
        {inputPos && (
          <input
            type="text"
            style={{
              position: 'absolute',
              left: inputPos.x,
              top: inputPos.y,
              fontSize: 18,
              zIndex: 10,
            }}
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleTextInputBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTextInputBlur();
            }}
            aria-label="Text input"
          />
        )}
      </div>
      {/* Floating Toolbar */}
      <Toolbar activeTool={activeTool} onSelect={setActiveTool} />
    </div>
  );
};

export default Canvas;
