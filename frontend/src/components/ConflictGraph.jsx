import React, { useRef, useMemo } from 'react';

/**
 * SVG conflict graph — circular layout.
 * Nodes colored in shades of the Dark Navy / Blue palette when unassigned,
 * and in a stepped blue scale when slot assignments are present.
 */

// Blue-family scale for slot differentiation (all within the brand palette)
const SLOT_COLORS = [
  '#2563EB', // blue-600
  '#1D4ED8', // blue-700
  '#3B82F6', // blue-500
  '#1E3A5F', // navy-mid
  '#60A5FA', // blue-400
  '#93C5FD', // blue-300
  '#0F172A', // navy-dark
  '#BFDBFE', // blue-200
  '#1D4ED8',
  '#2563EB',
];

export default function ConflictGraph({ subjects, adjacency, assignment }) {
  const svgRef = useRef(null);
  const W = 700;
  const H = 420;
  const CX = W / 2;
  const CY = H / 2;

  const positions = useMemo(() => {
    const n = subjects.length;
    if (n === 0) return {};
    const pos = {};
    subjects.forEach((s, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      const r = Math.min(CX, CY) * 0.72;
      pos[s.id] = {
        x: CX + r * Math.cos(angle),
        y: CY + r * Math.sin(angle),
      };
    });
    return pos;
  }, [subjects]);

  if (subjects.length === 0) {
    return (
      <div
        className="empty-state"
        style={{ background: '#F8FAFC', borderRadius: 10, padding: 40, border: '1px solid #E2E8F0' }}
      >
        <div className="empty-icon">🔗</div>
        <p>No subjects to visualize.</p>
      </div>
    );
  }

  // Deduplicated edge list
  const edges = [];
  const seen = new Set();
  for (const [nodeId, neighbors] of Object.entries(adjacency || {})) {
    for (const nId of neighbors) {
      const key = [nodeId, nId].sort().join('--');
      if (!seen.has(key) && positions[nodeId] && positions[nId]) {
        seen.add(key);
        edges.push({ from: nodeId, to: nId });
      }
    }
  }

  return (
    <div className="graph-canvas-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Edges */}
        {edges.map(({ from, to }) => {
          const p1 = positions[from];
          const p2 = positions[to];
          return (
            <line
              key={`${from}-${to}`}
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
          );
        })}

        {/* Nodes */}
        {subjects.map(s => {
          const pos = positions[s.id];
          if (!pos) return null;
          const slotNum = assignment ? assignment[s.id] : null;
          // Unassigned nodes: navy; assigned nodes: slot-indexed blue
          const fill = slotNum
            ? SLOT_COLORS[(slotNum - 1) % SLOT_COLORS.length]
            : '#0F172A';
          // Label text color — use white for dark fills, navy for very light fills
          const lightFills = ['#BFDBFE', '#93C5FD'];
          const textFill = lightFills.includes(fill) ? '#1E293B' : '#FFFFFF';

          const shortName = s.code || s.id;
          return (
            <g key={s.id} transform={`translate(${pos.x},${pos.y})`}>
              <circle r="28" fill={fill} />
              <circle r="28" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textFill}
                fontSize="10"
                fontWeight="700"
              >
                {shortName.length > 6 ? shortName.slice(0, 6) : shortName}
              </text>
              {slotNum && (
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y="42"
                  fill={fill}
                  fontSize="10"
                  fontWeight="700"
                >
                  Slot {slotNum}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        {assignment && (() => {
          const slots = [...new Set(Object.values(assignment))].sort((a, b) => a - b);
          return slots.map((slot, i) => (
            <g key={slot} transform={`translate(${12 + i * 72}, ${H - 20})`}>
              <rect
                width="12" height="12" rx="3"
                fill={SLOT_COLORS[(slot - 1) % SLOT_COLORS.length]}
              />
              <text x="16" y="11" fontSize="10" fill="#64748B" fontWeight="600">
                Slot {slot}
              </text>
            </g>
          ));
        })()}
      </svg>
    </div>
  );
}
