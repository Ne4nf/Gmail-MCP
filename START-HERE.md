# ✅ SETUP ĐÃ XONG - BẮT ĐẦU TEST NGAY!

## 🎯 Trạng thái hiện tại:

```
✅ Claude Code installed
✅ Gmail MCP connected
✅ Todo MCP connected  
✅ Dependencies installed
```

Trong Claude Code terminal, gõ `/mcp` để xem:
```
gmail ✓ connected
todo  ✓ connected
```

---

## 📋 VIỆC CẦN LÀM (5 bước đơn giản)

### BƯỚC 1: Authorize Gmail (1 lần duy nhất)

Trong **Claude Code terminal** (tab "Claude Code", KHÔNG phải PowerShell):

```
Use gmail MCP to search my recent emails
```

Lần đầu sẽ hiện URL → mở browser → đăng nhập Gmail → copy code → paste vào.

**Sau bước này:** File `token.json` được tạo, không cần authorize lại.

---

### BƯỚC 2: Tìm email ứng tuyển (Câu 1)

```
Search for emails I sent to TechNext Asia about internship
```

hoặc:

```
Tìm email mà tôi đã gửi cho TechNext Asia về ứng tuyển AI Intern
```

**→ Ghi lại Email ID** (dạng `18d4f5e2a1d3c8b9`)

---

### BƯỚC 3: Lấy thông tin + Reply (Câu 1)

```
Get full content of email ID: [paste email ID]
```

**→ Ghi chép:**
- Ngày giờ gửi: ____________________
- 10 từ đầu tiên: ____________________

Sau đó reply:

```
Reply to email ID [paste ID] with message:

Cảm ơn anh/chị đã gửi bài test.
Tôi đã hoàn thành Gmail MCP và Todo MCP như yêu cầu.
Mong nhận được feedback.

Trân trọng,
[Tên bạn]
```

**📸 Chụp màn hình:** Search, detail, reply success

---

### BƯỚC 4: Test Todo MCP (Câu 2)

```
Use todo MCP to add these tasks:
1. "Complete Gmail MCP" - high priority
2. "Create Todo server" - high priority
3. "Write docs" - medium priority
4. "Take screenshots" - medium priority
5. "Submit test" - high priority, due 2026-03-01
```

```
List all pending todos
```

```
Complete todos #1 and #2
```

```
Show todo statistics
```

**📸 Chụp màn hình:** Add tasks, stats

---

### BƯỚC 5: Nộp bài

**Chạy script chuẩn bị:**
```powershell
.\prepare-submission.ps1
```

**Hoặc thủ công:**
1. Zip folder này
2. Copy screenshots vào folder `screenshots/`
3. Điền [SUBMISSION.md](SUBMISSION.md)
4. Email đến TechNext Asia

**Gửi kèm:**
- ✅ ZIP source code
- ✅ Screenshots (6-8 ảnh)
- ✅ Thông tin trong SUBMISSION.md:
  - Email ID tìm được
  - Ngày giờ gửi
  - 10 từ đầu tiên
  - Reply Message ID
  - Giải thích Todo MCP

---

## 📸 Screenshots cần chụp:

1. ✅ `/mcp` trong Claude Code (showing both connected)
2. ⏳ Gmail authorization (OAuth flow)
3. ⏳ Email search results
4. ⏳ Email detail (ngày giờ + nội dung)
5. ⏳ Reply success (Message ID)
6. ⏳ Todo add tasks
7. ⏳ Todo statistics
8. ⏳ Claude Code terminal using MCP

---

## 💡 Tips:

- **Dùng Claude Code terminal** (tab Claude Code), không phải PowerShell
- **Gõ tiếng Việt hoặc tiếng Anh** đều được, Claude hiểu cả 2
- **Commands ngắn gọn:** Claude thông minh, hiểu natural language
- **Chụp screenshot sớm:** Khi nào có kết quả là chụp ngay
- **Copy/paste info quan trọng:** Email ID, ngày giờ, Message ID

---

## 🎯 Checklist nhanh:

**Câu 1 - Gmail:**
- [ ] Authorized Gmail
- [ ] Tìm được email
- [ ] Có ngày giờ gửi
- [ ] Có 10 từ đầu
- [ ] Đã reply qua MCP
- [ ] Có screenshots

**Câu 2 - Todo:**
- [ ] Tested add_todo
- [ ] Tested list_todos
- [ ] Tested complete_todo
- [ ] Tested get_stats
- [ ] Có screenshots

**Nộp bài:**
- [ ] Source code zip
- [ ] Screenshots folder
- [ ] SUBMISSION.md điền đầy đủ

---

## 📖 Các file hướng dẫn:

- **[BAI-TEST-HUONG-DAN.md](BAI-TEST-HUONG-DAN.md)** ← CHI TIẾT ĐẦY ĐỦ
- [CLAUDE-CODE-GUIDE.md](CLAUDE-CODE-GUIDE.md) - Claude Code specific
- [README.md](README.md) - Technical documentation
- [SUBMISSION.md](SUBMISSION.md) - Template nộp bài
- [TESTING.md](TESTING.md) - Testing guide

---

## 🚀 BẮT ĐẦU NGAY!

**Mở Claude Code terminal và gõ:**

```
/mcp
```

**Nếu thấy:**
```
gmail ✓ connected
todo  ✓ connected
```

**→ SẴN SÀNG! Làm theo 5 bước ở trên.**

**Good luck! 🎯**
