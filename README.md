# interview-question-001

โปรเจกต์ตัวอย่างที่ประกอบด้วย Backend ด้วย Node.js/Express และ Frontend ด้วย React/Vite/AntD

## โครงสร้างโปรเจกต์

```text
interview-question-001/
├── README.md
├── Backend/
├── Frontend/
└── .gitignore
```

## การติดตั้งและใช้งาน

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Database

ใช้ MySQL โดยมีฐานข้อมูลชื่อ `userdb` และตาราง `users`

รันไฟล์สร้างฐานข้อมูลด้วยคำสั่ง:

```bash
mysql -u root -p < Backend/database/schema.sql
```
