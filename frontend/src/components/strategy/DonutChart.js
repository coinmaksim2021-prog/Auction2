import React from 'react';

/**
 * Interactive donut chart component with hover effects
 * @param {Object} props
 * @param {Array} props.segments - Array of segment objects with name, value, displayValue, unit, percent, color
 * @param {number|null} props.activeSegment - Currently hovered segment index
 * @param {Function} props.setActiveSegment - Function to update active segment
 */
function DonutChart({ segments, activeSegment, setActiveSegment }) {
  const radius = 60;
  const strokeWidth = 28;
  const gap = 8; // Gap between segments in degrees
  const totalGap = gap * segments.length;
  const availableDegrees = 360 - totalGap;

  // Calculate arcs - instant, no animation
  const arcs = React.useMemo(() => {
    const initialAngle = -90 + gap / 2;
    return segments.reduce((acc, segment, index) => {
      const prevAngle = index === 0 ? initialAngle : acc[index - 1].endAngle + gap;
      const segmentDegrees = (segment.percent / 100) * availableDegrees;
      const startAngle = prevAngle;
      const endAngle = prevAngle + segmentDegrees;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 90 + radius * Math.cos(startRad);
      const y1 = 90 + radius * Math.sin(startRad);
      const x2 = 90 + radius * Math.cos(endRad);
      const y2 = 90 + radius * Math.sin(endRad);
      const largeArc = segmentDegrees > 180 ? 1 : 0;

      acc.push({
        ...segment,
        path: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        index,
        endAngle
      });
      return acc;
    }, []);
  }, [segments, gap, availableDegrees, radius]);

  return (
    <div className="flex-shrink-0">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 180 180" className="w-full h-full">
          {/* Background circle */}
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
          
          {/* Segments - separated with gaps and rounded ends */}
          {arcs.map((arc, index) => (
            <g key={arc.name}>
              {/* Wider invisible stroke for easier hover */}
              <path
                d={arc.path}
                fill="none"
                stroke="transparent"
                strokeWidth={strokeWidth + 15}
                strokeLinecap="round"
                className="cursor-pointer"
                onMouseEnter={() => setActiveSegment(index)}
                onMouseLeave={() => setActiveSegment(null)}
              />
              {/* Visible segment */}
              <path
                d={arc.path}
                fill="none"
                stroke={arc.color}
                strokeWidth={activeSegment === index ? strokeWidth + 6 : strokeWidth}
                strokeLinecap="round"
                className="transition-all duration-300 pointer-events-none"
                style={{
                  filter: activeSegment === index ? 'brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none'
                }}
              />
            </g>
          ))}
        </svg>
        
        {/* Center - EMPTY by default, shows value only on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {activeSegment !== null && (
            <div className="text-center">
              <p className="text-sm font-bold" style={{ color: segments[activeSegment].color }}>
                {segments[activeSegment].displayValue}
              </p>
              <p className="text-[10px] text-gray-400">{segments[activeSegment].unit}</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend - Horizontal under chart */}
      <div className="flex justify-center gap-4 mt-3">
        {segments.map((segment, index) => (
          <div 
            key={segment.name}
            className={`flex items-center gap-1.5 cursor-pointer transition-all ${
              activeSegment === index ? 'scale-105' : 'opacity-80 hover:opacity-100'
            }`}
            onMouseEnter={() => setActiveSegment(index)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segment.color }}></span>
            <span className="text-xs font-medium text-gray-700">{segment.name}</span>
          </div>
        ))}
      </div>

      {/* Token Role + Distribution - under chart */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-[7px] font-bold">F</span>
          </div>
          <span className="text-xs text-gray-600">Fees → Buy → Burn/LP</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            85% Protocol
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            15% Team
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
