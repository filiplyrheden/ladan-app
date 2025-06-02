# Ladan App

**Ladan** is a simple inventory app built with React and Supabase, designed to help keep track of what items are available or need to be refilled in a shared space — like a summer house.

## 📦 Features

- ✅ Add items that need to be restocked
- 🔁 Toggle item status between “behövs” (needed) and “finns” (available)
- ❌ Delete items when no longer relevant
- 📝 Shared notes area with autosave, perfect for reminders or planning
- ☁️ All data is synced with Supabase in real time

## 🧰 Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL + Realtime + Auth)

## 📸 Screenshot
<img width="1233" alt="Ladan app UI" src="https://github.com/user-attachments/assets/9a6a6acb-edf1-4b2d-aea2-af569e176957" />

## 🧑‍💻 Development Setup

1. **Clone the repo**

```
git clone https://github.com/your-username/ladan.git
cd ladan
```

2. **Install dependencies**

```
npm install
```

3. **Configure environment**

Create a .env file in the root with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run the app locally**

```
npm run dev
```

## 🗃️ Database schema

`items` table
| Column | Type | Description                |
| ------ | ---- | -------------------------- |
| id     | int  | Primary key                |
| name   | text | Name of the item           |
| status | text | Either `finns` or `behövs` |

`notes` table
| Column | Type | Description        |
| ------ | ---- | ------------------ |
| id     | int  | Primary key        |
| note   | text | Freeform text note |
   
