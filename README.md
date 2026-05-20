# SkillGap 🎯

> An AI-driven career analytics platform delivering real-time insights into skill proficiency and career readiness.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Overview](#-api-overview)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🤖 **AI-Powered Career Roadmaps:** Personalized career path generation using the OpenAI API based on individual skill profiles.
- 📊 **Real-Time Skill Analytics:** Instant insights into skill gaps, proficiency levels, and career readiness scores.
- 🔒 **Secure Endpoints:** Authentication middleware protecting all analytics and user data endpoints.
- 🗄️ **Scalable Data Layer:** Optimized PostgreSQL schemas with normalized design for integrity and performance.
- 🔌 **Modular REST APIs:** Clean, extensible API design supporting seamless frontend integration.

---

## 🛠 Tech Stack

| Layer | Technology | Notes |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Server-side JavaScript |
| **Database** | PostgreSQL | Normalized schemas, optimized SQL queries |
| **Query Language** | SQL | Tuned for analytics performance |
| **APIs** | REST APIs | Modular, resource-based architecture |
| **AI Integration** | OpenAI API | Personalized roadmap & insight generation |
| **Auth** | Middleware (JWT / Sessions) | Secures analytics & user endpoints |

---

## 📂 Project Structure

```text
skillgap/
 ├── src/
 │   ├── controllers/        # Route handlers & business logic
 │   ├── middleware/          # Auth & request validation middleware
 │   ├── models/             # Database models & query logic
 │   ├── routes/             # REST API route definitions
 │   ├── services/           # OpenAI API integration & analytics logic
 │   └── utils/              # Helper functions & constants
 ├── db/
 │   ├── migrations/         # PostgreSQL schema migrations
 │   └── seeds/              # Sample data for development
 ├── config/                 # Environment & database configuration
 ├── tests/                  # Unit and integration tests
 ├── .env.example            # Environment variable template
 ├── package.json
 └── README.md               # ← You are here
```

---

## 🏗 Architecture

SkillGap follows a layered REST architecture, where the Node.js backend processes user skill data, queries a normalized PostgreSQL database, and calls the OpenAI API to generate personalized insights and career roadmaps.

```
Client Request
     │
     ▼
Auth Middleware  ──── (blocks unauthorized access)
     │
     ▼
REST API Routes  ──── /skills, /analytics, /roadmap
     │
     ▼
Service Layer    ──── OpenAI API calls + business logic
     │
     ▼
Data Layer       ──── PostgreSQL (normalized schemas)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL ≥ 14
- npm / Yarn / pnpm
- OpenAI API Key

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/skillgap.git
cd skillgap
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/skillgap
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

4. **Set up the database**

```bash
# Run migrations to create schema
npm run db:migrate

# (Optional) Seed with sample data
npm run db:seed
```

5. **Start the development server**

```bash
npm run dev
# Server running at http://localhost:3000
```

---

## 🔌 API Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Log in and receive token | ❌ |
| `GET` | `/api/skills` | Fetch user skill profile | ✅ |
| `POST` | `/api/skills` | Add or update skill entries | ✅ |
| `GET` | `/api/analytics` | Get skill gap analytics | ✅ |
| `POST` | `/api/roadmap/generate` | Generate AI career roadmap | ✅ |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) where possible.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for full text.

---

Built with ❤️ | SkillGap — Close the gap between where you are and where you want to be.
