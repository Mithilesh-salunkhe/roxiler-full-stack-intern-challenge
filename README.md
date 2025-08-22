# Roxiler Full-Stack Intern Coding Challenge

## Project Description

**🌟 This is a full-stack web application designed for a store rating platform.**  
Users can register, log in, and submit ratings for stores. The platform supports three user roles—**Normal User, Store Owner, and System Administrator**—with secure role-based access control.

---

## Key Features

* 🧑 **User Roles:** Normal User, Store Owner, System Administrator  
* 🔒 **Authentication:** Secure signup and login using JWT  
* 🏪 **Store Management:** Admins can add stores; users can view them  
* ⭐ **Rating System:** Users can submit and modify ratings (1–5 stars)  
* 📊 **Dashboards:** Role-specific dashboards for different user experiences  
* 🔍 **Search:** Users can search for stores by name and address  

---

## Project Flow

![Project Flow](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125317.png)

### Normal User Flow
1. **Signup/Login:** Create a new account or log in  
2. **View Stores:** Access the user dashboard to see available stores  
3. **Search Stores:** Find stores by name or address  
4. **Submit Rating:** Rate stores using a star rating component  
5. **View Rating:** See your rating and overall average for the store  
6. **Modify Rating:** Update your previous rating  
7. **Logout:** Securely log out  

### Store Owner Flow
1. **Signup/Login:** Store owners create an account (or are created by admin)  
2. **Access Dashboard:** View store-specific dashboard  
3. **View Overall Rating:** Average rating of their store displayed prominently  
4. **View Ratings:** List of individual ratings with user info  
5. **Logout:** Secure logout  

### Admin Flow
1. **Signup/Login:** Admin logs in with credentials  
2. **Access Dashboard:** Admin dashboard overview  
3. **User Management:** View, create, delete users  
4. **Store Management:** Add new stores  
5. **View Metrics:** Number of users, stores, total ratings  
6. **Logout:** Secure logout  

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router DOM  
* **Backend:** Node.js, Express.js  
* **Database:** MongoDB  
* **Authentication:** JWT, bcryptjs  

---

## Screenshots

### Normal User Dashboard
![Normal User](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125722.png)

### Store Owner Dashboard
![Store Owner](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125816.png)

### Admin Dashboard
![Admin](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125518.png)
![Admin](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125537.png)
![Admin](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125557.png)
![Admin](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125625.png)
![Admin](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125643.png)

---

## 🛠️ Project Setup

### Backend Setup
1. Navigate to the backend folder  
2. Install dependencies  
3. Create a `.env` file with:
   - `MONGODB_PASSWORD=your_mongodb_password`  
   - `JWT_SECRET_KEY=your_secret_key`  
   - `PORT=5000`  
4. Start the backend server. API will run on `http://localhost:5000`  

### Frontend Setup
1. Navigate to the frontend folder  
2. Install dependencies  
3. Start the frontend server. It will run on `http://localhost:5173`  

---

## 📡 API Endpoints

### User

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/user/signup`            | Register a new user        |
| POST   | `/user/login`             | Log in and get JWT token   |
| PUT    | `/user/update-password`   | Update user's password     |

### Admin (Admin-only)

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/admin/add-user`         | Add a new user             |
| GET    | `/admin/users`            | List all users             |
| GET    | `/admin/dashboard`        | Dashboard metrics          |
| POST   | `/admin/add-store`        | Add a new store            |
| GET    | `/admin/stores`           | List all stores            |

### Stores

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| GET    | `/stores`                 | List all stores (public)   |

### Ratings

| Method | Endpoint                              | Description                          |
|--------|---------------------------------------|--------------------------------------|
| POST   | `/ratings/submit`                     | Submit a rating for a store          |
| PUT    | `/ratings/store/:storeId/modify`      | Update an existing rating            |
| GET    | `/ratings/store/:storeId`             | Get all ratings for a store (owner)  |
| GET    | `/ratings/store/:storeId/average`     | Get average rating for a store       |

---

## 🙏 Acknowledgements

Thank you for reviewing my project! Your feedback is appreciated.
