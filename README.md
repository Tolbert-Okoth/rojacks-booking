# Rojacks Restaurant Booking System

Rojacks is a full-stack web application that allows customers to book a table at Rojacks Restaurant, located in Migori County, Sub Rongo. It features a responsive, customer-facing booking form, a public menu page, and a secure, private admin dashboard for managing all bookings and menu items.

### ✨ [Live Demo Link](https://your-netlify-site.netlify.app/)
*(Replace this with your live Netlify URL)*

---

## 📸 Screenshots
*(It's highly recommended to add a screenshot of your app's homepage here)*

`![Rojacks Homepage](./path/to/screenshot.png)`

---

## 🌟 Core Features

### 🤵 Customer Features
* **View Restaurant Info:** See the restaurant's location, description, and contact info.
* **Browse Menu:** A full, public menu page with items, descriptions, prices, and images.
* **Book a Table:** An easy-to-use form to book a table.
    * Validates time (9 AM - 10 PM) and prevents booking in the past.
* **Instant Confirmation:** Receive an on-screen success message.
* **Email Confirmation:** Receive an email confirmation (via Nodemailer) with all booking details.

### 🔐 Admin-Only Features
* **Secure Authentication:** Admin-only login protected by JWT (JSON Web Tokens).
* **Booking Dashboard:**
    * View all customer bookings in a clean table.
    * Filter bookings by "All," "Today's," "Pending," and "Confirmed."
    * Confirm a "Pending" booking.
    * Delete any booking.
* **Menu Management:**
    * Full CRUD (Create, Read, Delete) for menu items.
    * Upload menu item images directly to the server.

---

## 💻 Tech Stack

This project is a full-stack monorepo, with separate `backend` and `frontend` folders.

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router |
| **State Management** | Redux Toolkit (RTK Query) |
| **Styling** | Bootstrap 5, React-Bootstrap, Bootswatch |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL, Sequelize (ORM) |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Image Uploads** | Multer |
| **Email Notifications**| Nodemailer (with Gmail/App Passwords) |
| **Deployment** | **FE:** Netlify, **BE:** Render, **DB:** Neon |

---

## 🚀 Getting Started (Local Setup)

To run this project on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/rojacks-booking.git](https://github.com/your-username/rojacks-booking.git)
cd rojacks-booking
