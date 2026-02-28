# 🎯 HƯỚNG DẪN THỰC HIỆN BÀI TEST - TECHNEXT ASIA

**Platform:** Claude Code (Anthropic)  
**Status:** ✅ Setup hoàn tất - 2 MCP servers đã connected

```
gmail ✓ connected
todo  ✓ connected
```

---

## ✅ ĐÃ CÀI ĐẶT XONG

Bạn đã có:
- ✅ Claude Code installed
- ✅ Gmail MCP server connected
- ✅ Todo MCP server connected
- ✅ Dependencies installed (node_modules)

**Không cần cài đặt gì thêm!** Chỉ cần thực hiện 2 câu hỏi.

---

## 📧 CÂU 1: GMAIL MCP

### Yêu cầu:
1. ✅ Cài đặt Claude Code + Gmail MCP (ĐÃ XONG)
2. ⏳ Tìm lại email ứng tuyển đã gửi cho TechNext Asia
3. ⏳ Cho biết chính xác: **ngày giờ gửi** và **10 từ đầu tiên**
4. ⏳ Reply email qua Gmail MCP (không dùng Gmail UI)
5. ⏳ Chụp screenshot terminal đang thực hiện

### CÁCH THỰC HIỆN:

#### Bước 1: Authorize Gmail (lần đầu tiên)

Trong **Claude Code terminal** (tab Claude Code, không phải PowerShell), gõ:

```
Sử dụng gmail MCP để tìm 5 emails mới nhất của tôi
```

hoặc bằng tiếng Anh:

```
Use the gmail MCP to search for my 5 most recent emails
```

**⚠️ Lần đầu chạy sẽ hiện thông báo authorize:**

Claude Code sẽ hiển thị:
- URL authorization từ Google
- Hướng dẫn authorize

**Làm theo:**
1. Copy URL authorization
2. Mở trong browser
3. Đăng nhập Gmail của bạn
4. Accept permissions (allow Gmail access)
5. Sau khi redirect, copy **code** từ URL
6. Paste code vào khi Claude Code hỏi

**Sau khi authorize xong,** file `token.json` sẽ được tạo → không cần authorize lại.

---

#### Bước 2: Tìm email ứng tuyển

Trong Claude Code terminal, gõ:

```
Tìm email mà tôi đã gửi cho TechNext Asia về việc ứng tuyển AI Intern
```

hoặc cụ thể hơn:

```
Search emails with query: to:technextasia.com OR subject:ứng tuyển OR subject:"AI Intern"
```

hoặc:

```
Search for emails I sent about job application to TechNext Asia
```

Claude Code sẽ invoke `search_emails` tool và trả về danh sách emails.

**Ghi lại Email ID** từ kết quả (dạng: `18d4f5e2a1d3c8b9`)

---

#### Bước 3: Lấy thông tin chi tiết

Với Email ID vừa tìm được:

```
Lấy nội dung đầy đủ của email ID: [paste ID ở đây]
```

hoặc:

```
Get full content of email ID: [paste ID]
```

Claude Code sẽ invoke `get_email` tool.

**Từ kết quả, ghi chính xác:**
- ✍️ **Ngày giờ gửi:** (ví dụ: "Thu, 25 Feb 2026 14:30:00 +0700")
- ✍️ **10 từ đầu tiên trong email:** (ví dụ: "Kính gửi anh chị, Em tên là... [10 từ]")

📸 **Screenshot 1:** Chụp màn hình Claude Code khi hiển thị thông tin email này

---

#### Bước 4: Reply qua Gmail MCP

**⚠️ QUAN TRỌNG:** Reply qua MCP, không được mở Gmail UI!

Trong Claude Code terminal:

```
Reply email ID [paste ID] với nội dung:

Cảm ơn anh/chị đã gửi bài test về MCP servers.

Tôi đã hoàn thành cả 2 câu:

Câu 1 - Gmail MCP:
✓ Tìm được email ứng tuyển
✓ Lấy được ngày giờ gửi và 10 từ đầu tiên
✓ Reply qua MCP (không qua Gmail UI)

Câu 2 - Todo MCP:
✓ Tạo custom server quản lý công việc
✓ Implement đầy đủ 6 tools và 1 resource

Mong nhận được feedback từ team TechNext Asia.

Trân trọng,
[Tên bạn]
```

hoặc bằng tiếng Anh:

```
Reply to email ID [paste ID] with message:

Thank you for sending the MCP test assignment.

I have completed both questions:

Question 1 - Gmail MCP:
✓ Found the application email
✓ Retrieved send date/time and first 10 words
✓ Replied via MCP (not Gmail UI)

Question 2 - Todo MCP:
✓ Created custom todo management server
✓ Implemented 6 tools and 1 resource

Looking forward to your feedback.

Best regards,
[Your name]
```

Claude Code sẽ invoke `reply_email` tool.

📸 **Screenshot 2:** Chụp màn hình khi reply thành công (hiện Message ID)

---

### ✅ Hoàn thành Câu 1

**Checklist:**
- [ ] Gmail đã authorize (có file `token.json`)
- [ ] Tìm được email ứng tuyển
- [ ] Đã note: ngày giờ gửi chính xác
- [ ] Đã note: 10 từ đầu tiên trong email
- [ ] Đã reply qua MCP (xác nhận có Message ID)
- [ ] Có screenshot authorize/search
- [ ] Có screenshot email detail (ngày giờ + nội dung)
- [ ] Có screenshot reply success

---

## ✅ CÂU 2: CUSTOM MCP SERVER (TODO MANAGER)

### Yêu cầu:
1. ⏳ Tạo custom MCP server (ĐÃ CÓ: todo-mcp-server.js)
2. ⏳ Gửi source code (zip hoặc GitHub)
3. ⏳ Screenshot kết nối và sử dụng
4. ⏳ Giải thích: chọn làm gì và tại sao

### Server đã tạo: TODO MANAGER MCP

**File:** `todo-mcp-server.js`

**Chức năng:**
- ✅ **6 Tools:**
  1. `add_todo` - Thêm task mới (title, description, priority, dueDate)
  2. `list_todos` - List tasks (filter by status/priority)
  3. `complete_todo` - Đánh dấu hoàn thành
  4. `delete_todo` - Xóa task
  5. `update_todo` - Update task
  6. `get_stats` - Thống kê (completion rate, by priority)

- ✅ **1 Resource:**
  - `todo://list` - Read entire todo list as JSON

- ✅ **Persistent Storage:** Lưu vào `todos.json`

---

### CÁCH THỰC HIỆN:

#### Bước 1: Test Todo MCP

Trong Claude Code terminal, thực hiện các lệnh sau:

**1. Thêm todos:**

```
Sử dụng todo MCP để thêm các tasks sau:
1. "Hoàn thành Gmail MCP" - priority high
2. "Tạo Todo MCP server" - priority high
3. "Viết documentation" - priority medium
4. "Chụp screenshots" - priority medium
5. "Nộp bài test" - priority high, due date 2026-03-01
```

📸 **Screenshot 3:** Chụp khi thêm tasks thành công

**2. List todos:**

```
Liệt kê tất cả todos đang pending
```

hoặc:

```
List all todos with high priority
```

**3. Complete todos:**

```
Đánh dấu todo #1 và #2 đã hoàn thành
```

**4. Xem thống kê:**

```
Cho tôi xem thống kê về các todos
```

📸 **Screenshot 4:** Chụp khi hiển thị statistics

**5. Update todo:**

```
Update todo #3: thêm description "Include setup guide and usage examples"
```

**6. Delete todo:**

```
Xóa todo #4
```

---

#### Bước 2: Verify connection status

Gõ trong terminal:

```
/mcp
```

Sẽ hiển thị:
```
gmail ✓ connected
todo  ✓ connected
```

📸 **Screenshot 5:** Chụp output của `/mcp`

---

### ✅ Hoàn thành Câu 2

**Checklist:**
- [x] Custom MCP server created (todo-mcp-server.js)
- [x] Server connected to Claude Code (✓ connected)
- [ ] Tested all 6 tools
- [ ] Screenshots of usage
- [ ] Screenshot of `/mcp` showing connected

---

## 📝 GIẢI THÍCH TODO MCP (cho submission)

**Copy đoạn này vào submission:**

---

### Tại sao chọn Todo Manager MCP Server?

**1. Practical & Real-world Use Case**

Todo Manager là ứng dụng thực tế mà developers sử dụng hàng ngày. Nó giải quyết vấn đề quản lý công việc, tracking progress, và prioritization - những nhu cầu thiết yếu trong môi trường làm việc agile.

**2. Demonstrates Full MCP Protocol Capabilities**

Server này showcase toàn bộ khả năng của Model Context Protocol:

- **Tools (6):** add_todo, list_todos, complete_todo, delete_todo, update_todo, get_stats
  - Mỗi tool có input schema rõ ràng với validation
  - Support rich parameters: priority levels, due dates, filtering
  
- **Resources (1):** `todo://list` - cho phép AI đọc structured data
  
- **State Management:** Persistent storage với JSON file
  - Atomic writes để tránh data corruption
  - Timestamps cho tracking (createdAt, completedAt)

**3. Extensibility & Scalability**

Architecture cho phép dễ dàng mở rộng:
- Thêm features: tags, categories, recurring tasks, reminders
- Integration: calendar sync, notifications, team collaboration
- Upgrade storage: SQLite, PostgreSQL, MongoDB
- Multi-user support với authentication

**4. Perfect for AI Assistant Integration**

Todo Manager tận dụng tối đa khả năng của AI:
- **Natural Language Processing:** AI hiểu "add high priority task due tomorrow"
- **Context Awareness:** AI nhớ context của conversation để suggest smart actions
- **Proactive Assistance:** AI có thể nhắc nhở deadlines, suggest task breakdown
- **Smart Categorization:** AI tự động categorize và prioritize

**5. Code Quality**

- Clean code với proper error handling
- Type-safe input validation
- Comprehensive tool descriptions cho AI
- Production-ready structure

---

## 📦 CHUẨN BỊ NỘP BÀI

### Files cần nộp:

**1. Source Code (ZIP)**

Chạy trong PowerShell terminal:

```powershell
.\prepare-submission.ps1
```

Script sẽ tự động:
- Tạo folder submission
- Copy source code
- Tạo folder screenshots
- Tạo ZIP file ready to submit

**Manual alternative:**

Zip các files sau:
```
- gmail-mcp-server.js
- todo-mcp-server.js
- package.json
- package-lock.json
- client_secret_*.json
- README.md
- QUICKSTART.md
- TESTING.md
- SUBMISSION.md
- .gitignore
```

**2. Screenshots (6-8 ảnh)**

Copy vào folder `screenshots/`:
```
1. gmail-authorization.png       - OAuth authorization flow
2. gmail-search-result.png        - Search results với email ID
3. gmail-email-detail.png         - Full email (ngày giờ + 10 từ đầu)
4. gmail-reply-success.png        - Reply qua MCP thành công
5. todo-add-tasks.png             - Thêm todos
6. todo-statistics.png            - Stats output
7. mcp-connected-status.png       - `/mcp` showing both connected
8. claude-code-terminal.png       - Terminal đang sử dụng MCP
```

**3. Text Information**

Trong email/submission, ghi rõ:
```
Câu 1 - Gmail MCP:
- Email ID: [paste ID]
- Ngày giờ gửi: [chính xác]
- 10 từ đầu tiên: [paste 10 words]
- Reply Message ID: [paste ID]

Câu 2 - Todo MCP:
- Server: Todo Manager
- Tools: 6 (add, list, complete, delete, update, stats)
- Resources: 1 (todo://list)
- [Paste giải thích từ trên]
```

---

## ✅ FINAL CHECKLIST

### Câu 1 - Gmail MCP:
- [ ] Gmail authorized (có token.json)
- [ ] Email ứng tuyển đã tìm thấy
- [ ] Ngày giờ gửi đã ghi chính xác
- [ ] 10 từ đầu tiên đã ghi
- [ ] Đã reply qua MCP (có Message ID)
- [ ] Screenshots đầy đủ (authorize, search, detail, reply)

### Câu 2 - Todo MCP:
- [ ] Server code complete (todo-mcp-server.js)
- [ ] 6 tools đã test hết
- [ ] Resource (todo://list) works
- [ ] Screenshots đầy đủ (usage, stats, /mcp)
- [ ] Giải thích đã viết

### Submission:
- [ ] Source code đã zip
- [ ] Screenshots trong folder riêng
- [ ] SUBMISSION.md đã điền đầy đủ
- [ ] Email subject: "AI Intern Test - [Tên bạn]"
- [ ] Double-check tất cả links/files

---

## 🎯 QUICK COMMANDS REFERENCE

### Claude Code Terminal:

**Gmail MCP:**
```
Use gmail MCP to search: [query]
Get email ID: [id]
Reply to email ID [id] with: [message]
```

**Todo MCP:**
```
Add todo: [title] with [priority] priority
List all [status] todos
Complete todo #[id]
Show todo statistics
```

**MCP Status:**
```
/mcp
```

---

## 🚀 SẴN SÀNG!

**Tất cả đã setup xong. Bạn chỉ cần:**

1. ✅ Authorize Gmail lần đầu
2. ✅ Tìm email ứng tuyển, lấy info, reply
3. ✅ Test Todo MCP với các tools
4. ✅ Chụp screenshots
5. ✅ Chuẩn bị submission package
6. ✅ Nộp bài!

**Good luck! 🎯**

---

*Created: 2026-02-28*  
*Platform: Claude Code*  
*MCP Servers: Gmail ✓ Todo ✓*
