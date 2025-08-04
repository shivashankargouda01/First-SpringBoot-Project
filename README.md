
```markdown
# Skill Swap Platform

Welcome to **Skill Swap**, a full-stack web application designed to facilitate peer-to-peer skill exchange! Users can register, showcase skills they can teach or want to learn, search for matching partners, send swap requests, schedule exchanges, and track their progress effortlessly.

---

## 🚀 Project Overview

Skill Swap aims to create a vibrant community where learning and teaching skills is easy, interactive, and rewarding.

- **User Registration & Authentication:** Secure sign up and login flow with hashed passwords.
- **Profile & Skill Management:** Add/edit/delete skills categorized by "Can Teach" or "Want to Learn".
- **Skill Search & Matching:** Find users matching your skill interests.
- **Swap Requests & Scheduling:** Exchange swap proposals, schedule sessions, accept/reject requests.
- **Responsive Modern UI:** Built with React and styled with TailwindCSS.
- **Robust Backend:** Spring Boot REST API with JPA and MySQL database.

---

## 📂 Project Structure

```
skill-swap/
  ├── backend/                # Spring Boot backend API
  ├── frontend/               # React frontend application
  ├── .gitignore              # Ignored files for Git
  └── README.md               # This documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, React Router, Axios
- **Backend:** Java, Spring Boot, Spring Security, JPA/Hibernate
- **Database:** MySQL
- **Build & Package:** Maven, npm/yarn
- **Other:** Lombok, BCrypt Password Encoder

---

## 🎯 Features

- User registration/login with authentication
- Profile and skill CRUD operations
- Intelligent skill-based user search
- Sending and managing skill swap requests
- Scheduling virtual skill exchange sessions
- Swap request tracking and status updates
- Responsive and clean UI with TailwindCSS

---

## ⚙️ Getting Started

### Backend Setup

1. Navigate to backend folder:

```
cd skill-swap/backend
```

2. Build and run the backend:

```
mvn clean package
java -jar target/skill-swap-backend-0.0.1-SNAPSHOT.jar
```

3. Ensure MySQL is running and configured in `application.properties`.

Backend runs on `http://localhost:9091`.

---

### Frontend Setup

1. Navigate to frontend folder:

```
cd skill-swap/frontend
```

2. Install dependencies and run:

```
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

---

## 🔌 API Endpoints (Sample)

- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user
- `GET /api/users`: Get all users
- `GET /api/skills/user/{userId}`: Get skills for user
- `POST /api/swaps/request`: Send skill swap request
- `GET /api/swaps/pending/{userId}`: Get pending incoming requests

---

## 📷 Screenshots

(Include screenshots of login, registration, dashboard, search, and profile pages)
<img width="1366" height="768" alt="Screenshot (380)" src="https://github.com/user-attachments/assets/2ce3e326-2641-47f1-9498-2a315d059351" />
<img width="1366" height="768" alt="Screenshot (381)" src="https://github.com/user-attachments/assets/28624538-0713-483c-bdd0-39a67ee96c29" />
<img width="1366" height="768" alt="Screenshot (382)" src="https://github.com/user-attachments/assets/d232df4f-dc48-4e43-a361-a1e32fa6d11e" />
<img width="1366" height="768" alt="Screenshot (383)" src="https://github.com/user-attachments/assets/7ff1f709-45cc-4e61-89c3-5746afaba188" />
<img width="1366" height="768" alt="Screenshot (386)" src="https://github.com/user-attachments/assets/d97a0cf6-2c39-47ec-92b5-c1c53a8416dc" />
<img width="1366" height="768" alt="Screenshot (390)" src="https://github.com/user-attachments/assets/3de81ce0-85c2-4a89-838f-9001baa44c94" />
<img width="1366" height="768" alt="Screenshot (392)" src="https://github.com/user-attachments/assets/78392abb-b0de-4fc6-bba6-c9a37e7656fa" />

---

Happy skill swapping! 🎉
```

