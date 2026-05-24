// MermaidChart.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  chartDefinition: string;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ chartDefinition }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Initialize mermaid and render chart
  useEffect(() => {
    const init = async () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';

        mermaid.initialize({ 
          startOnLoad: false,
          theme: 'default'
        });

        const id = `mermaid-${Math.floor(Math.random() * 100000)}`;
        
        try {
          const { svg } = await mermaid.render(id, chartDefinition);
          chartRef.current.innerHTML = svg;
          
          // Store reference to the SVG element
          svgRef.current = chartRef.current.querySelector('svg');
          
          // Reset scale and position when chart changes
          setScale(1);
          setPosition({ x: 0, y: 0 });
          
          // Apply initial transform
          if (svgRef.current) {
            svgRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
            svgRef.current.style.transformOrigin = '0 0';
          }
        } catch (error) {
          console.error('Error rendering mermaid chart:', error);
        }
      }
    };
    
    init();
  }, [chartDefinition]);

  // Apply transform when scale or position changes
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
    }
  }, [scale, position]);

  // Zoom handlers
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.25, 0.25));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse event handlers for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  }, [isDragging, startPos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  // Wheel event for zoom with Ctrl key
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.25, Math.min(prev + delta, 3)));
    }
  }, []);

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative overflow-hidden border border-gray-300 rounded-lg bg-white">
      {/* Controls */}
      <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <button 
          onClick={zoomOut}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-lg font-medium text-gray-700"
          title="Zoom Out"
        >
          -
        </button>
        <button 
          onClick={resetZoom}
          className="px-3 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-sm font-medium text-gray-700 min-w-[60px]"
          title="Reset Zoom"
        >
          {Math.round(scale * 100)}%
        </button>
        <button 
          onClick={zoomIn}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-lg font-medium text-gray-700"
          title="Zoom In"
        >
          +
        </button>
      </div>

      {/* Chart container with drag support */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab h-full w-full"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        <div 
          ref={chartRef} 
          className="mermaid-container flex items-center justify-center min-h-[400px] pointer-events-none"
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs text-gray-600 border border-gray-200">
        Drag to pan • Ctrl+Scroll to zoom
      </div>
    </div>
  );
};