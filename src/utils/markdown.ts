import { Schema, Column } from '../types/schema';

export const generateMarkdown = (schema: Schema): string => {
  let markdown = '# Database Schema\n\n';

  schema.tables.forEach((table) => {
    markdown += `## ${table.name} Table\n\n`;
    markdown += '| Column Name | Data Type | Constraints |\n';
    markdown += '|---|---|---|\n';

    table.columns.forEach((column) => {
      const constraints = getConstraints(column, schema);
      markdown += `| ${column.name} | ${column.dataType} | ${constraints} |\n`;
    });

    markdown += '\n';
  });

  return markdown;
};

const getConstraints = (column: Column, schema: Schema): string => {
  const constraints: string[] = [];

  if (column.isPrimaryKey) {
    constraints.push('PRIMARY KEY');
  }

  if (column.isForeignKey && column.foreignKeyReference) {
    const refTable = schema.tables.find(
      (t) => t.id === column.foreignKeyReference?.tableId
    );
    const refColumn = refTable?.columns.find(
      (c) => c.id === column.foreignKeyReference?.columnId
    );

    if (refTable && refColumn) {
      constraints.push(`FOREIGN KEY (${refTable.name}.${refColumn.name})`);
    }
  }

  return constraints.join(', ') || '';
};

export const downloadMarkdown = (content: string, filename: string = 'schema.md'): void => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
