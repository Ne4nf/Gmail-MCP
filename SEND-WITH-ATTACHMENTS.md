# 📧 GỬI EMAIL KÈM SCREENSHOTS QUA GMAIL MCP

## ✅ MỚI: Tool reply_email_with_attachments

Gmail MCP đã được upgrade với tool mới:
- ✅ `reply_email_with_attachments` - Reply email có kèm file đính kèm (images, PDFs, docs...)

---

## 📸 Cách gửi reply kèm screenshots:

### BƯỚC 1: Chuẩn bị screenshots

Di chuyển screenshots vào folder project hoặc note đường dẫn đầy đủ:

```powershell
# Ví dụ: Copy screenshots vào project folder
Copy-Item "C:\Users\THUC\Pictures\Screenshot 2026-02-28 234229.png" "C:\Users\THUC\Downloads\Mail MCP Agent\screenshots\"
Copy-Item "C:\Users\THUC\Pictures\Screenshot 2026-02-28 235652.png" "C:\Users\THUC\Downloads\Mail MCP Agent\screenshots\"
```

Hoặc tạo folder screenshots:
```powershell
New-Item -ItemType Directory -Path "C:\Users\THUC\Downloads\Mail MCP Agent\screenshots" -Force
```

---

### BƯỚC 2: Reply email với attachments trong Claude Code

Gõ trong **Claude Code terminal**:

```
Reply to email ID 19c9d08e9b42cbae with attachments using this message:

Chào team TechNext Asia,

Đây là email được gửi tự động qua Gmail MCP (Claude Code CLI) - không qua Gmail UI.

✅ Kết quả Câu 1 — Gmail MCP:
- Tìm được email ứng tuyển (ID: 19c9d08e9b42cbae)  
- Ngày giờ gửi: Thu, 26 Feb 2026 21:04:16 +0700
- 10 từ đầu tiên: "Chào anh/chị, em gửi CV ở đây. Chúc anh/chị ngày tốt"
- Reply thành công qua MCP với screenshots đính kèm

📸 Screenshots đính kèm:
- Screenshot 2026-02-28 234229.png (tìm kiếm email)
- Screenshot 2026-02-28 235652.png (email detail + reply)

Source code và tài liệu đầy đủ sẽ được gửi trong email tiếp theo.

Trân trọng,
Tự Thức

Use the reply_email_with_attachments tool with these attachment paths:
- C:\Users\THUC\Downloads\Mail MCP Agent\screenshots\Screenshot 2026-02-28 234229.png
- C:\Users\THUC\Downloads\Mail MCP Agent\screenshots\Screenshot 2026-02-28 235652.png
```

---

### BƯỚC 3: Verify

Sau khi gửi thành công, Claude sẽ hiển thị:
```
Reply sent with 2 attachment(s)!
Message ID: [id]
Replied to: nathan@technext.asia
Subject: Re: [AI Intern] - TỰ THỨC
Attachments: Screenshot 2026-02-28 234229.png, Screenshot 2026-02-28 235652.png
```

---

## 🎯 PROMPT ĐƠN GIẢN HƠN:

Nếu screenshots đã ở trong folder project:

```
Reply to email 19c9d08e9b42cbae with message "Chào team TechNext, đây là kết quả Câu 1 Gmail MCP. Em đã tìm được email và reply qua MCP như yêu cầu. Screenshots đính kèm. Trân trọng!" 

Attach these files:
- screenshots/Screenshot 2026-02-28 234229.png
- screenshots/Screenshot 2026-02-28 235652.png

Use reply_email_with_attachments tool.
```

---

## 📝 Alternative: Gửi screenshots riêng

Nếu không muốn dùng tool mới, có thể:

1. **Reply text qua MCP** (không kèm ảnh)
2. **Forward email đó với screenshots** qua Gmail UI thủ công
3. Hoặc **gửi email mới** với screenshots qua `send_email` tool (không phải reply)

---

## ✅ HOÀN THÀNH CÂU 1!

Sau khi reply thành công với screenshots:
- ✅ Tìm được email ứng tuyển
- ✅ Có ngày giờ gửi chính xác
- ✅ Có 10 từ đầu tiên
- ✅ Reply qua Gmail MCP (có attachments!)
- ✅ Screenshots đã gửi kèm

**Chụp screenshot khi reply thành công → Câu 1 hoàn tất! 🎉**
