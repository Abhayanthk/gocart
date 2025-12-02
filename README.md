# 🛒 GoCart — Multi-Vendor Full Stack E-Commerce App

**Hosted Frontend:** 🔗 [https://gocart-sage-nu.vercel.app/](https://gocart-sage-nu.vercel.app/)

---

## 🚀 Project Overview

**GoCart** is a scalable, full-stack **multi-vendor e-commerce platform** designed for seamless interactions between **Admins**, **Sellers**, and **Customers**.  
It supports **AI-generated product content**, **real-time order management**,  and **Stripe-powered payments** — all built with modern web technologies.

---

## 🎯 Project Goals

- Build and deploy a **multi-role e-commerce system** with Admin, Seller, and Customer functionalities.  
- Integrate **AI content generation** for product listings.  
- Implement **real-time, production-ready features** like order tracking, coupon expiry jobs, and premium subscriptions.  
- Achieve **modern UX/UI** and **optimized performance** through Next.js and Tailwind CSS.

---

## 🧠 System Architecture & Tech Stack

| Layer | Tech / Tool | Purpose |
|-------|--------------|----------|
| **Frontend** | Next.js, Tailwind CSS | UI & Routing |
| **Backend** | Next.js API Routes / Node.js | Server-side logic |
| **Database** | Neon (PostgreSQL) | Persistent data storage |
| **ORM** | Prisma | Schema & DB management |
| **Auth & Billing** | JWT, Stripe | Authentication & Payments |
| **Scheduler** | Ingest Webhook | Coupon expiry & background jobs |
| **Image Storage** | ImageKit | Store & product image management |
| **AI Integration** | Google Gemini API | Auto-generate product names & descriptions |
| **Hosting** | Vercel | Frontend & API Deployment |

---

## 💡 Key Features

### 🛍️ Customer
- Browse products with **search & navigation**  
- Login/Signup with **Google OAuth**  
- Manage **Cart & Checkout** (Cash on Delivery + Stripe)  
- Save **Addresses & Coupons**  
- Access **Plus Membership** (free trial + perks)  
- View **Order History, Ratings & Reviews**

### 🧑‍💼 Seller
- **Create Store** (admin approval required)  
- Access **Seller Dashboard** (earnings, reviews, products)  
- Perform **Product CRUD** operations  
- Use **AI-powered product upload** for name/description generation  
- Manage **Orders & Stock**

### 🛠️ Admin
- Central **Admin Dashboard** with platform analytics  
- **Store Approval & Status Control**  
- **Coupon Management (CRUD)** + automated expiry  
- Full **Platform-wide Management**

---

## ⚙️ API Endpoints (Highlights)

| Endpoint | Method | Description | Access |
|-----------|---------|-------------|---------|
| `/api/store/create` | POST / GET | Create or check store status | Seller |
| `/api/store/product` | POST / GET | Add or fetch products | Seller |
| `/api/admin/approveStore` | POST / GET | Approve or reject store requests | Admin |
| `/api/admin/coupon` | CRUD | Manage coupons | Admin |
| `/api/coupon` | POST | Verify coupon | Public/Auth |
| `/api/cart` | POST / GET | Save or fetch cart items | Customer |
| `/api/orders` | POST / GET | Place or retrieve orders | Customer |
| `/api/rating` | POST / GET | Submit or view product reviews | Customer |
| `/api/stripe` | POST | Handle Stripe payment webhooks | Stripe |

---

## 🧩 Highlights

- **AI-assisted content creation** via Google Gemini API  
- **Automated coupon expiry system**  
- **Full Stripe integration** (payment + webhook)  
- **Secure JWT authentication**  
- **Modular, scalable architecture** for real-world deployments  

---

## 🧱 Deployment

- Frontend & API: **Vercel**  
- Database: **Neon PostgreSQL**  
- Image Management: **ImageKit**  
- Payments: **Stripe**  
- AI Services: **Google Gemini API**

---

## 👥 Roles & Permissions Summary

| Role | Access Level |
|------|---------------|
| **Admin** | Manage platform, approve stores, control coupons |
| **Seller** | Manage store, products, and orders |
| **Customer** | Browse, purchase, and review products |

---

## 🌐 Live Demo

👉 [GoCart — Hosted on Vercel](https://gocart-sage-nu.vercel.app/)

---

## 📄 License

This project is intended for **educational and demonstration purposes**.

---

## 💬 Contact & Contribution

Contributions, suggestions, and collaborations are welcome!  
If you'd like to contribute or report an issue, feel free to open a **pull request** or **GitHub issue**.
