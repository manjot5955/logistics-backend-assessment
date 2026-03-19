# Logistics Backend API

A Node.js + Express + MySQL backend system for managing products and orders with authentication, transactions, and concurrency-safe stock handling.

---

## 🚀 Features

- JWT Authentication (Register / Login)
- Role-Based Access Control (ADMIN / USER)
- Product CRUD (Admin only for create/update/delete)
- Order Creation with Atomic Transactions
- Concurrency-safe stock management (row-level locking)
- Order Filtering (status, date range)
- Pagination & Sorting
- Order Cancellation with stock restoration
- Centralized error handling
- Validation middleware
- Sequelize migrations

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT
- bcrypt
- express-validator

---

## 📁 Project Structure

src/
├── config/
├── models/
├── migrations/
├── controllers/
├── services/
├── routes/
├── middleware/
├── validators/
├── app.js
└── server.js

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Create .env File

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=logistics_db
JWT_SECRET=your_secret_key
```

### 3️⃣ Run Migrations (Creates Database Tables)

```
npx sequelize-cli db:migrate
```

### 4️⃣ Start Server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication APIs

### Register
POST /auth/register

### Login
POST /auth/login

Returns JWT token.

Use token in header:

```
Authorization: Bearer <token>
```

---

## 📦 Product APIs

GET /products  
GET /products/:id  
POST /products (ADMIN only)  
PUT /products/:id (ADMIN only)  
DELETE /products/:id (ADMIN only)

Supports pagination:

```
/products?page=1&limit=10
```

---

## 🛒 Order APIs

POST /orders  
GET /orders  
POST /orders/:id/cancel  

Supports:

- Filter by status
- Filter by date range
- Pagination
- Sorting
- Includes total item count

Example:

```
/orders?status=PENDING&page=1&limit=5&sort=created_at&order=DESC
```

---

## 🔄 Atomic Transactions

Order creation and cancellation use database transactions with row-level locking to ensure:

- No partial updates
- No negative stock
- Concurrency-safe operations

---

## 🧠 Concurrency Handling

Uses SELECT FOR UPDATE locking inside transactions to prevent race conditions when multiple users place orders simultaneously.

---

## 📌 Database Schema Managed via Migrations

All tables are created using Sequelize migrations instead of auto sync, ensuring version-controlled schema changes.

---

## 👨‍💻 Author

Backend assessment submission.