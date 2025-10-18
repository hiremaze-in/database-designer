import { useRef, useEffect } from 'react';
import { Table } from '../types/schema';

interface CanvasProps {
  tables: Table[];
  children: React.ReactNode;
  onCanvasClick: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({ tables, children, onCanvasClick }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getColumnPosition = (table: Table, columnId: string) => {
    const columnIndex = table.columns.findIndex(col => col.id === columnId);
    const headerHeight = 52;
    const columnHeight = 120;
    const columnOffsetY = headerHeight + columnHeight * columnIndex + columnHeight / 2;

    return {
      x: table.position.x,
      y: table.position.y + columnOffsetY,
    };
  };

  const drawConnections = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;

    // Clear existing paths but keep defs
    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) {
      svg.appendChild(defs);
    }

    const tableWidth = 280;

    tables.forEach((sourceTable) => {
      sourceTable.columns.forEach((column) => {
        if (column.isForeignKey && column.foreignKeyReference) {
          const targetTable = tables.find(
            (t) => t.id === column.foreignKeyReference?.tableId
          );

          if (targetTable) {
            const targetColumnId = column.foreignKeyReference.columnId;

            // Get source position (right side of source table, at column height)
            const sourcePos = getColumnPosition(sourceTable, column.id);
            const sourceX = sourcePos.x + tableWidth;
            const sourceY = sourcePos.y;

            // Get target position (left side of target table, at referenced column height)
            const targetPos = getColumnPosition(targetTable, targetColumnId);
            const targetX = targetPos.x;
            const targetY = targetPos.y;

            // Create path group for interactivity
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'relationship-line');

            // Calculate control points for smooth Bezier curve
            const distance = Math.abs(targetX - sourceX);
            const curveStrength = Math.min(distance / 2, 100);

            // Get relationship type and set style accordingly
            const relType = column.foreignKeyReference.relationshipType;
            let strokeColor = '#3b82f6'; // Default blue
            let strokeWidth = '2';
            let strokeDasharray = 'none';
            let markerEnd = 'url(#arrowhead)';

            switch (relType) {
              case '1:1':
                strokeColor = '#10b981'; // Green for 1:1
                strokeWidth = '2.5';
                markerEnd = 'url(#arrowhead-1-1)';
                break;
              case '1:N':
                strokeColor = '#3b82f6'; // Blue for 1:N
                strokeWidth = '2';
                markerEnd = 'url(#arrowhead-1-n)';
                break;
              case 'N:M':
                strokeColor = '#f59e0b'; // Orange for N:M
                strokeWidth = '2.5';
                strokeDasharray = '5,5';
                markerEnd = 'url(#arrowhead-n-m)';
                break;
            }

            // Main connection path
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${sourceX} ${sourceY} C ${sourceX + curveStrength} ${sourceY}, ${targetX - curveStrength} ${targetY}, ${targetX} ${targetY}`;

            path.setAttribute('d', d);
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', strokeWidth);
            path.setAttribute('fill', 'none');
            path.setAttribute('marker-end', markerEnd);
            if (strokeDasharray !== 'none') {
              path.setAttribute('stroke-dasharray', strokeDasharray);
            }
            path.setAttribute('class', 'connection-path');
            path.setAttribute('data-rel-type', relType);

            // Add invisible wider path for easier hovering
            const hoverPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            hoverPath.setAttribute('d', d);
            hoverPath.setAttribute('stroke', 'transparent');
            hoverPath.setAttribute('stroke-width', '12');
            hoverPath.setAttribute('fill', 'none');
            hoverPath.setAttribute('class', 'hover-path');

            // Add hover effects with dynamic colors
            const hoverColor = relType === '1:1' ? '#059669' : relType === 'N:M' ? '#d97706' : '#2563eb';
            hoverPath.addEventListener('mouseenter', () => {
              path.setAttribute('stroke', hoverColor);
              path.setAttribute('stroke-width', '3');
            });

            hoverPath.addEventListener('mouseleave', () => {
              path.setAttribute('stroke', strokeColor);
              path.setAttribute('stroke-width', strokeWidth);
            });

            g.appendChild(path);
            g.appendChild(hoverPath);

            // Add relationship label with type
            const midX = (sourceX + targetX) / 2;
            const midY = (sourceY + targetY) / 2;

            const labelText = `${column.name} (${relType})`;
            const textWidth = labelText.length * 5.5;

            const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            textBg.setAttribute('x', (midX - textWidth / 2 - 4).toString());
            textBg.setAttribute('y', (midY - 18).toString());
            textBg.setAttribute('width', (textWidth + 8).toString());
            textBg.setAttribute('height', '16');
            textBg.setAttribute('fill', '#f8fafc');
            textBg.setAttribute('rx', '3');
            textBg.setAttribute('stroke', strokeColor);
            textBg.setAttribute('stroke-width', '1');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', midX.toString());
            text.setAttribute('y', (midY - 5).toString());
            text.setAttribute('fill', strokeColor);
            text.setAttribute('font-size', '11');
            text.setAttribute('font-weight', '600');
            text.setAttribute('font-family', 'system-ui, sans-serif');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'relationship-label');
            text.textContent = labelText;

            g.appendChild(textBg);
            g.appendChild(text);

            svg.appendChild(g);
          }
        }
      });
    });
  };

  useEffect(() => {
    drawConnections();
  }, [tables]);

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        backgroundColor: '#f8fafc',
      }}
      onClick={onCanvasClick}
    >
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
          <marker
            id="arrowhead-1-1"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
          </marker>
          <marker
            id="arrowhead-1-n"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
          <marker
            id="arrowhead-n-m"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
      <div className="relative" style={{ minWidth: '2000px', minHeight: '2000px', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
