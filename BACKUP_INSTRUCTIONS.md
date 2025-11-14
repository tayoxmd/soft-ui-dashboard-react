# تعليمات النسخ الاحتياطي

## النسخ الاحتياطي التلقائي

تم إنشاء سكريبتات PowerShell للنسخ الاحتياطي التلقائي:

### 1. النسخ الاحتياطي قبل التحديث
```powershell
powershell -ExecutionPolicy Bypass -File backup.ps1
```

### 2. النسخ الاحتياطي بعد التحديث
```powershell
powershell -ExecutionPolicy Bypass -File backup-after-update.ps1
```

## مواقع النسخ الاحتياطي

### GitHub Backup
- المسار: `C:\Users\xmd55\Desktop\Backup\Github-Backup`
- يحتوي على: جميع الملفات عدا `node_modules` و `.git`
- الاستخدام: نسخ احتياطي كامل للمشروع

### CPanel Backup
- المسار: `C:\Users\xmd55\Desktop\Backup\CPanel-Backup`
- يحتوي على: الملفات الجاهزة للرفع على cPanel
  - `src/`
  - `public/`
  - `package.json`
  - `package-lock.json`
  - `jsconfig.json`
  - `gulpfile.js`
  - `README.md`
  - `build/` (إن وجد)
- الاستخدام: جاهز للرفع المباشر على cPanel

## ملاحظات

- يتم إنشاء نسخة احتياطية جديدة في كل مرة مع timestamp
- الصيغة: `backup_before_YYYY-MM-DD_HH-mm-ss` أو `backup_after_YYYY-MM-DD_HH-mm-ss`
- يمكن تشغيل السكريبتات يدوياً أو إضافتها إلى git hooks


