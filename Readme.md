# 🚀 DevDock

**DevDock** is a SaaS platform where developers can showcase their projects, receive feedback, and build a professional portfolio.

It allows users to upload projects, share demos, and engage with the community through likes, ratings, and comments — all in a clean, minimal interface.

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- Secure password hashing
- Protected routes
- Role-based access (User / Admin)

### 📦 Project Management
- Create, edit, and delete projects
- Upload project images/screenshots
- Add GitHub repository & live demo links
- Tag projects with tech stack

### ❤️ Engagement System
- Like / Unlike projects
- 5-star rating system
- Comment system for feedback

### 🔍 Discovery
- Search projects
- Filter by tech stack
- Sort by trending / newest / top-rated

### 📊 User Dashboard
- View all uploaded projects
- Track likes and ratings
- Manage profile

### 🛡️ Admin Panel
- Manage users
- Approve/delete projects
- Moderate comments
- Maintain platform quality

### ☁️ File Upload
- Image upload using Multer
- Preview before upload
- Secure storage handling

---

## 🧠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Other Tools
- Multer
- JWT
- bcrypt

---

## ⚙️ Installation

### Clone the repository
git clone https://github.com/your-username/devdock.git
cd devdock

### Install dependencies
cd server && npm install
cd ../client && npm install

### Setup Environment Variables (.env in server)
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

### Run the application
cd server && npm run dev
cd ../client && npm run dev

---

## 🚀 Future Improvements
- Notifications system
- Bookmark projects
- Follow developers
- AI project feedback
- Advanced analytics
- GitHub integration

---

## 📄 License
MIT License
