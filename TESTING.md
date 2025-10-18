# Testing Guide

## Testing the Storage System

### Test 1: Basic Persistence

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Create a simple schema**
   - Click "New table" to create a table
   - Rename it to "users"
   - Add a few columns (id, name, email)

3. **Refresh the page** (F5 or Ctrl+R)
   - ✅ The "users" table should still be there
   - ✅ All columns should be preserved

4. **Open DevTools** (F12)
   - Go to Application → Local Storage
   - Find the key `database-schema-visualizer`
   - ✅ You should see JSON data

### Test 2: Relationship Persistence

1. **Create two tables**
   - Table 1: "users" with id (PK)
   - Table 2: "posts" with id (PK) and user_id (FK)

2. **Set up a relationship**
   - Check FK on "user_id" in "posts"
   - Select "users" table
   - Select "id" column
   - Choose "1:N" relationship

3. **Verify the visual line appears**

4. **Refresh the page**
   - ✅ Both tables should be there
   - ✅ The FK relationship should be preserved
   - ✅ The visual line should be drawn
   - ✅ Relationship type should be "1:N"

### Test 3: Multiple Relationships

1. **Create a complex schema**
   ```
   users (id PK)
   companies (id PK)
   projects (id PK, user_id FK → users.id, company_id FK → companies.id)
   ```

2. **Set different relationship types**
   - users → projects: 1:N (blue line)
   - companies → projects: 1:N (blue line)

3. **Move tables around**
   - Drag tables to different positions
   - Watch lines update in real-time

4. **Refresh the page**
   - ✅ All tables at correct positions
   - ✅ All relationships preserved
   - ✅ All lines drawn correctly

### Test 4: Clear Memory

1. **Create any schema**

2. **Click "Clear Browser Memory"**
   - ✅ Confirmation dialog appears

3. **Confirm the action**
   - ✅ Canvas becomes empty
   - ✅ Sidebar shows no tables

4. **Check DevTools**
   - ✅ localStorage key should be removed

5. **Refresh the page**
   - ✅ Should start with empty canvas

### Test 5: Large Schema

1. **Create 10+ tables**
   - Add multiple columns to each
   - Set up various relationships

2. **Refresh the page**
   - ✅ All data should load correctly
   - ✅ No performance issues

3. **Check storage size**
   ```javascript
   // In browser console
   const data = localStorage.getItem('database-schema-visualizer');
   console.log('Storage size:', new Blob([data]).size, 'bytes');
   ```

### Test 6: JSON Import/Export

1. **Manually export**
   ```javascript
   // In browser console
   const schema = localStorage.getItem('database-schema-visualizer');
   console.log(JSON.stringify(JSON.parse(schema), null, 2));
   ```

2. **Copy the JSON**

3. **Clear the storage**

4. **Import the JSON**
   ```javascript
   // In browser console
   localStorage.setItem('database-schema-visualizer', 'PASTE_YOUR_JSON_HERE');
   ```

5. **Refresh the page**
   - ✅ Schema should be restored

### Test 7: Error Handling

1. **Corrupt the storage**
   ```javascript
   // In browser console
   localStorage.setItem('database-schema-visualizer', 'invalid json {]');
   ```

2. **Refresh the page**
   - ✅ Should start with empty canvas (not crash)
   - ✅ Error should be logged to console

3. **Normal functionality**
   - ✅ Should be able to create new tables

## Testing Relationship Types

### Visual Verification

1. **Create three relationships**
   - One 1:1 relationship
   - One 1:N relationship
   - One N:M relationship

2. **Verify visual differences**
   - ✅ 1:1 = Green solid line
   - ✅ 1:N = Blue solid line
   - ✅ N:M = Orange dashed line

3. **Hover over lines**
   - ✅ Lines should highlight
   - ✅ Labels should show relationship type

4. **Refresh and verify**
   - ✅ All relationship types preserved
   - ✅ Visual styles correct

## Browser Compatibility Testing

Test in different browsers:

### Chrome/Edge
```bash
npm run dev
# Open http://localhost:5173 in Chrome
```

### Firefox
```bash
npm run dev
# Open http://localhost:5173 in Firefox
```

### Safari
```bash
npm run dev
# Open http://localhost:5173 in Safari
```

**Verify in each browser:**
- ✅ Create and save schemas
- ✅ Refresh preserves data
- ✅ Relationships display correctly
- ✅ No console errors

## Performance Testing

### Test with Large Schema

1. **Create a script to generate tables**
   ```javascript
   // In browser console
   for (let i = 0; i < 50; i++) {
     document.querySelector('button:has-text("New table")').click();
   }
   ```

2. **Monitor performance**
   - Check rendering speed
   - Check save/load time
   - Check memory usage in DevTools

3. **Expected results**
   - ✅ Should handle 50+ tables
   - ✅ Smooth drag interactions
   - ✅ Fast save/load

## Automated Testing Commands

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build

# Preview production build
npm run preview
```

All should pass without errors.

## Regression Testing Checklist

After any code changes:

- [ ] Tables can be created
- [ ] Columns can be added/removed
- [ ] FK relationships can be set
- [ ] Relationship types can be changed
- [ ] Tables can be moved
- [ ] Data persists on refresh
- [ ] Clear memory works
- [ ] Markdown export works
- [ ] No console errors
- [ ] TypeScript compiles
- [ ] Build succeeds

## Common Issues & Solutions

### Issue: Data not persisting
**Solution**: Check if localStorage is enabled
```javascript
console.log(typeof(Storage) !== "undefined");
```

### Issue: Corrupt data
**Solution**: Clear localStorage
```javascript
localStorage.removeItem('database-schema-visualizer');
```

### Issue: Lines not appearing
**Solution**:
1. Check that FK is set correctly
2. Verify target table/column exists
3. Refresh the page

### Issue: Performance slow
**Solution**:
1. Clear browser cache
2. Check number of tables (50+ may slow down)
3. Export and start fresh project

## Test Reports

Document your test results:

```
Test Date: YYYY-MM-DD
Browser: Chrome 120
OS: Windows 11

✅ All basic tests passed
✅ Relationship persistence works
✅ Large schema (100 tables) works
⚠️  Minor lag when moving tables with many relationships
```

## Continuous Testing

Before committing changes:
1. Run all automated tests
2. Test basic functionality manually
3. Test on at least 2 browsers
4. Verify storage persists
5. Check console for errors
