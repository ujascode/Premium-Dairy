# Dairy Sales Management System

A modern, full-stack Dairy Sales Management System built with **Next.js 16**, **MongoDB Atlas**, and **JWT Authentication**. This application helps dairy businesses manage products, sales, reports, and daily operations through a secure and responsive dashboard.

---

## Overview

The Dairy Sales Management System is designed to simplify dairy business operations by providing an intuitive interface for managing products, tracking sales, and generating reports. The application follows modern development practices with secure authentication, scalable architecture, and a responsive user interface.

---

## Features

### Authentication
- Secure JWT-based authentication
- HttpOnly cookie authentication
- Protected routes using Next.js Proxy (Middleware)
- Automatic session validation
- Secure logout functionality
- Role-based authorization (Admin)

### Dashboard
- Business overview
- Sales statistics
- Revenue summary
- Recent sales
- Interactive sales charts

### Product Management
- Add new products
- Edit products
- Delete products
- Product inventory
- Product pricing

### Sales Management
- Create sales
- View sales history
- Update sales records
- Delete sales
- Daily sales tracking

### Reports
- Sales reports
- Revenue analysis
- Product performance
- Dashboard analytics

### Security
- JWT Authentication
- Password hashing using bcryptjs
- HttpOnly Cookies
- Secure Cookies (Production)
- SameSite Cookie Protection
- Protected API Routes
- Input Validation

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- JavaScript
- Tailwind CSS

### Backend
- Next.js App Router
- Route Handlers
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcryptjs
- HttpOnly Cookies

### Deployment
- Vercel
- MongoDB Atlas

---

## Project Structure

```
dairy-sales-management/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── products/
│   │   └── page.jsx
│   │
│   ├── components/
│   ├── lib/
│   ├── models/
│   ├── utils/
│   ├── styles/
│   └── middleware.js (Proxy)
│
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/YOUR_USERNAME/dairy-sales-management.git
```

Go to the project directory.

```bash
cd dairy-sales-management
```

Install dependencies.

```bash
npm install
```

Create a `.env.local` file.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start the development server.

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Production Build

Build the project.

```bash
npm run build
```

Run the production server.

```bash
npm start
```

---

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the production application.

```bash
npm run start
```

Runs the production server.

```bash
npm run lint
```

Runs ESLint.

---

## Environment Variables

Create a `.env.local` file.

```env
MONGODB_URI=

JWT_SECRET=
```

---

## Authentication Flow

```
User Login
      │
      ▼
Verify Credentials
      │
      ▼
Generate JWT
      │
      ▼
Store JWT in HttpOnly Cookie
      │
      ▼
Proxy (Middleware) Validation
      │
      ▼
Protected Dashboard
```

---

## Security Features

- JWT Authentication
- Password Hashing (bcryptjs)
- HttpOnly Cookies
- Secure Cookies
- SameSite Cookie Protection
- Protected Routes
- Protected API Endpoints
- JWT Expiration
- Role-Based Authorization
- Input Validation

---

## API Endpoints

### Authentication

```
POST /api/auth
POST /api/auth/logout
```

### Dashboard

```
GET /api/dashboard
GET /api/dashboard/sales-chart
```

### Products

```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Sales

```
GET    /api/sales
POST   /api/sales
PUT    /api/sales/:id
DELETE /api/sales/:id
```

### Reports

```
GET /api/reports
```

---

## Deployment

This project is deployed using:

- Vercel
- MongoDB Atlas

To deploy:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy the project.

---

## Future Improvements

- Customer Management
- Inventory Management
- Supplier Management
- Invoice Generation
- PDF Reports
- Email Notifications
- Barcode Scanner
- Multi-user Support
- Analytics Dashboard
- Export Reports (Excel/PDF)

---

## Author

**Ujas Shekhat**

- Full Stack Web Developer
- GitHub: https://github.com/ujascode
- LinkedIn: https://www.linkedin.com/in/ujas-shekhat-832192295?utm_source=share_via&utm_content=profile&utm_medium=member_android

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Next.js
- React
- MongoDB Atlas
- Tailwind CSS
- Vercel
- JSON Web Token
- bcryptjs