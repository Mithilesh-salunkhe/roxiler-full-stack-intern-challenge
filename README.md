# Roxiler Full-Stack Intern Coding Challenge

## Project Description

_[**This is a full-stack web application designed for a store rating platform. The application enables users to register, log in, and submit ratings for various stores. It features three distinct user roles—Normal User, Store Owner, and System Administrator—each with a secure, role-based access control system.]_

## Key Features

* **User Roles:** Normal User, Store Owner, System Administrator with distinct functionalities.
* **Authentication:** Secure signup and login using JWT.
* **Store Management:** Admins can add stores; users can view them.
* **Rating System:** Logged-in users can submit and modify ratings (1-5 stars).
* **Dashboards:** Role-specific dashboards for different user experiences.
* **Search:** Users can search for stores by name and address.

## Project Flow

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125317.png)

### Normal User Flow
1.  **Signup/Login:** User can create a new account or log in with existing credentials.
2.  **View Stores:** Upon successful login, the user is redirected to the normal user dashboard, where they can see a list of available stores.
3.  **Search Stores:** Users can use the search bar to find specific stores by name or address.
4.  **View Store Details:** (If applicable, mention if users can see more details about a store).
5.  **Submit Rating:** For each store, a logged-in normal user can submit a rating using the star rating component.
6.  **View Rating:** After submitting a rating, the user can see their own rating and the overall average rating for the store.
7.  **Modify Rating:** Users can update their previously submitted rating for a store.
8.  **Logout:** Users can securely log out of their session.

### Store Owner Flow
1.  **Signup/Login:** Store owners can create an account (or are created by an admin) and log in.
2.  **Access Dashboard:** After login, they are redirected to the store owner dashboard.
3.  **View Overall Rating:** The dashboard displays the average rating for their owned store prominently.
4.  **View Ratings:** Store owners can see a list of individual ratings submitted by users for their store, including the user's information (name, email) and the rating given.
5.  **Logout:** Store owners can securely log out.

### Admin Flow
1.  **Signup/Login:** Administrators can log in with their credentials.
2.  **Access Dashboard:** Upon login, they are directed to the admin dashboard.
3.  **User Management:** (Mention features like viewing, creating, deleting users).
4.  **Store Management:** Admins can add new stores to the platform.
5.  **View Metrics:** The admin dashboard provides an overview of key application metrics (e.g., number of users, stores, total ratings).
6.  **Logout:** Admins can securely log out.

## Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JSON Web Tokens (JWT), bcryptjs

## Screenshots

_[**Include relevant screenshots of your application to visually demonstrate its features and user interface.**]_

### Normal User Dashboard

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125722.png)

### Store Owner Dashboard
![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125816.png)


### Admin Dashboard (Optional, if you want to highlight it)
![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125518.png)

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125537.png)

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125557.png)

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125625.png)

![Alt Text](https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/raw/main/frontend/src/assets/Screenshot%202025-08-22%20125643.png)



## GitHub Repository Links

* **Frontend:** https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/tree/main/frontend
* **Backend:** https://github.com/Mithilesh-salunkhe/roxiler-full-stack-intern-challenge/tree/main/backend


**Thank you for reviewing my project!**
