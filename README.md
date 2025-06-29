
# 📚 Reflect Reads – MERN Stack Project

A full-stack book browsing and ordering app built using the MERN stack with a modern Tailwind + Vite frontend.

---

## 🚀 Tech Stack

### 🌐 Frontend
- **React (with Vite):** A fast and efficient JavaScript library for building user interfaces.
- **TailwindCSS:** A utility-first CSS framework for rapidly styling web applications.
- **Axios:** A promise-based HTTP client for making API calls.

### 🔧 Backend
- **Node.js + Express:** A powerful JavaScript runtime and a minimalist web framework for building robust APIs.
- **MongoDB + Mongoose:** A NoSQL database and an ODM (Object Data Modeling) library for MongoDB, providing a straightforward schema-based solution to model your application data.
- **JWT Auth:** JSON Web Tokens for secure user authentication.
- **REST API architecture:** A set of principles for designing networked applications.

---

## 📁 Folder Structure

```
Reflect Reads (Full Stack)/
├── frontend/       # Vite + React + Tailwind client
├── backend/        # Express + MongoDB server
└── README.md       # This file
```

---

## 🧠 Features

- 🧾 **User authentication:** Secure signup and login functionalities.
- 📚 **Book catalog browsing:** Browse a wide collection of books.
- 🛒 **Order management system:** Manage user orders efficiently.
- 🧑 **User model & profile:** Comprehensive user profiles with personal details.
- 📸 **Image upload:** Functionality to upload images (stored in `/models/images/`).
- 🌍 **API endpoints for CRUD operations:** Robust RESTful API for Create, Read, Update, and Delete operations.

---

## 🛠️ Getting Started

Follow these steps to get Reflect Reads up and running on your local machine.

### 🐍 Step 1: Clone the repository

Begin by cloning the project repository from GitHub:

```bash
git clone https://github.com/your-username/reflect-reads.git
cd "Reflect Reads (Full Stack)"
```

### 💾 Step 2: Install Dependencies

Install dependencies for both the backend and frontend.

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### ⚙️ Step 3: Environment Variables

Create a `.env` file in your `/backend/` directory and add the following environment variables. Replace the placeholder values with your actual credentials.

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### ▶️ Step 4: Run the Project

Start both the backend server and the frontend development server.

#### Start Backend Server

```bash
cd backend
npm start
```

#### Start Frontend (in new terminal)

```bash
cd frontend
npm run dev
```

Once both servers are running, visit [http://localhost:5173](http://localhost:5173) in your web browser to see the Reflect Reads frontend UI.

---

## 🧾 License

This project is licensed under the MIT License.
