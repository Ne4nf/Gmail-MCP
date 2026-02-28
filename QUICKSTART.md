# QUICK START GUIDE

## Cài đặt nhanh (5 phút)

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình Claude Desktop (tự động)
```powershell
.\setup-claude-config.ps1
```

Script sẽ tự động:
- Tạo folder config nếu chưa có
- Backup config cũ (nếu có)
- Thêm Gmail & Todo MCP servers
- Hiển thị kết quả

### 3. Restart Claude Desktop

Đóng và mở lại Claude Desktop để load MCP servers.

---

## Test nhanh

### Gmail MCP
Trong Claude Desktop, gõ:
```
Tìm 5 email mới nhất trong hộp thư của tôi
```

Lần đầu sẽ yêu cầu authorize:
1. Copy URL từ terminal/log
2. Mở browser, đăng nhập Google
3. Accept permissions
4. Copy code từ URL redirect
5. Paste vào terminal

### Todo MCP
```
Thêm task: "Hoàn thành bài test MCP" với priority cao
```

```
Liệt kê tất cả tasks
```

---

## Thực hiện bài test

### Câu 1: Gmail MCP

**Bước 1:** Tìm email ứng tuyển
```
Tìm email mà tôi đã gửi cho TechNext Asia về việc ứng tuyển
```

**Bước 2:** Lấy thông tin chi tiết
```
Cho biết ngày giờ gửi chính xác và 10 từ đầu tiên trong email đó
```

**Bước 3:** Reply email qua MCP
```
Reply email này với nội dung:
"Cảm ơn anh/chị đã gửi bài test.
Tôi đã hoàn thành cả 2 câu hỏi:
1. Gmail MCP - đã cài đặt và reply qua MCP
2. Todo MCP - custom server quản lý công việc

Mong nhận được feedback từ team.

Trân trọng!"
```

**📸 Chụp screenshot:**
- Terminal khi đang authorize Gmail
- Claude Desktop khi tìm email và reply

---

### Câu 2: Todo MCP

**Demo các tính năng:**

```
Thêm các task sau:
1. "Cài đặt Gmail MCP" - priority high
2. "Tạo Todo MCP server" - priority high  
3. "Viết README" - priority medium
4. "Chụp screenshots" - priority medium
5. "Nộp bài test" - priority high, due date 2026-03-01
```

```
Liệt kê tất cả tasks pending
```

```
Đánh dấu task 1 và 2 đã hoàn thành
```

```
Cập nhật task 3: thêm description "Bao gồm hướng dẫn setup và usage"
```

```
Cho tôi thống kê về các tasks
```

```
Xóa task test (nếu có)
```

**📸 Chụp screenshot:**
- Claude Desktop khi thêm tasks
- Claude Desktop khi list và complete tasks
- Claude Desktop khi xem stats

---

## Giải thích Todo MCP (cho câu 2)

**Tại sao chọn Todo Manager?**

1. **Practical Use Case**: 
   - Quản lý công việc là nhu cầu thực tế hàng ngày
   - Giúp tracking progress của các dự án
   
2. **Demonstrates MCP Capabilities**:
   - **6 Tools**: add, list, complete, delete, update, stats
   - **Resources**: read todo list as JSON
   - **Persistent State**: lưu data vào file JSON
   - **Rich Metadata**: priority, due date, timestamps
   
3. **Extensible**:
   - Dễ thêm: reminders, tags, categories
   - Có thể integrate: calendar, notifications
   - Scalable: database backend, multi-user
   
4. **Good for AI Assistant**:
   - Natural language todo management
   - Context awareness (AI hiểu priority, deadlines)
   - Proactive suggestions (AI nhắc việc sắp đến deadline)

---

## Troubleshooting

### Lỗi: "Cannot find module @modelcontextprotocol/sdk"
```bash
npm install
```

### Gmail authorization không hoạt động
1. Kiểm tra file `client_secret_*.json` tồn tại
2. Enable Gmail API trong Google Cloud Console
3. Thêm http://localhost vào Authorized redirect URIs

### Claude Desktop không thấy MCP servers
1. Kiểm tra config path đúng: `%APPDATA%\Claude\claude_desktop_config.json`
2. Restart Claude Desktop
3. Kiểm tra paths trong config chính xác
4. Xem Developer Tools console (Ctrl+Shift+I)

### Todo không lưu
- Check file permissions trong folder
- Tìm file `todos.json` (tự tạo lần đầu)

---

## Nộp bài

### Checklist:
- [ ] Gmail MCP hoạt động (có screenshot)
- [ ] Đã reply email qua MCP (có screenshot)
- [ ] Todo MCP hoạt động (có screenshot)
- [ ] Source code (zip hoặc GitHub)
- [ ] README với giải thích

### Files cần nộp:
1. **Screenshots** (3-5 ảnh):
   - gmail-auth.png
   - gmail-search.png
   - gmail-reply.png
   - todo-usage.png
   - todo-stats.png

2. **Source code**:
   - Zip folder này: `Mail-MCP-Agent.zip`
   - Hoặc GitHub repo link

3. **Explanation**:
   - Paste giải thích Todo MCP từ trên
   - Hoặc viết theo cách riêng của bạn

---

**Good luck! 🚀**

Nếu có vấn đề, check README.md hoặc debug với terminal.
