import { Download, Trash2 } from 'lucide-react';

interface ToolbarProps {
  onDownloadMarkdown: () => void;
  onClearMemory: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onDownloadMarkdown,
  onClearMemory,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">HireMaze</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDownloadMarkdown}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download as Markdown
        </button>

        <button
          onClick={onClearMemory}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear Browser Memory
        </button>

        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm">
          Save
        </button>
      </div>
    </div>
  );
};
