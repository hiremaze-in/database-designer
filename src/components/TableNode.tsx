import { Table, Column } from '../types/schema';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface TableNodeProps {
  table: Table;
  tables: Table[];
  onUpdateTable: (table: Table) => void;
  onDeleteTable: (tableId: string) => void;
  onMouseDown: (e: React.MouseEvent, tableId: string) => void;
  isSelected: boolean;
}

export const TableNode: React.FC<TableNodeProps> = ({
  table,
  tables,
  onUpdateTable,
  onDeleteTable,
  onMouseDown,
  isSelected,
}) => {
  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      name: 'new_column',
      dataType: 'VARCHAR',
      isPrimaryKey: false,
      isForeignKey: false,
    };
    onUpdateTable({ ...table, columns: [...table.columns, newColumn] });
  };

  const handleDeleteColumn = (columnId: string) => {
    onUpdateTable({
      ...table,
      columns: table.columns.filter((col) => col.id !== columnId),
    });
  };

  const handleUpdateColumn = (columnId: string, updates: Partial<Column>) => {
    onUpdateTable({
      ...table,
      columns: table.columns.map((col) =>
        col.id === columnId ? { ...col, ...updates } : col
      ),
    });
  };

  const handleUpdateTableName = (name: string) => {
    onUpdateTable({ ...table, name });
  };

  const handleSetForeignKey = (columnId: string, tableId: string, columnTargetId: string, relationshipType: '1:1' | '1:N' | 'N:M' = '1:N') => {
    const targetTable = tables.find(t => t.id === tableId);
    const targetColumn = targetTable?.columns.find(c => c.id === columnTargetId);

    if (!targetTable || !targetColumn) return;

    onUpdateTable({
      ...table,
      columns: table.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              foreignKeyReference: {
                tableId: targetTable.id,
                tableName: targetTable.name,
                columnId: targetColumn.id,
                columnName: targetColumn.name,
                relationshipType,
              },
            }
          : col
      ),
    });
  };

  const handleSetRelationshipType = (columnId: string, relationshipType: '1:1' | '1:N' | 'N:M') => {
    const column = table.columns.find(c => c.id === columnId);
    if (!column?.foreignKeyReference) return;

    onUpdateTable({
      ...table,
      columns: table.columns.map((col) =>
        col.id === columnId && col.foreignKeyReference
          ? {
              ...col,
              foreignKeyReference: {
                ...col.foreignKeyReference,
                relationshipType,
              },
            }
          : col
      ),
    });
  };

  const handleRemoveForeignKey = (columnId: string) => {
    onUpdateTable({
      ...table,
      columns: table.columns.map((col) =>
        col.id === columnId
          ? { ...col, foreignKeyReference: undefined }
          : col
      ),
    });
  };

  return (
    <div
      className={`absolute bg-white rounded-lg shadow-lg border-2 ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      }`}
      style={{
        left: `${table.position.x}px`,
        top: `${table.position.y}px`,
        minWidth: '280px',
      }}
    >
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between cursor-move"
        onMouseDown={(e) => onMouseDown(e, table.id)}
      >
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-4 h-4" />
          <input
            type="text"
            value={table.name}
            onChange={(e) => handleUpdateTableName(e.target.value)}
            className="bg-transparent border-none outline-none text-white font-semibold flex-1"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTable(table.id);
          }}
          className="p-1 hover:bg-blue-700 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2">
        {table.columns.map((column) => (
          <div
            key={column.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded group"
          >
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="text"
                value={column.name}
                onChange={(e) =>
                  handleUpdateColumn(column.id, { name: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Column name"
              />
              <select
                value={column.dataType}
                onChange={(e) =>
                  handleUpdateColumn(column.id, {
                    dataType: e.target.value as Column['dataType'],
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="VARCHAR">VARCHAR</option>
                <option value="INT">INT</option>
                <option value="BIGINT">BIGINT</option>
                <option value="TEXT">TEXT</option>
                <option value="BOOLEAN">BOOLEAN</option>
                <option value="TIMESTAMP">TIMESTAMP</option>
                <option value="DATE">DATE</option>
                <option value="DECIMAL">DECIMAL</option>
                <option value="FLOAT">FLOAT</option>
                <option value="JSON">JSON</option>
              </select>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={column.isPrimaryKey}
                    onChange={(e) =>
                      handleUpdateColumn(column.id, {
                        isPrimaryKey: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <span>PK</span>
                </label>
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={column.isForeignKey}
                    onChange={(e) => {
                      handleUpdateColumn(column.id, {
                        isForeignKey: e.target.checked,
                      });
                      if (!e.target.checked) {
                        handleRemoveForeignKey(column.id);
                      }
                    }}
                    className="rounded"
                  />
                  <span>FK</span>
                </label>
              </div>
              {column.isForeignKey && (
                <div className="mt-2 space-y-1">
                  <label className="text-xs text-gray-600 font-medium">References:</label>
                  <select
                    value={column.foreignKeyReference?.tableId || ''}
                    onChange={(e) => {
                      const targetTableId = e.target.value;
                      const targetTable = tables.find(t => t.id === targetTableId);
                      const firstColumn = targetTable?.columns[0];
                      if (firstColumn) {
                        handleSetForeignKey(column.id, targetTableId, firstColumn.id, column.foreignKeyReference?.relationshipType || '1:N');
                      }
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                  >
                    <option value="">Select table...</option>
                    {tables
                      .filter(t => t.id !== table.id)
                      .map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                  {column.foreignKeyReference && (
                    <>
                      <select
                        value={column.foreignKeyReference.columnId}
                        onChange={(e) => {
                          const columnTargetId = e.target.value;
                          handleSetForeignKey(
                            column.id,
                            column.foreignKeyReference!.tableId,
                            columnTargetId,
                            column.foreignKeyReference!.relationshipType
                          );
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                      >
                        {tables
                          .find(t => t.id === column.foreignKeyReference!.tableId)
                          ?.columns.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.dataType})
                            </option>
                          ))}
                      </select>
                      <div>
                        <label className="text-xs text-gray-600 font-medium block mb-1">Relationship Type:</label>
                        <select
                          value={column.foreignKeyReference.relationshipType}
                          onChange={(e) => {
                            handleSetRelationshipType(column.id, e.target.value as '1:1' | '1:N' | 'N:M');
                          }}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-blue-50"
                        >
                          <option value="1:1">One to One (1:1)</option>
                          <option value="1:N">One to Many (1:N)</option>
                          <option value="N:M">Many to Many (N:M)</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDeleteColumn(column.id)}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddColumn}
        className="w-full py-2 border-t border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium rounded-b-lg"
      >
        <Plus className="w-4 h-4" />
        Add Column
      </button>
    </div>
  );
};
