# BÀI TEST AI INTERN - TECHNEXT ASIA

**Họ tên:** [Điền tên bạn]  
**Email:** [Điền email]  
**Ngày nộp:** [Điền ngày]  
**Platform:** Claude Code (Anthropic)

---

## CÂU 1: GMAIL MCP

### Setup & Implementation

✅ **Completed Tasks:**
- [x] Cài đặt @modelcontextprotocol/sdk
- [x] Cài đặt googleapis 
- [x] Tạo Gmail MCP server với đầy đủ chức năng
- [x] Cấu hình OAuth 2.0
- [x] Integrate với Claude Code MCP

### Chức năng đã implement:

1. **search_emails**: Tìm kiếm email theo query
2. **get_email**: Lấy nội dung đầy đủ của email
3. **send_email**: Gửi email mới
4. **reply_email**: Reply email (threading đúng)

### Thực hiện yêu cầu:

#### 1. Tìm email ứng tuyển
- **Query sử dụng:** `[Ghi lại query đã dùng]`
- **Email ID tìm được:** `[Ghi email ID]`

#### 2. Thông tin email:
- **Ngày giờ gửi:** `[Điền chính xác ngày giờ]`
- **10 từ đầu tiên:** `[Điền 10 từ đầu tiên của email]`

#### 3. Reply email:
- **Đã reply qua Gmail MCP:** ✅ Yes
- **Reply Message ID:** `[ID của email reply]`
- **Nội dung reply:** 
  ```
  [Paste nội dung reply ở đây]
  ```

### Screenshots

📸 **Bao gồm:**
1. `claude-code-mcp-status.png` - `/mcp` showing both servers connected
2. `gmail-authorization.png` - OAuth authorization flow
3. `gmail-search-result.png` - Kết quả tìm kiếm email
4. `gmail-email-detail.png` - Chi tiết email (ngày giờ, nội dung)
5. `gmail-reply-success.png` - Reply thành công qua MCP

---

## CÂU 2: CUSTOM MCP SERVER - TODO MANAGER

### Tại sao chọn Todo Manager?

**Lý do lựa chọn:**

1. **Practical & Useful** 🎯
   - Quản lý công việc là nhu cầu thực tế hàng ngày
   - Giúp tracking progress của dự án và tasks
   - Ứng dụng được ngay trong công việc

2. **Demonstrates Full MCP Capabilities** 💪
   - **Tools (6)**: add, list, complete, delete, update, stats
   - **Resources (1)**: read entire todo list as JSON
   - **State Management**: Persistent storage với JSON file
   - **Rich Data Model**: priority, due date, timestamps, status

3. **Extensible Architecture** 🚀
   - Dễ dàng mở rộng: tags, categories, reminders
   - Có thể integrate: calendar, notifications, team collaboration
   - Scalable: chuyển sang database, multi-user support

4. **Perfect for AI Assistant** 🤖
   - Natural language task management
   - AI có thể hiểu context (priority, deadlines)
   - Proactive suggestions (nhắc việc sắp đến hạn)
   - Smart categorization

### Implementation Details

**Tools Implemented:**
```
1. add_todo      - Thêm task mới (title, description, priority, dueDate)
2. list_todos    - List tasks (filter by status/priority)
3. complete_todo - Đánh dấu hoàn thành + timestamp
4. delete_todo   - Xóa task
5. update_todo   - Update bất kỳ field nào
6. get_stats     - Thống kê: completion rate, by priority
```

**Resources:**
```
todo://list - Read entire todo list as structured JSON
```

**Data Model:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Details",
  "priority": "high|medium|low",
  "dueDate": "YYYY-MM-DD",
  "status": "pending|completed",
  "createdAt": "ISO timestamp",
  "completedAt": "ISO timestamp or null"
}
```

### Demo Usage

**Test cases thực hiện:**

1. ✅ Add multiple todos với different priorities
2. ✅ List và filter by status
3. ✅ Complete tasks
4. ✅ Update task details
5. ✅ Delete tasks
6. ✅ View statistics
7. ✅ Read resource (todo://list)

### Screenshots

📸 **Bao gồm:**
1. `todo-add-tasks.png` - Thêm nhiều tasks qua Claude Code
2. `todo-list-filter.png` - List và filter tasks
3. `todo-complete.png` - Complete tasks
4. `todo-stats.png` - Xem statistics
5. `todo-claude-code-usage.png` - Claude Code terminal đang sử dụng

---

## SOURCE CODE

### Files Structure
```
Mail MCP Agent/
├── gmail-mcp-server.js          # Gmail MCP implementation
├── todo-mcp-server.js           # Todo MCP implementation  
├── package.json                 # Dependencies
├── client_secret_*.json         # OAuth credentials
├── README.md                    # Full documentation
├── QUICKSTART.md                # Quick start guide
├── TESTING.md                   # Testing guide
├── setup-claude-config.ps1      # Auto setup script
└── claude_desktop_config.json   # Example config
```

### Technologies Used
- **Platform:** Claude Code (Anthropic)
- **Runtime:** Node.js v24+
- **MCP SDK:** @modelcontextprotocol/sdk v1.27+
- **Gmail API:** googleapis v171+
- **Auth:** Google OAuth 2.0
- **Storage:** JSON file system

---

## SUBMISSION PACKAGE

### Included Files:

1. **Source Code** 📦
   - [ ] Entire project folder (zipped)
   - [ ] Or GitHub repository: `[Link nếu có]`

2. **Screenshots** 📸  
   - [ ] Claude Code `/mcp` status
   - [ ] Gmail authorization
   - [ ] Gmail search & detail
   - [ ] Gmail reply success
   - [ ] Todo add & list
   - [ ] Todo stats & usage

3. **Documentation** 📄
   - [x] README.md với hướng dẫn đầy đủ
   - [x] QUICKSTART.md để setup nhanh
   - [x] TESTING.md để test
   - [x] This submission document

---

## TECHNICAL NOTES

### Challenges Encountered:
1. **[Ghi lại khó khăn gặp phải - nếu có]**
2. **[Cách giải quyết]**

### What I Learned:
1. **[Những gì học được về MCP]**
2. **[Kinh nghiệm với Gmail API]**
3. **[Insights về AI assistant integration]**

### Future Improvements:
1. **Gmail MCP:**
   - Add attachment support
   - Calendar integration
   - Email templates
   - Advanced search filters

2. **Todo MCP:**  
   - Database backend (SQLite/PostgreSQL)
   - User authentication
   - Recurring tasks
   - Tags and categories
   - Reminders & notifications
   - Team collaboration features

---

## CONTACT

**Email:** [Your email]  
**GitHub:** [Your GitHub if any]  
**LinkedIn:** [Your LinkedIn if any]

---

## CHECKLIST BEFORE SUBMISSION ✅

- [ ] Gmail MCP hoạt động đầy đủ
- [ ] Đã tìm được email ứng tuyển
- [ ] Đã note ngày giờ và 10 từ đầu
- [ ] Đã reply qua MCP (không qua UI)
- [ ] Todo MCP hoạt động đầy đủ
- [ ] Đã test tất cả 6 tools
- [ ] Screenshots đầy đủ và rõ ràng
- [ ] Source code clean và có comments
- [ ] README hướng dẫn chi tiết
- [ ] Giải thích rõ tại sao chọn Todo MCP
- [ ] Đã zip/upload source code
- [ ] Double-check tất cả links và files

---

**Xin cảm ơn team TechNext Asia đã cho cơ hội thực hiện bài test thú vị này! 🙏**

*Submitted on: [Date]*
