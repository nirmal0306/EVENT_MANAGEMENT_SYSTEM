# 🎉 Event Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to register, login, book events, and view bookings. Admins can create, edit, and delete events, and manage all bookings.

---

## 🚀 Features

### 👥 User
- Register/Login functionality
- Browse available events
- Book events (with prevention of duplicate bookings)
- Cancel booked events
- View booking history

### 🔐 Admin
- Secure admin login
- Create, edit, and delete events
- View all bookings
- Download reports (CSV format)

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React    | Express | MongoDB  |
| Axios    | Node.js | Mongoose |

---

## 📁 Folder Structure

# EVENT_MANAGEMENT_SYSTEM/ 

├── client/ 

# React frontend │ 

├── src/

│ ├── public/

│ └── package.json 

├── server/ 

# Node/Express backend │

├── models/

│ ├── routes/

│ ├── controllers/ 

│ └── server.js 

├── .gitignore 

└── README.md


---

## ⚙️ Setup Instructions

# 1. Clone the repository

```bash
git clone https://github.com/nirmal0306/EVENT_MANAGEMENT_SYSTEM.git
cd EVENT_MANAGEMENT_SYSTEM

# 2. Install dependencies

Client

cd client

npm install

Server

cd ../server

npm install

# 3. Setup .env file in /server

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

# 4. Run the application
# Start backend

cd server

npm start

# In another terminal, start frontend

cd client

npm start
