export type DataType =
  | 'VARCHAR'
  | 'INT'
  | 'BIGINT'
  | 'TEXT'
  | 'BOOLEAN'
  | 'TIMESTAMP'
  | 'DATE'
  | 'DECIMAL'
  | 'FLOAT'
  | 'JSON';

export type RelationshipType = '1:1' | '1:N' | 'N:M';

export interface ForeignKeyReference {
  tableId: string;
  tableName: string;
  columnId: string;
  columnName: string;
  relationshipType: RelationshipType;
}

export interface Column {
  id: string;
  name: string;
  dataType: DataType;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNullable?: boolean;
  foreignKeyReference?: ForeignKeyReference;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
  position: {
    x: number;
    y: number;
  };
}

export interface Schema {
  tables: Table[];
}
