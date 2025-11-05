# Backend API - Learning Project

Backend API ที่ใช้ Express.js + TypeScript + MongoDB/Mongoose สำหรับการจัดการข้อมูลและ API endpoints

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [โครงสร้าง Database Model](#โครงสร้าง-database-model)
- [โครงสร้าง Util Functions](#โครงสร้าง-util-functions)
- [Router](#router)
- [Exercises](#exercises)
- [Scripts](#scripts)
- [การติดตั้งและใช้งาน](#การติดตั้งและใช้งาน)
- [ตัวอย่างการสร้าง Model ใหม่](#ตัวอย่างการสร้าง-model-ใหม่)

## 🎯 ภาพรวม

โปรเจกต์นี้เป็น Backend API ที่ใช้:
- **Express.js** - Web framework สำหรับ Node.js
- **TypeScript** - Type-safe JavaScript
- **MongoDB/Mongoose** - Database และ ODM
- **CORS** - เปิดให้ frontend เรียกใช้ API ได้

## 📁 โครงสร้างโปรเจกต์

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts              # Database connection configuration
│   ├── Database/
│   │   └── {modelName}/             # Model แต่ละตัว
│   │       ├── {modelName}.ts       # Mongoose Model
│   │       ├── Schema/
│   │       │   └── Schema.ts        # TypeScript Schema สำหรับ validation (ไม่ใช้ as)
│   │       └── controller/          # Controller functions
│   ├── Router/
│   │   └── {routeName}/             # Route แต่ละตัว
│   │       └── index.ts             # Route handlers
│   ├── util/                        # Utility functions
│   │   └── {functionName}/
│   │       └── index.ts             # Function ที่ใช้หลายไฟล์
│   └── server.ts                    # Entry point ของ server
├── Exercise/                        # TypeScript exercises สำหรับการเรียนรู้
│   └── exercise-{number}-{topic}/   # Exercise แต่ละตัว
│       ├── exercise.ts              # โจทย์ที่ต้องแก้ไข
│       ├── solution.ts              # คำตอบ
│       └── README.md                # คำอธิบาย exercise
├── .prettierrc                      # Prettier configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies และ scripts
```

## 🗄️ โครงสร้าง Database Model

เมื่อต้องการสร้าง Database Model ใหม่ ให้ทำตามโครงสร้างดังนี้:

### โครงสร้างไฟล์

```
src/Database/{modelName}/
├── {modelName}.ts           # Mongoose Model
├── Schema/
│   └── Schema.ts            # TypeScript Schema สำหรับ validation
└── controller/              # Controller functions
```

### ตัวอย่าง: สร้าง Model Account

#### 1. สร้าง Schema (`src/Database/Account/Schema/Schema.ts`)

Schema ใช้สำหรับตรวจสอบว่าค่าที่ส่งมาถูกต้องหรือไม่ โดยไม่ใช้ `as`:

```typescript
export interface IAccountSchema {
  id: string
  name: string
  phone: number
}

export const validateAccount = (data: unknown): data is IAccountSchema => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const account = data as Record<string, unknown>

  return (
    typeof account.id === 'string' &&
    typeof account.name === 'string' &&
    typeof account.phone === 'number'
  )
}
```

#### 2. สร้าง Mongoose Model (`src/Database/Account/Account.ts`)

```typescript
import mongoose, { Schema, Document } from 'mongoose'
import { IAccountSchema } from './Schema/Schema'

export interface IAccount extends Document, IAccountSchema {
  createdAt: Date
  updatedAt: Date
}

const AccountSchema: Schema = new Schema<IAccount>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const Account = mongoose.model<IAccount>('Account', AccountSchema)
export default Account
```

#### 3. สร้าง Controller (`src/Database/Account/controller/index.ts`)

```typescript
import type { Request, Response } from 'express'
import Account from '../Account'
import { validateAccount } from '../Schema/Schema'

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body

    // ตรวจสอบข้อมูลด้วย Schema
    if (!validateAccount(body)) {
      res.status(400).json({ error: 'Invalid account data' })
      return
    }

    const newAccount = new Account(body)
    await newAccount.save()

    res.status(201).json({
      message: 'Account created successfully',
      data: newAccount,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create account',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const getAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const account = await Account.findOne({ id })

    if (!account) {
      res.status(404).json({ error: 'Account not found' })
      return
    }

    res.status(200).json({ data: account })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get account',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
```

#### 4. สร้าง Router (`src/Router/account/index.ts`)

```typescript
import express from 'express'
import { createAccount, getAccount } from '../../Database/Account/controller'

const router = express.Router()

router.post('/', createAccount)
router.get('/:id', getAccount)

export default router
```

#### 5. เพิ่ม Router ใน `server.ts`

```typescript
import accountRouter from './Router/account'

app.use('/account', accountRouter)
```

## 🛠️ โครงสร้าง Util Functions

ถ้ามี function ที่เรียกใช้งานหลายไฟล์ ให้สร้างที่ `src/util/{functionName}/index.ts`

### เมื่อไหร่ควรใช้ Util Functions?

ใช้ Util Functions เมื่อ:
- มี function ที่ถูกเรียกใช้จากหลายไฟล์ (เช่น controllers, routers, หรือ models หลายตัว)
- มี logic ที่ใช้ซ้ำและไม่ผูกกับ model หรือ route เฉพาะเจาะจง
- ต้องการแยก business logic ออกมาเพื่อให้ง่ายต่อการทดสอบและบำรุงรักษา

ตัวอย่าง: functions สำหรับ format ข้อมูล, validation, helper functions, error handling utilities เป็นต้น

### ตัวอย่าง: สร้าง Util Function

```typescript
// src/util/formatPhone/index.ts
export const formatPhone = (phone: number): string => {
  const phoneString = phone.toString()
  if (phoneString.length === 10) {
    return `${phoneString.slice(0, 3)}-${phoneString.slice(3, 6)}-${phoneString.slice(6)}`
  }
  return phoneString
}

// ใช้งานในไฟล์อื่น
import { formatPhone } from '../../util/formatPhone'
```

## 🛣️ Router

Router ใช้สำหรับจัดการ API endpoints แต่ละส่วน

### โครงสร้าง Router

```
src/Router/
└── {routeName}/
    └── index.ts
```

### ตัวอย่าง Router

```typescript
import express from 'express'
import type { Request, Response } from 'express'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Success' })
})

export default router
```

### ใช้งาน Router ใน `server.ts`

```typescript
import { routeName } from './Router/{routeName}'

app.use('/{routePath}', routeName)
```

## 📚 Exercises

โปรเจกต์นี้มี TypeScript exercises สำหรับการเรียนรู้ 10 ข้อ:

1. **Exercise 01: Basic Types** - การประกาศตัวแปรด้วย TypeScript types
2. **Exercise 02: Number Operations** - การทำงานกับตัวเลข
3. **Exercise 03: String Operations** - การทำงานกับสตริง
4. **Exercise 04: Functions** - การสร้างและใช้งาน functions
5. **Exercise 05: Arrow Functions** - การใช้ arrow functions
6. **Exercise 06: Interfaces** - การกำหนดและใช้งาน interfaces
7. **Exercise 07: Arrays** - การทำงานกับ arrays
8. **Exercise 08: Type Guards** - การตรวจสอบ types ด้วย type guards
9. **Exercise 09: Async Functions** - การทำงานแบบ asynchronous
10. **Exercise 10: Object Operations** - การทำงานกับ objects

### การใช้งาน Exercises

แต่ละ exercise มี 3 ไฟล์:
- `exercise.ts` - โจทย์ที่ต้องแก้ไข
- `solution.ts` - คำตอบที่ถูกต้อง
- `README.md` - คำอธิบายและคำแนะนำ

### รัน Exercise

```bash
# รัน exercise (จะแสดงโจทย์ที่ต้องแก้ไข)
npm run ex01
npm run ex02
# ... และอื่นๆ

# ดูคำตอบ
npm run ex01:solution
npm run ex02:solution
# ... และอื่นๆ
```

## 📜 Scripts

### Server Scripts

```bash
# รัน server ในโหมด development (auto-reload)
npm run dev

# รัน server ในโหมด production
npm start
```

### Exercise Scripts

```bash
# Exercise 01-10
npm run ex01          # รัน exercise 01
npm run ex01:solution # ดูคำตอบ exercise 01
npm run ex02          # รัน exercise 02
npm run ex02:solution # ดูคำตอบ exercise 02
# ... และอื่นๆ จนถึง ex10
```

## 🚀 การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. สร้างไฟล์ `.env`

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/your-database-name
```

### 3. รัน Server

```bash
# Development mode (auto-reload)
npm run dev

# หรือ Production mode
npm start
```

Server จะรันที่ `http://localhost:5000` (หรือ port ที่กำหนดใน `.env`)

### 4. ทดสอบ API

```bash
# ตรวจสอบว่า server ทำงาน
curl http://localhost:5000/

# ตัวอย่าง: สร้าง ShortId
curl http://localhost:5000/createShortId
```

### 5. เริ่มเรียนรู้ TypeScript

```bash
# เริ่มจาก exercise แรก
npm run ex01
```

## 📝 ตัวอย่างการสร้าง Model ใหม่

### ขั้นตอนการสร้าง Model

1. **สร้างโฟลเดอร์** `src/Database/{modelName}/`

2. **สร้าง Schema** (`Schema/Schema.ts`)
   - กำหนด interface สำหรับข้อมูล
   - สร้าง validation function ที่ไม่ใช้ `as`

3. **สร้าง Mongoose Model** (`{modelName}.ts`)
   - ใช้ interface จาก Schema
   - กำหนด Mongoose Schema

4. **สร้าง Controller** (`controller/index.ts`)
   - สร้าง functions สำหรับจัดการข้อมูล
   - ใช้ validation function จาก Schema

5. **สร้าง Router** (`src/Router/{routeName}/index.ts`)
   - กำหนด routes และ handlers
   - เรียกใช้ functions จาก controller

6. **เพิ่ม Router ใน `server.ts`**
   - import router
   - ใช้ `app.use()` เพื่อเชื่อมต่อ router

## 📚 Technologies

### Core Technologies
- **Express.js** - Web framework สำหรับ Node.js
- **TypeScript** - Type-safe JavaScript
- **Mongoose** - MongoDB ODM
- **Node.js** - Runtime environment

### Dependencies
- **dotenv** - Environment variables management
- **CORS** - Cross-Origin Resource Sharing
- **shortid** - Generate short unique IDs

### Development Dependencies
- **nodemon** - Auto-reload server during development
- **ts-node** - Run TypeScript files directly
- **@types/node** - TypeScript definitions for Node.js
- **@types/express** - TypeScript definitions for Express
- **@types/cors** - TypeScript definitions for CORS

## 🔧 Configuration

### Configuration Files

ไฟล์ configuration ต่างๆ อยู่ใน `src/config/`:

- `database.ts` - Database connection configuration สำหรับ MongoDB
  - เชื่อมต่อกับ MongoDB โดยใช้ `MONGO_URL` จาก environment variables
  - มี error handling และ validation

### TypeScript Configuration

โปรเจกต์ใช้ TypeScript strict mode เพื่อให้ type safety ดีที่สุด:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist"
  }
}
```

### Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ root (สามารถใช้ `.env.example` เป็น template):

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/your-database-name
```

**หมายเหตุ**: ไฟล์ `.env` จะถูก ignore โดย Git เพื่อความปลอดภัย ใช้ `.env.example` เป็น template สำหรับการตั้งค่า

## 📝 Notes

- โปรเจกต์นี้ใช้ TypeScript strict mode - ไม่ควรใช้ `any` type
- แต่ละ Database Model ควรมี Schema validation ที่ไม่ใช้ `as`
- Router แต่ละตัวควรอยู่ในโฟลเดอร์แยกกัน
- ใช้ `Promise<void>` สำหรับ async route handlers

## 📄 License

ISC

