# Hướng dẫn sử dụng MCP với Claude Code

## ✅ Setup hoàn tất!

Cả 2 MCP servers đã được cài đặt thành công trong Claude Code:
- ✓ **gmail** - Gmail MCP Server (Connected)
- ✓ **todo** - Todo MCP Server (Connected)

---

## 🎯 Cách sử dụng trong Claude Code

### Trong Claude Code chat/terminal, gõ:

```
/mcp
```

Để xem danh sách MCP servers và tools có sẵn.

---

## 📧 CÂU 1: Test Gmail MCP

### Bước 1: Authorize Gmail (Lần đầu tiên)

Trong Claude Code chat, yêu cầu:

```
Use the gmail MCP server to search for my recent emails
```

**Lần đầu chạy sẽ cần authorize:**
1. Claude Code sẽ hiển thị URL authorization
2. Copy URL đó, mở trong browser
3. Đăng nhập Google account của bạn
4. Chấp nhận permissions
5. Copy authorization code từ URL redirect
6. Paste code vào khi Claude Code yêu cầu

### Bước 2: Tìm email ứng tuyển

```
Search for emails I sent to TechNext Asia about internship application
```

hoặc

```
Search emails with query: to:technextasia OR subject:ứng tuyển
```

### Bước 3: Lấy thông tin chi tiết

Sau khi có email ID từ kết quả tìm kiếm:

```
Get the full content of email ID [paste email ID here]
```

```
Tell me the exact date/time sent and the first 10 words of that email
```

### Bước 4: Reply email qua MCP

```
Reply to email ID [paste email ID] with this message:

"Cảm ơn anh/chị đã gửi bài test.

Tôi đã hoàn thành cả 2 câu:
1. Gmail MCP - tìm được email ứng tuyển và reply qua MCP
2. Todo MCP - tạo custom server quản lý công việc

Mong nhận được feedback từ team.

Trân trọng!"
```

📸 **Screenshot:** Chụp màn hình Claude Code khi thực hiện các bước trên

---

## ✅ CÂU 2: Test Todo MCP

### Thêm todos

```
Use the todo MCP to add these tasks:
1. "Hoàn thành Gmail MCP" - high priority
2. "Tạo Todo MCP server" - high priority  
3. "Viết documentation" - medium priority
4. "Chụp screenshots" - medium priority
5. "Nộp bài test" - high priority, due date 2026-03-01
```

### List todos

```
Show me all pending todos
```

hoặc

```
List all todos filtered by high priority
```

### Complete todos

```
Mark todo #1 as completed
```

```
Complete todos #1 and #2
```

### View statistics

```
Show me todo statistics
```

### Update todo

```
Update todo #3: add description "Include setup guide and usage examples"
```

### Delete todo

```
Delete todo #4
```

📸 **Screenshot:** Chụp màn hình Claude Code khi sử dụng Todo MCP

---

## 🔍 Các lệnh MCP hữu ích

### Xem danh sách MCP servers
```
/mcp
```

### Xem chi tiết một server
```bash
claude mcp get gmail
claude mcp get todo
```

### Xem logs/debug
```bash
# Check config file
Get-Content "$env:USERPROFILE\.claude.json"
```

---

## ✨ Ví dụ câu lệnh thực tế

### Gmail MCP

**Tìm kiếm emails:**
```
Search for emails from the last 7 days
Search emails with subject containing "interview"
Find all unread emails
```

**Đọc email:**
```
Get email with ID xyz123
Show me the full content of the first email found
```

**Gửi email:**
```
Send an email to test@example.com with subject "Test" and body "Hello"
```

**Reply email:**
```
Reply to email ID xyz123 with message "Thank you for your email"
```

### Todo MCP

**Quản lý tasks:**
```
Add a todo: "Review MCP documentation" with high priority and due date 2026-03-05
List all high priority tasks
Show completed tasks
```

**Thống kê:**
```
What's my todo completion rate?
How many pending tasks do I have?
```

---

## 🎯 Hoàn thành bài test

### Checklist cho Câu 1 (Gmail MCP):
- [ ] MCP server connected ✅
- [ ] Gmail authorized
- [ ] Tìm được email ứng tuyển
- [ ] Note ngày giờ gửi chính xác
- [ ] Note 10 từ đầu tiên
- [ ] Reply email qua MCP (không qua Gmail UI)
- [ ] Screenshot các bước

### Checklist cho Câu 2 (Todo MCP):
- [ ] MCP server connected ✅
- [ ] Test add_todo tool
- [ ] Test list_todos tool (với filter)
- [ ] Test complete_todo tool
- [ ] Test update_todo tool
- [ ] Test delete_todo tool
- [ ] Test get_stats tool
- [ ] Screenshot các bước

### Giải thích Todo MCP:

Paste vào submission:

> **Tại sao chọn Todo Manager MCP?**
> 
> Tôi chọn Todo Manager vì:
> 
> 1. **Practical Use Case**: Quản lý công việc là nhu cầu thực tế hàng ngày của developers
> 
> 2. **Demonstrates Full MCP**: Server này showcase đầy đủ khả năng của MCP protocol:
>    - 6 Tools: add, list, complete, delete, update, stats
>    - Resources: todo://list để đọc structured data
>    - Persistent State: lưu trữ vào JSON file
>    - Rich Metadata: priority levels, due dates, timestamps
> 
> 3. **Extensible**: Dễ dàng mở rộng thêm features như tags, reminders, team collaboration, calendar sync
> 
> 4. **Perfect for AI**: Natural language task management, AI có thể hiểu context (priorities, deadlines) và đưa ra suggestions proactive

---

## 📦 Nộp bài

1. **Screenshots** (6-8 ảnh):
   - claude-code-mcp-list.png
   - gmail-authorization.png
   - gmail-search-email.png
   - gmail-email-detail.png
   - gmail-reply-success.png
   - todo-add-tasks.png
   - todo-statistics.png

2. **Source Code**:
   - Zip folder này
   - Hoặc push lên GitHub

3. **Documentation**:
   - Điền SUBMISSION.md với thông tin của bạn
   - Include giải thích Todo MCP

---

## 🚀 Ready to go!

**Claude Code đã sẵn sàng với 2 MCP servers!**

Bạn có thể bắt đầu test ngay trong Claude Code chat.

**Tip:** Sử dụng ngôn ngữ tự nhiên, Claude Code sẽ tự động invoke đúng MCP tools để thực hiện tasks.

Good luck! 🎯
