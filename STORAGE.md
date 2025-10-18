# Storage System Documentation

## Overview

The Database Schema Designer uses **browser localStorage** to automatically save and restore your work. This ensures that your schema design persists across page reloads and browser sessions.

## How It Works

### Automatic Saving

The application automatically saves your schema to localStorage whenever you make any changes:

- Adding/removing tables
- Adding/removing columns
- Modifying column properties (name, type, PK, FK)
- Setting up foreign key relationships
- Moving tables on the canvas

**There is no manual "Save" button needed** - everything is saved automatically!

### Automatic Loading

When you open the application, it automatically checks for previously saved data and restores it.

## JSON Structure

The schema is saved in the following JSON structure:

```json
{
  "tables": [
    {
      "id": "table-1234567890",
      "name": "users",
      "position": {
        "x": 100,
        "y": 100
      },
      "columns": [
        {
          "id": "col-1234567890",
          "name": "id",
          "dataType": "INT",
          "isPrimaryKey": true,
          "isForeignKey": false,
          "isNullable": false
        },
        {
          "id": "col-1234567891",
          "name": "company_id",
          "dataType": "INT",
          "isPrimaryKey": false,
          "isForeignKey": true,
          "isNullable": true,
          "foreignKeyReference": {
            "tableId": "table-1234567892",
            "tableName": "companies",
            "columnId": "col-1234567893",
            "columnName": "id",
            "relationshipType": "1:N"
          }
        }
      ]
    }
  ]
}
```

### Field Descriptions

#### Table Object
- **id**: Unique identifier for the table (generated using timestamp)
- **name**: Table name (user-editable)
- **position**: X and Y coordinates on the canvas
- **columns**: Array of column objects

#### Column Object
- **id**: Unique identifier for the column
- **name**: Column name (user-editable)
- **dataType**: One of: VARCHAR, INT, BIGINT, TEXT, BOOLEAN, TIMESTAMP, DATE, DECIMAL, FLOAT, JSON
- **isPrimaryKey**: Boolean indicating if this is a primary key
- **isForeignKey**: Boolean indicating if this is a foreign key
- **isNullable**: Boolean indicating if the column can be null (optional)
- **foreignKeyReference**: Object containing FK details (only if isForeignKey is true)

#### Foreign Key Reference Object
- **tableId**: ID of the referenced table
- **tableName**: Name of the referenced table
- **columnId**: ID of the referenced column
- **columnName**: Name of the referenced column
- **relationshipType**: One of: "1:1", "1:N", "N:M"

## Storage Key

The data is stored in localStorage under the key:
```javascript
"database-schema-visualizer"
```

## Implementation Details

### Save Function
Located in [src/utils/storage.ts](src/utils/storage.ts):

```typescript
export const saveSchema = (schema: Schema): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.error('Failed to save schema to localStorage:', error);
  }
};
```

### Load Function
```typescript
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
```

### Usage in App Component
Located in [src/App.tsx](src/App.tsx):

```typescript
// Load on mount
useEffect(() => {
  const loaded = loadSchema();
  if (loaded) {
    setSchema(loaded);
  }
}, []);

// Save on every change
useEffect(() => {
  saveSchema(schema);
}, [schema]);
```

## Storage Limits

### Browser localStorage Limits
- **Chrome/Edge**: ~10MB
- **Firefox**: ~10MB
- **Safari**: ~5MB

### Estimated Capacity
With the current JSON structure:
- A simple table with 5 columns: ~500 bytes
- A complex schema with 50 tables and 250 columns: ~125KB
- **You can easily store hundreds of tables** before reaching limits

### What Happens When Storage is Full?
The `saveSchema` function has error handling. If localStorage is full:
1. An error is logged to the console
2. The application continues to work normally
3. You'll need to clear some data or export your schema

## Clearing Storage

### Via UI
Click the **"Clear Browser Memory"** button in the toolbar. This will:
1. Show a confirmation dialog
2. Remove all saved data from localStorage
3. Reset the application to a blank state

### Via Browser DevTools
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Select "Local Storage"
4. Find the key `database-schema-visualizer`
5. Right-click and delete

### Programmatically
```typescript
import { clearStorage } from './utils/storage';
clearStorage();
```

## Data Migration

### Exporting Your Data

The schema is already in localStorage. You can:

1. **Export as Markdown**: Use the "Download as Markdown" button
2. **Export as JSON**: Open DevTools and copy the localStorage value
3. **Manual Export**:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('database-schema-visualizer'));
   ```

### Importing Data

To restore a previously saved schema:

1. Open DevTools console
2. Run:
   ```javascript
   localStorage.setItem('database-schema-visualizer', 'YOUR_JSON_STRING_HERE');
   ```
3. Refresh the page

## Privacy & Security

### Local Storage Only
- Data is stored **only in your browser**
- Nothing is sent to external servers
- Data remains on your device

### Browser-Specific
- Data is isolated per browser
- Chrome data ≠ Firefox data
- Incognito/Private mode has separate storage

### Clearing Data
Data will be cleared if:
- You clear browser cache and site data
- You use "Clear Browser Memory" button
- You manually delete from DevTools
- You uninstall the browser (depending on OS settings)

## Troubleshooting

### Data Not Saving
1. Check if localStorage is available:
   ```javascript
   console.log(typeof(Storage) !== "undefined");
   ```
2. Check browser console for errors
3. Verify you're not in Private/Incognito mode (some browsers restrict localStorage)
4. Check if storage quota is exceeded

### Data Not Loading
1. Check browser console for errors
2. Verify data exists:
   ```javascript
   console.log(localStorage.getItem('database-schema-visualizer'));
   ```
3. Check if the JSON is valid
4. Try clearing and starting fresh

### Corrupt Data
If the stored data becomes corrupted:
1. Open DevTools console
2. Run:
   ```javascript
   localStorage.removeItem('database-schema-visualizer');
   ```
3. Refresh the page

## Best Practices

### Regular Backups
While localStorage is reliable, it's good practice to:
1. Periodically export as Markdown
2. Save exports to a file or cloud storage
3. Keep multiple versions of complex schemas

### Browser Updates
Browser updates shouldn't affect localStorage, but:
1. Export before major browser updates
2. Test the application after updates
3. Keep backups of important schemas

### Multiple Browsers
If you work across different browsers:
1. Export from one browser
2. Import to another using DevTools
3. Or use the same browser everywhere

## Future Enhancements

Potential improvements to the storage system:

- [ ] Cloud sync with authentication
- [ ] Export/Import JSON files
- [ ] Version history
- [ ] Multiple schema projects
- [ ] Compression for larger schemas
- [ ] IndexedDB for unlimited storage
- [ ] Auto-backup to cloud storage

## Testing the Storage

### Manual Test
1. Create a few tables with columns
2. Set up some relationships
3. Refresh the page
4. Verify all data is restored

### Verify in DevTools
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Click on your domain
4. Find `database-schema-visualizer`
5. View the JSON structure

### Console Test
```javascript
// Check current schema
const schema = localStorage.getItem('database-schema-visualizer');
console.log(JSON.parse(schema));

// Check size
console.log('Storage size:', new Blob([schema]).size, 'bytes');
```

## Summary

The storage system is:
- ✅ Automatic - no manual saving required
- ✅ Persistent - survives page reloads
- ✅ Reliable - includes error handling
- ✅ Privacy-focused - all data stays local
- ✅ Efficient - minimal storage footprint
- ✅ Transparent - easy to inspect and debug

Your work is automatically saved and will be there when you return!
