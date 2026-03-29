
# **Vistagram** 

## Link to website - https://vistacom.netlify.app/
## Link to backend - https://github.com/Likhitha1424/vistagram-backend

Vistagram is a full-stack social media application where users can upload, view, and interact with posts. It features user authentication, a public feed, and the ability to upload images with captions.

---

## **Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Features**
- User authentication (signup, login, logout).
- Upload images with captions.
- View a public feed of posts.
- Like and share posts.
- Responsive design with Tailwind CSS.
- Backend API with secure JWT-based authentication.
- Database seeding for dummy data.

---

## **Tech Stack**
### **Frontend:**
- **Framework**: React (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### **Backend:**
- **Framework**: Express.js
- **Database**: MySQL
- **ORM/Query Builder**: `mysql2`
- **Authentication**: JWT
- **File Uploads**: Multer

### **Hosting:**
- **Frontend**: Netlify
- **Backend**: Railway
- **Database**: Railway (MySQL)

---

## **Folder Structure**
### **Frontend**
```
frontend/
├── public/
│   ├── _redirects
│   ├── img1.jfif
│   └── vistagram.png
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── app/
│   │   ├── hooks.js
│   │   └── store.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PostCard.jsx
│   │   └── UploadForm.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── posts/
│   │       └── postsSlice.js
│   ├── pages/
│   │   ├── Gallary.jsx
│   │   ├── PublicFeed.jsx
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       └── Signup.jsx
│   └── App.jsx
└── .env
```

### **Backend**
```
backend/
├── config/
│   └── multer.js
├── controllers/
│   ├── authController.js
│   └── postsController.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── uploads/
│   └── [uploaded files]
├── db.js
├── seed.js
├── app.js
├── server.js
└── .env
```

---

## **Installation**
Follow these steps to set up the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/Likhitha1424/Vistagram.git
cd Vistagram
```

### **2. Install Dependencies**
#### **Frontend:**
```bash
cd frontend
npm install
```

#### **Backend:**
```bash
cd backend
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in both the `frontend` and `backend` folders. Refer to the [Environment Variables](#environment-variables) section for details.

### **4. Start the Application**
#### **Frontend:**
```bash
npm run dev
```

#### **Backend:**
```bash
node server.js
```

---

## **Environment Variables**
### **Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

### **Backend (`backend/.env`):**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=vistagram
MYSQL_PORT=3306
JWT_SECRET=your_jwt_secret
```

---

## **Usage**
1. **Run the Backend**:
   - Start the backend server using `node server.js`.
   - Ensure the database is running and accessible.

2. **Run the Frontend**:
   - Start the frontend development server using `npm run dev`.

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`.

4. **Features**:
   - Sign up or log in to your account.
   - Upload images with captions.
   - View and interact with posts in the public feed.

---

## **API Endpoints**
### **Authentication**
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/api/auth/login` | Log in a user        |
| POST   | `/api/auth/signup`| Register a new user  |

### **Posts**
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | `/api/posts/all`      | Fetch all posts           |
| POST   | `/api/posts/create`   | Create a new post         |
| POST   | `/api/posts/:id/like` | Like/unlike a post        |



## **Contributing**
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the [MIT License](LICENSE).
