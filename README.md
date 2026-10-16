# 📱 คู่มือการนำขึ้น GitHub Pages และทำเป็น Android App ด้วย PWABuilder

โฟลเดอร์นี้บรรจุไฟล์สำหรับนำไปโฮสต์บน **GitHub Pages** เพื่อใช้เป็นสะพานเชื่อม (PWA Wrapper) สู่ระบบ Apps Script เดิม โดยที่:
- **`index.html` และ `code.gs` เดิมบน Google Apps Script ยังคงเดิม 100% ไม่ต้องแก้ไข**
- ข้อมูลทั้งหมดเชื่อมต่อกับ **Google Sheets ฐานข้อมูลเดียวกันแบบเรียลไทม์**
- สามารถเลือกเข้าใช้งานผ่าน URL ของ Apps Script เดิม หรือจะเข้าผ่านลิงก์ GitHub / ติดตั้งเป็นแอป Android ก็ได้

---

## 📁 ไฟล์ที่มีในโฟลเดอร์นี้
1. `index.html` - หน้า PWA Container แบบ Fullscreen โหลดระบบ Apps Script พร้อม Splash Screen และแจ้งเตือนเน็ตหลุด
2. `manifest.json` - ไฟล์ตั้งค่า PWA สำหรับ PWABuilder (ชื่อแอป, ไอคอน, ธีม)
3. `sw.js` - Service Worker สำหรับรองรับมาตรฐาน PWA
4. `icon-192.png` & `icon-512.png` - ไอคอนแอปมาตรฐาน Android

---

## 🚀 ขั้นตอนที่ 1: ตั้งค่า URL ใน `index.html`
1. เปิดไฟล์ `index.html`
2. ค้นหาบรรทัด:
   ```javascript
   const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYOUR_SCRIPT_ID_HERE/exec";
   ```
3. นำ Web App URL ของ Apps Script ที่ได้จากการ Deploy (ลงท้ายด้วย `/exec`) มาวางแทนที่แล้วกด Save

---

## 🌐 ขั้นตอนที่ 2: นำขึ้น GitHub Pages (ฟรี)
1. ไปที่ [GitHub.com](https://github.com) สร้าง Repository ใหม่ (เช่น ตั้งชื่อว่า `court-bail-app`) และตั้งเป็น **Public**
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`) ขึ้นไปที่หน้าแรกของ Repository
3. ไปที่เมนู **Settings** ของ Repository -> เลือกแท็บ **Pages** ด้านซ้าย
4. ในส่วน **Build and deployment > Branch** ให้เลือก **`main`** (หรือ `master`) โฟลเดอร์ `/ (root)` แล้วกด **Save**
5. รอประมาณ 1-2 นาที คุณจะได้ URL เว็บไซต์ เช่น:
   ```
   https://your-username.github.io/court-bail-app/
   ```

---

## 🤖 ขั้นตอนที่ 3: สร้าง Android App ด้วย PWABuilder
1. ไปที่เว็บไซต์ [PWABuilder.com](https://www.pwabuilder.com/)
2. นำ URL GitHub Pages ของคุณ (เช่น `https://your-username.github.io/court-bail-app/`) ไปวางในช่อง แล้วกด **Start**
3. ระบบจะตรวจสอบความพร้อมของ PWA (จะแสดงผลว่าผ่านเกณฑ์สีเขียวครบถ้วน)
4. กดปุ่ม **Package for Stores**
5. เลือก **Android** -> กด **Generate Package**
6. สามารถดาวน์โหลดไฟล์:
   - **APK:** สำหรับติดตั้งและทดสอบในเครื่องมือถือ Android ได้ทันที
   - **AAB / Source:** สำหรับนำไปเผยแพร่บน Google Play Store (ถ้าต้องการ)
