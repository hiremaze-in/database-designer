import { Plus, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Table } from '../types/schema';
import { useState } from 'react';

interface SidebarProps {
  tables: Table[];
  onAddTable: () => void;
  selectedTableId: string | null;
  onSelectTable: (tableId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tables,
  onAddTable,
  selectedTableId,
  onSelectTable,
}) => {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTableExpanded = (tableId: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId);
    } else {
      newExpanded.add(tableId);
    }
    setExpandedTables(newExpanded);
  };

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Tables</h2>
          <button
            onClick={onAddTable}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New table
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tables..."
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredTables.map((table) => {
          const isExpanded = expandedTables.has(table.id);
          const isSelected = selectedTableId === table.id;

          return (
            <div key={table.id} className="border-b border-gray-100">
              <div
                className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  onSelectTable(table.id);
                  toggleTableExpanded(table.id);
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTableExpanded(table.id);
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {table.name}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-gray-50 px-4 py-2 space-y-1">
                  {table.columns.map((column) => (
                    <div
                      key={column.id}
                      className="flex items-center gap-2 text-xs text-gray-600 py-1"
                    >
                      <div className="flex items-center gap-1">
                        {column.isPrimaryKey && (
                          <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                            PK
                          </span>
                        )}
                        {column.isForeignKey && (
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            FK
                          </span>
                        )}
                      </div>
                      <span className="flex-1">{column.name}</span>
                      <span className="text-gray-400">{column.dataType}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
