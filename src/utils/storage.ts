import { Schema } from '../types/schema';

const STORAGE_KEY = 'database-schema-visualizer';

export const saveSchema = (schema: Schema): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.error('Failed to save schema to localStorage:', error);
  }
};

export const loadSchema = (): Schema | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as Schema;
    }
  } catch (error) {
    console.error('Failed to load schema from localStorage:', error);
  }
  return null;
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};
