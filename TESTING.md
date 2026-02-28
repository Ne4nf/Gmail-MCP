# Test Guide - Manual Testing MCP Servers

## Testing Gmail MCP Server

### Method 1: Via Claude Desktop (Recommended)

1. **Setup:**
   ```powershell
   .\setup-claude-config.ps1
   ```

2. **Restart Claude Desktop**

3. **Test commands:**
   ```
   Use the gmail MCP to search for my recent emails
   ```
   
   Claude should invoke the `search_emails` tool.

4. **View detailed email:**
   ```
   Get the full content of email ID [paste ID from search results]
   ```

5. **Reply to email:**
   ```
   Reply to email ID [paste ID] with message "Test reply from MCP server"
   ```

---

### Method 2: Direct Testing (Advanced)

MCP servers use stdio, so direct testing is complex. Use Claude Desktop or create a test client.

Example test client concept:
```javascript
const { spawn } = require('child_process');

const server = spawn('node', ['gmail-mcp-server.js']);

// Send MCP request
server.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list'
}) + '\n');

// Read response
server.stdout.on('data', (data) => {
  console.log('Server response:', data.toString());
});
```

---

## Testing Todo MCP Server

### Method 1: Via Claude Desktop

1. **Add a todo:**
   ```
   Use the todo MCP to add a task: "Test MCP server" with high priority
   ```

2. **List todos:**
   ```
   Show me all pending todos
   ```

3. **Complete a todo:**
   ```
   Mark todo #1 as completed
   ```

4. **Get statistics:**
   ```
   Show me todo statistics
   ```

5. **Update todo:**
   ```
   Update todo #2: change priority to medium and add description "Testing update function"
   ```

6. **Delete todo:**
   ```
   Delete todo #3
   ```

---

### Method 2: Direct File Inspection

Since Todo MCP uses a JSON file for storage, you can inspect it directly:

1. **Run some commands via Claude Desktop**

2. **Check the data file:**
   ```powershell
   Get-Content .\todos.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
   ```

3. **Verify:**
   - IDs are unique and sequential
   - Timestamps are correct
   - Status changes are working
   - Priority levels are saved

---

## Verification Checklist

### Gmail MCP
- [ ] Server starts without errors
- [ ] OAuth authorization works
- [ ] Token is saved to `token.json`
- [ ] Can search emails
- [ ] Can retrieve full email content
- [ ] Can send new email
- [ ] Can reply to email
- [ ] Email threading works (replies stay in conversation)

### Todo MCP
- [ ] Server starts without errors
- [ ] Can add todo with all fields
- [ ] Can list todos
- [ ] Can filter by status
- [ ] Can filter by priority
- [ ] Can complete todo (status changes, timestamp added)
- [ ] Can update todo fields
- [ ] Can delete todo
- [ ] Statistics are accurate
- [ ] Data persists in `todos.json`
- [ ] Can read todo list as resource

---

## Expected Outputs

### Gmail Search Response Example
```json
[
  {
    "id": "18d4f5e2a1d3c8b9",
    "from": "someone@example.com",
    "to": "me@gmail.com",
    "subject": "Test Email",
    "date": "Thu, 28 Feb 2026 10:30:00 +0700",
    "snippet": "This is a test email..."
  }
]
```

### Todo List Response Example
```
Found 3 todo(s):

○ [1] 🔴 Complete MCP test
   Finish both Gmail and Todo servers
   Due: 2026-03-01

✓ [2] 🟡 Write documentation
   
○ [3] 🟢 Submit assignment
   Prepare screenshots and source code
```

### Todo Stats Response Example
```json
{
  "total": 5,
  "completed": 2,
  "pending": 3,
  "completionRate": "40.0%",
  "byPriority": {
    "high": 2,
    "medium": 2,
    "low": 1
  }
}
```

---

## Debugging

### Enable Debug Logging

For Gmail MCP:
```javascript
// Add at top of gmail-mcp-server.js
const DEBUG = true;
console.error('Debug mode enabled');
```

For Todo MCP:
```javascript
// Add at top of todo-mcp-server.js  
const DEBUG = true;
console.error('Debug mode enabled');
```

### Check Claude Desktop Logs

On Windows:
```powershell
# Check if Claude Desktop has logs
Get-ChildItem "$env:APPDATA\Claude" -Recurse | Where-Object { $_.Extension -eq ".log" }
```

### Common Issues

**MCP Server not appearing in Claude:**
- Config path wrong
- Need to restart Claude Desktop
- JSON syntax error in config
- Node.js not in PATH

**Gmail authorization fails:**
- OAuth client not configured properly
- Scopes not matching
- Token expired (delete `token.json` and re-auth)

**Todo not saving:**
- No write permission
- File path issue
- JSON parse error (check `todos.json` syntax)

---

## Performance Testing

### Gmail MCP
- Search with large result sets
- Retrieve emails with attachments
- Multiple rapid requests

### Todo MCP
- Create 100+ todos
- Filter operations on large dataset
- Concurrent updates

---

## Security Considerations

### Gmail MCP
- ⚠️ `token.json` contains OAuth credentials - never commit to Git
- ⚠️ `client_secret_*.json` should normally be kept private
- Scopes are limited to Gmail only
- Consider adding rate limiting

### Todo MCP
- Data stored in plain JSON (no encryption)
- No authentication (anyone with MCP access can modify)
- Consider adding: user authentication, encryption at rest

---

## Next Steps

After successful testing:
1. Take screenshots of successful operations
2. Prepare source code (zip or GitHub)
3. Write explanation for Todo MCP choice
4. Submit all materials

Good luck! 🎯
