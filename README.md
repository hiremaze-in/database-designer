# Database Schema Designer

A modern, interactive database schema designer built with React, TypeScript, and Tailwind CSS. Design and visualize your database relationships with an intuitive drag-and-drop interface.

![Database Schema Designer](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Core Functionality
- **Visual Table Design**: Create and manage database tables with a drag-and-drop interface
- **Column Management**: Add, edit, and remove columns with various data types
- **Relationship Visualization**: Automatic visual connections between tables based on foreign keys
- **Multiple Relationship Types**: Support for One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (N:M) relationships
- **Interactive Canvas**: Pan and zoom across your schema, drag tables to organize your layout
- **Real-time Updates**: All changes are reflected immediately in the visual representation

### Data Types Supported
- VARCHAR
- INT
- BIGINT
- TEXT
- BOOLEAN
- TIMESTAMP
- DATE
- DECIMAL
- FLOAT
- JSON

### Relationship Features
- **Color-coded Relationships**:
  - 🟢 Green solid lines for 1:1 relationships
  - 🔵 Blue solid lines for 1:N relationships
  - 🟠 Orange dashed lines for N:M relationships
- **Smart Connection Lines**: Bezier curves that connect specific columns
- **Interactive Labels**: Hover over relationships to see column names and relationship types
- **Precise Positioning**: Lines connect from the FK column to the referenced column

### Export & Persistence
- **Auto-Save**: Your schema is automatically saved to browser localStorage
- **Persistent Data**: All changes persist across page reloads and browser sessions
- **No Server Required**: All data stays in your browser - complete privacy
- **Markdown Export**: Download your schema as formatted markdown
- **Clear Memory**: Reset your workspace with a single click
- **See [STORAGE.md](STORAGE.md)** for detailed documentation on the storage system

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/project.git
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Creating Tables

1. Click the **"New table"** button in the sidebar
2. A new table will appear on the canvas with a default `id` column
3. Click the table name to edit it

### Adding Columns

1. Click the **"Add Column"** button at the bottom of any table
2. Enter the column name
3. Select the data type from the dropdown
4. Check **PK** for primary keys
5. Check **FK** for foreign keys

### Setting Up Relationships

1. Check the **FK** checkbox on a column
2. Select the target table from the **References** dropdown
3. Select the specific column to reference
4. Choose the **Relationship Type**:
   - **One to One (1:1)**: Each record in the source table relates to exactly one record in the target table
   - **One to Many (1:N)**: Each record in the source table can relate to multiple records in the target table
   - **Many to Many (N:M)**: Records in both tables can have multiple relationships

### Moving Tables

- Click and drag the table header (with the grip icon) to reposition tables
- Relationship lines automatically update as you move tables

### Data Persistence

Your work is **automatically saved** to your browser's localStorage:
- No manual save button needed
- Data persists across page reloads
- Works offline
- Completely private (stored locally only)

To start fresh, click **"Clear Browser Memory"** in the toolbar.

### Exporting Your Schema

Click **"Download as Markdown"** to export your schema as a `.md` file that includes:
- Table definitions
- Column specifications
- Data types
- Primary and foreign key relationships

**Tip**: Regularly export important schemas as backups!

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Canvas.tsx          # Main canvas with relationship lines
│   │   ├── TableNode.tsx       # Individual table component
│   │   ├── Sidebar.tsx         # Table list sidebar
│   │   └── Toolbar.tsx         # Top toolbar with actions
│   ├── types/
│   │   └── schema.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── storage.ts          # Local storage utilities
│   │   └── markdown.ts         # Markdown export utilities
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Technology Stack

- **React 18.3.1**: UI framework
- **TypeScript 5.5.3**: Type safety and developer experience
- **Vite 5.4.2**: Fast build tool and development server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Supabase**: (Optional) Backend integration capabilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## Roadmap

- [ ] Import/Export as JSON
- [ ] Import from SQL DDL
- [ ] Export as SQL DDL
- [ ] Undo/Redo functionality
- [ ] Table templates
- [ ] Dark mode
- [ ] Collaborative editing
- [ ] Database connection and reverse engineering
- [ ] Custom color themes for tables

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by professional ERD tools like DrawSQL and dbdiagram.io

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/yourusername/project/issues)
- Check the [Contributing Guide](CONTRIBUTING.md)

## Screenshots

### Main Interface
Design your database schema with an intuitive drag-and-drop interface.

### Relationship Visualization
See your foreign key relationships with color-coded, interactive connection lines.

### Foreign Key Configuration
Easily configure foreign keys with dropdown selectors for tables, columns, and relationship types.

---

Made with ❤️ by Hiremaze 
Contact at admin@hiremaze.in/harsharchduke@gmail.com
