# Gmail MCP

[![GitHub](https://img.shields.io/badge/GitHub-Ne4nf%2FGmail--MCP-blue?logo=github)](https://github.com/Ne4nf/Gmail-MCP)
[![Node.js](https://img.shields.io/badge/Node.js-24%2B-green?logo=node.js)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-SDK%201.27-purple)](https://modelcontextprotocol.io)

Two Model Context Protocol (MCP) servers built:

1. **Gmail MCP Server** - Gmail integration (search, read, send, reply with attachments)
2. **Todo MCP Server** - Todo list management (full CRUD + analytics)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 24+
- Claude Code or Claude Desktop  
- Gmail account with OAuth credentials

### Installation

```bash
# Clone repository
git clone https://github.com/Ne4nf/Gmail-MCP.git
cd Gmail-MCP

# Install dependencies
npm install

# Configure for Claude Code
claude mcp add gmail -- node gmail-mcp-server.js
claude mcp add todo -- node todo-mcp-server.js

# Verify both servers connected
claude mcp list
```

### First-time Gmail Authorization

```bash
node authorize-gmail.js
```

Follow the OAuth flow to authorize Gmail access. A `token.json` file will be created.

---

## 📧 Gmail MCP Server

### Features

**5 Tools:**
- `search_emails` - Search emails with Gmail query syntax
- `get_email` - Retrieve full email content with body
- `send_email` - Send new emails
- `reply_email` - Reply to existing emails (preserves threading)
- `reply_email_with_attachments` - Reply with file attachments (images, PDFs, docs)

### Usage Examples

```javascript
// In Claude Code terminal
Use gmail MCP to search for emails from technextasia.com
Get full content of email ID abc123xyz
Reply to email ID abc123xyz with message "Thank you!"
Reply to email abc123xyz with attachments: screenshot1.png, screenshot2.png
```

### OAuth Setup

1. Get OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Gmail API
3. Download credentials as `client_secret_*.json`
4. Run `node authorize-gmail.js` for first-time auth

---

## ✅ Todo MCP Server

### Features

**6 Tools:**
- `add_todo` - Create new todo (title, description, priority, dueDate)
- `list_todos` - List todos with filtering (by status, priority)
- `complete_todo` - Mark todo as completed
- `delete_todo` - Delete a todo
- `update_todo` - Update any todo field
- `get_stats` - View statistics (completion rate, by priority)

**1 Resource:**
- `todo://list` - Read entire todo list as structured JSON

### Data Model

```javascript
{
  id: number,
  title: string,
  description: string,
  priority: "high" | "medium" | "low",
  dueDate: "YYYY-MM-DD" | null,
  status: "pending" | "completed",
  createdAt: ISO timestamp,
  completedAt: ISO timestamp | null
}
```

### Usage Examples

```javascript
// In Claude Code terminal
Add todo: "Complete MCP test" with high priority and due date 2026-03-05
List all high priority todos
Complete todo #1
Show todo statistics
```

### Persistent Storage

Todos are stored in `todos.json` with atomic writes to prevent data corruption.

---

## 🛠️ Technical Implementation

### Architecture

```
├── gmail-mcp-server.js       # Gmail MCP implementation
├── todo-mcp-server.js        # Todo MCP implementation  
├── authorize-gmail.js        # OAuth helper script
├── package.json              # Dependencies
└── client_secret_*.json      # Google OAuth credentials
```

### Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `googleapis` - Google APIs client library
- Node.js built-in modules (fs, path, readline)

### MCP Protocol

Both servers use:
- **Transport:** StdioServerTransport (stdio communication)
- **Capabilities:** Tools (Gmail: 5, Todo: 6) + Resources (Todo: 1)
- **Error Handling:** Comprehensive try-catch with user-friendly messages

---

## 📖 Documentation

- **[START-HERE.md](START-HERE.md)** - Quick 5-step guide
- **[BAI-TEST-HUONG-DAN.md](BAI-TEST-HUONG-DAN.md)** - Detailed Vietnamese guide
- **[CLAUDE-CODE-GUIDE.md](CLAUDE-CODE-GUIDE.md)** - Claude Code specific setup
- **[SEND-WITH-ATTACHMENTS.md](SEND-WITH-ATTACHMENTS.md)** - Email attachments guide
- **[CAU-2-GIAI-THICH.md](CAU-2-GIAI-THICH.md)** - Todo MCP explanation
- **[SUBMISSION.md](SUBMISSION.md)** - Test submission template

---

## 🎯 Test Assignment Completion

### Question 1: Gmail MCP ✅
- [x] Setup Claude Code + Gmail MCP
- [x] Search for application email
- [x] Extract: send date/time and first 10 words
- [x] Reply via MCP (not Gmail UI)
- [x] Provide terminal screenshots

### Question 2: Custom MCP Server ✅
- [x] Create custom MCP server (Todo Manager)
- [x] Implement 6 tools + 1 resource
- [x] Connect to Claude Code
- [x] Provide usage screenshots
- [x] Explain choice and reasoning

---

## 💡 Why Todo Manager?

### 1. Practical Use Case
Todo management is a daily need for developers. Integrating it with AI assistant eliminates context switching.

### 2. Demonstrates Full MCP Protocol
- **Tools (6):** Complete CRUD operations + analytics
- **Resources (1):** Structured data access
- **State Management:** Persistent storage with timestamps

### 3. Extensible Architecture
Easy to add:
- Tags & categories
- Recurring tasks
- Reminders & notifications
- Team collaboration
- Calendar sync
- Database backend (SQLite/PostgreSQL)

### 4. Perfect for AI Assistant
- Natural language understanding
- Context awareness across conversations
- Proactive deadline reminders
- Smart task breakdown suggestions

---

## 🔒 Security Notes

**Important:**
- `token.json` contains OAuth credentials - **never commit to Git**
- `client_secret_*.json` should normally be private (included here for demo)
- In production, use environment variables for secrets
- Review `.gitignore` before committing

---

## 🐛 Troubleshooting

### Gmail authorization fails
1. Check `client_secret_*.json` exists
2. Enable Gmail API in Google Cloud Console
3. Add `http://localhost` to Authorized redirect URIs
4. Delete `token.json` and re-authorize

### Claude Code doesn't see MCP servers
1. Verify installation: `claude mcp list`
2. Check file paths are absolute
3. Ensure Node.js is in PATH
4. Check developer console (Ctrl+Shift+I)

### Todo data not persisting
- Verify write permissions in project folder
- Check `todos.json` is created
- Review console for error messages

---

## 📝 License

MIT License - feel free to use for learning and projects.

---

## 🙏 Acknowledgments

Built for TechNext Asia AI Intern position test.

- **Platform:** Claude Code (Anthropic)
- **MCP SDK:** Model Context Protocol
- **APIs:** Gmail API v1

---

## 📧 Contact

**Author:** Tự Thức  
**GitHub:** [Ne4nf](https://github.com/Ne4nf)  
**Repository:** [Gmail-MCP](https://github.com/Ne4nf/Gmail-MCP)

---

*Last updated: March 1, 2026*
