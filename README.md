# INNOBRAINS Frontend

This is the official **frontend** for [INNOBRAINS](https://innobrains.pk), a dynamic and fully customizable company website built using **React.js**.

## 🚀 Live Website
👉 [https://innobrains.pk](https://innobrains.pk)

## ✨ Features

- Fully dynamic content managed through an admin panel
- CRUD operations via forms
- Blog management with a rich text editor
- OTP system implemented with Nodemailer
- Admin-protected routes
- Modular and scalable component architecture
- Fully responsive across all devices
- Image uploads for Blogs, Services, Team, and Growth sections
- Environment variables secured (.env)

## 🛠️ Technologies Used

- **React.js** (Frontend Framework)
- **Axios** (API Integration)
- **React Router DOM** (Routing)
- **Tailwind CSS** (Styling)
- **Rich Text Editor** (Blogs)
- **Nodemailer** (Email OTP System)
- **JWT Authentication** (Admin Panel)
- **Protected Routes** (Security)

## 📂 Folder Structure

innobrains-frontend/ ├── public/ │ └── assets/ ├── src/ │ ├── assets/ │ ├── components/ │ │ ├── aboutus/ │ │ ├── adminpanel/ │ │ ├── blog/ │ │ ├── contact/ │ │ ├── images/ │ │ ├── ourservices/ │ │ ├── products/ │ │ ├── common/ │ ├── App.js │ ├── index.js │ ├── services/ │ ├── utils/ ├── .env (Hidden) ├── README.md ├── package.json


🧩 How to Run Locally
Clone the repository:


git clone https://github.com/yourusername/innobrains-frontend.git
Navigate to the project directory:

cd innobrains-frontend
Install all dependencies:


npm install
Create a .env file in the root and add your API URL:


REACT_APP_API_URL=https://api.innobrains.pk
Start the development server:


npm start
Open your browser and navigate to:


http://localhost:3000


📜 License
This project is not licensed. All rights reserved by INNOBRAINS.