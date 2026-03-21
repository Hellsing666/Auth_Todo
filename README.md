# 🌟 TaskFlow: Secure Task Management

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<br />

TaskFlow is a full-stack, production-ready task management application emphasizing secure user authentication and robust data isolation. Built with the PERN stack (PostgreSQL, Express, React, Node.js), it demonstrates full-stack architecture, secure RESTful API design, and modern frontend practices.

## ✨ Key Features

- **Task Priorities:** Categorize your tasks by priority (High, Medium, Low) and instantly spot what needs attention first through intuitive visual badging.
- **Robust Authentication:** Secure user registration, login, and session management using JWTs (JSON Web Tokens) stored in HTTP-only cookies, safeguarding against XSS attacks.
- **Data Privacy & Isolation:** Relational database design ensures users can only access, create, modify, and delete their own tasks.
- **Modern UI/UX:** Responsive, mobile-first design built with Tailwind CSS, featuring subtle animations, gradient backgrounds, and an intuitive user interface.
- **RESTful API:** Clean, well-documented Express backend with middleware for route protection, error handling, and input validation.
- **Password Security:** Integration with `bcrypt` for secure hashing and salting of user credentials before database storage.

## 🛠️ Technology Stack

**Frontend Framework & Tools:**
- React.js (Vite)
- Tailwind CSS & PostCSS
- React Router DOM
- Axios (HTTP Client)

**Backend Architecture:**
- Node.js & Express.js
- JSON Web Tokens (JWT)
- Cookie-Parser & CORS
- Bcrypt (Cryptography)

**Database & Storage:**
- PostgreSQL (Neon / ElephantSQL)
- SQL queries parameterized to prevent injection

## 🏗️ Architecture & Project Structure

The project follows a decoupled client-server architecture:

```text
integrated-app/
├── backend/                  # Node/Express API Server
│   ├── config/               # Database connection logic
│   ├── middleware/           # Auth & Error handling
│   ├── routes/               # API endpoint definitions
│   └── database.sql          # DB Schema definitions
│
└── frontend/                 # React SPA
    ├── src/
    │   ├── components/       # Reusable UI elements
    │   ├── pages/            # Routable application views
    │   ├── App.jsx           # Routing & Context providers
    │   └── main.jsx          # React entry point
    └── vite.config.js
```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v16.0.0 or higher)
- PostgreSQL (or a cloud instance like Neon)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

## 🌐 API Reference

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Authenticate & set cookie | No |
| `GET` | `/api/auth/me` | Fetch current user | Yes |
| `POST` | `/api/auth/logout` | Clear auth cookie | Yes |

### Tasks (Todos)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/todos` | Retrieve user's tasks | Yes |
| `POST` | `/api/todos` | Create a new task | Yes |
| `PATCH`| `/api/todos/:id` | Update task status/text | Yes |
| `DELETE`| `/api/todos/:id`| Remove a task | Yes |

## 💡 Technical Highlights & Learnings

- **Cookie-Based JWT Auth:** Implementing HTTP-only cookies fundamentally improved my understanding of web security compared to storing tokens in localStorage.
- **Relational Data Modeling:** Gained experience designing PostgreSQL schemas with foreign keys and cascade deletes to ensure referential integrity between Users and Todos.
- **Cross-Origin Resource Sharing (CORS):** Manually configured CORS to allow credentialed requests (cookies) between the frontend and backend running on different ports.

## 📄 License & Credits

This project is licensed under the MIT License.


