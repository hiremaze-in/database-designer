import { useState, useEffect, useCallback } from 'react';
import { Table, Schema } from './types/schema';
import { saveSchema, loadSchema, clearStorage } from './utils/storage';
import { generateMarkdown, downloadMarkdown } from './utils/markdown';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { TableNode } from './components/TableNode';

function App() {
  const [schema, setSchema] = useState<Schema>({ tables: [] });
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [draggingTableId, setDraggingTableId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loaded = loadSchema();
    if (loaded) {
      setSchema(loaded);
    }
  }, []);

  useEffect(() => {
    saveSchema(schema);
  }, [schema]);

  const handleAddTable = () => {
    const newTable: Table = {
      id: `table-${Date.now()}`,
      name: 'new_table',
      columns: [
        {
          id: `col-${Date.now()}`,
          name: 'id',
          dataType: 'INT',
          isPrimaryKey: true,
          isForeignKey: false,
        },
      ],
      position: {
        x: 50 + schema.tables.length * 50,
        y: 50 + schema.tables.length * 50,
      },
    };

    setSchema({ tables: [...schema.tables, newTable] });
  };

  const handleUpdateTable = (updatedTable: Table) => {
    setSchema({
      tables: schema.tables.map((table) =>
        table.id === updatedTable.id ? updatedTable : table
      ),
    });
  };

  const handleDeleteTable = (tableId: string) => {
    setSchema({
      tables: schema.tables.filter((table) => table.id !== tableId),
    });
    if (selectedTableId === tableId) {
      setSelectedTableId(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, tableId: string) => {
    const table = schema.tables.find((t) => t.id === tableId);
    if (!table) return;

    setDraggingTableId(tableId);
    setSelectedTableId(tableId);
    setDragOffset({
      x: e.clientX - table.position.x,
      y: e.clientY - table.position.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingTableId) return;

      const table = schema.tables.find((t) => t.id === draggingTableId);
      if (!table) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      handleUpdateTable({
        ...table,
        position: { x: Math.max(0, newX), y: Math.max(0, newY) },
      });
    },
    [draggingTableId, dragOffset, schema.tables]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingTableId(null);
  }, []);

  useEffect(() => {
    if (draggingTableId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingTableId, handleMouseMove, handleMouseUp]);

  const handleDownloadMarkdown = () => {
    const markdown = generateMarkdown(schema);
    downloadMarkdown(markdown);
  };

  const handleClearMemory = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearStorage();
      setSchema({ tables: [] });
      setSelectedTableId(null);
    }
  };

  const handleCanvasClick = () => {
    setSelectedTableId(null);
  };

  const handleSelectTable = (tableId: string) => {
    setSelectedTableId(tableId);
  };

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        onDownloadMarkdown={handleDownloadMarkdown}
        onClearMemory={handleClearMemory}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          tables={schema.tables}
          onAddTable={handleAddTable}
          selectedTableId={selectedTableId}
          onSelectTable={handleSelectTable}
        />

        <Canvas tables={schema.tables} onCanvasClick={handleCanvasClick}>
          {schema.tables.map((table) => (
            <TableNode
              key={table.id}
              table={table}
              tables={schema.tables}
              onUpdateTable={handleUpdateTable}
              onDeleteTable={handleDeleteTable}
              onMouseDown={handleMouseDown}
              isSelected={selectedTableId === table.id}
            />
          ))}
        </Canvas>
      </div>
    </div>
  );
}

export default App;
