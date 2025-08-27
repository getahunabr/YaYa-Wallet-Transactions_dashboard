# YaYa Wallet Dashboard

This project is a **full-stack coding test solution** for **YaYa Wallet**, built using **Next.js, Tailwind CSS, and TypeScript**.  
The dashboard integrates with YaYa Wallet’s REST API to display transactions for a given account with **search, pagination, and responsive UI** features.

---

## 🚀 Tech Stack

- **Next.js 14** (App Router, Server Actions)
- **TypeScript** (type safety & maintainability)
- **Tailwind CSS** (responsive design & clean UI)

---

## ✨ Features

- ✅ **Transaction Listing** – Displays transactions in a tabular format.
- ✅ **Pagination** – Fetch transactions page by page using the `p` query parameter.
- ✅ **Search** – Search transactions by **Sender, Receiver, Cause, or Transaction ID**.
- ✅ **Incoming vs Outgoing Highlighting** – Incoming transactions are visually marked (green) while outgoing transactions are marked (red). Top-up transactions are also treated as incoming.
- ✅ **Responsive Layout** – Works across desktop and mobile screen sizes.
- ✅ **Secure API Calls** – API key and secret are handled via environment variables (`.env.local`) and never exposed to the client.

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd yaya-wallet-dashboard
```

2️⃣ Install Dependencies

3️⃣ Configure Environment Variables

Create a .env.local file in the root directory with the following values:

NEXT_PUBLIC_API_BASE_URL=https://sandbox.yayawallet.com/api/en
YAYA_API_KEY=key-test_13817e87-33a9-4756-82e0-e6ac74be5f77
YAYA_API_SECRET=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...

⚠️ Note: API key & secret are placed in environment variables for security. They are never hardcoded in the client code.

4️⃣ Run Development Server
npm run dev

Then open 👉 http://localhost:3000

📖 How It Works

Transactions API

Fetch transactions using:
GET /transaction/find-by-user?p=1

Search transactions using:
POST /transaction/search with request body:

{ "query": "surafelaraya" }

Client Implementation

Pagination – Uses p parameter for pages.

Search – Normalizes input; supports both account names (Surafel Araya) and account IDs (surafelaraya).

UI – Outgoing transactions = red row, Incoming transactions = green row.

🧪 Testing the Solution

Start the dev server with npm run dev.

Navigate to the dashboard:

Check that the transactions table loads with default results.

Use the search bar to query by sender, receiver, cause, or ID.

Test pagination by moving between pages.

Verify that incoming vs outgoing rows are highlighted correctly.

Resize the window to confirm the table is responsive.

🔍 Assumptions Made

Current user is identified by the account returned from /find-by-user API.

If sender and receiver are the same, transaction is treated as top-up (incoming).

API credentials are assumed to be valid for sandbox testing.

🛡️ Security Considerations

API credentials stored in .env.local (never committed).

Used server actions to keep sensitive API calls server-side.

No direct exposure of secret keys to the frontend.

📝 Problem-Solving Approach

Started by understanding API structure and authentication.

Built the Next.js App Router structure with a clean dashboard layout.

Implemented transactions table with Tailwind’s utility classes.

Added pagination using the API’s p parameter.

Implemented search with normalization (account names vs account IDs).

Tested incoming/outgoing logic using sample data.

Finalized with responsive styling & security best practices.

📅 Deadline

This project was developed and submitted by Aug 27, 2025, 6PM EAT, as per YaYa Wallet’s coding test instructions.

👨‍💻 Author

Getahun Lakachew

Full Stack Developer (React.js, Next.js, Node.js, Tailwind CSS, TypeScript)

GitHub
| LinkedIn

---

---
