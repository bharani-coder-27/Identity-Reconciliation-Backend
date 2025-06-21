# 🔍 Identity Reconciliation Backend

This backend service helps intelligently reconcile user identities (email & phone number) to identify whether multiple contact records belong to the same person.

---

## 🚀 Features

- Match users by email, phone number, or both
- Automatically merges multiple identities
- Handles complex overlap scenarios (merge logic)
- Returns consolidated contact info
- Organized in clean architecture: `routes`, `controllers`, `services`, `models`

---

## 🧠 Use Case

> Suppose a user (like "Doc") uses different emails and phone numbers while placing orders. This service ensures all those contacts are reconciled and linked to a single **primary identity**.

---

## 🧰 Tech Stack

| Layer         | Tech Used                    |
|---------------|------------------------------|
| Language      | Node.js (ES Modules)         |
| Framework     | Express                      |
| ORM           | Prisma                       |
| Database      | PostgreSQL                   |
| Dev Tools     | Nodemon, dotenv              |
| API Testing   | Postman                      |
| Folder Design | MVC-style architecture       |

---

## 📁 Folder Structure

```
identity-reconciliation-backend/
├── prisma/                 # Prisma schema and DB migrations
├── src/
│   ├── controllers/        # Route handlers
│   ├── routes/             # Express route definitions
│   ├── services/           # Core logic (merge & insert)
│   ├── models/             # Prisma client config
│   └── index.js            # Entry point
├── .env                    # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [PostgreSQL](https://www.postgresql.org/) installed
- [pgAdmin](https://www.pgadmin.org/) (optional GUI for DB)
- GitHub account

---

### 🧪 Step-by-Step Setup

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/bharani-coder-27/Identity-Reconciliation-Backend
cd identity-reconciliation-backend
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Configure `.env`

Create a file named `.env` in the root directory:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<your_database>"
PORT=3000
```

> Replace `<username>`, `<password>`, and `<your_database>` with your PostgreSQL credentials.

---

#### 4️⃣ Run Database Migration

This will create the `Contact` table in your DB:

```bash
npx prisma migrate dev --name init
```

---

#### 5️⃣ Start the Server

```bash
npm run dev
```

📍 Server will run at: `http://localhost:3000`

---

## 📮 API Endpoint

### 🔹 `POST /identify`

#### ✅ Request Example
```json
{
  "email": "doc@example.com",
  "phoneNumber": "1234567890"
}
```

#### 🔁 Response Example
````json
{
  "primaryContactId": 1,
  "emails": ["doc@example.com", "doc@x.com"],
  "phoneNumbers": ["1234567890", "9876543210"],
  "secondaryContactIds": [2, 3]
}
```

---

## 🧪 Testing the API

You can test the API using:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

---

## ✅ Bonus Tips

- Use `npx prisma studio` to open Prisma GUI and manage data.
- Use seed scripts to insert test cases.
- Add more endpoints like `/contacts`, `/delete`, etc. for admin access.

---

## ✍️ Author

**Bharanidharan G**  
[GitHub](https://github.com/bharani-coder-27)

---

## 📄 License

This project is open-source under the MIT License.


## 🔖 Tags

`Node.js` `Express` `Prisma` `PostgreSQL` `Backend API` `Identity Resolution` `REST API`

