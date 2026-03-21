# Akeela Eyewear — Full-Stack E-Commerce Platform

A premium eyewear e-commerce platform featuring a virtual try-on experience, 3D product visualization, AI-powered vision assistance, and a complete order & payment pipeline.

---

## ✨ Features

### 👤 Authentication & Users
- JWT-based authentication (login, register, logout)
- Protected routes for authenticated users
- User dashboard with profile management

### 🛍️ Products & Collections
- Curated eyewear collections with filtering and search
- Product detail pages with ratings and reviews
- Wishlist support

### 🕶️ Virtual Try-On
- Real-time webcam-based try-on using **MediaPipe Face Mesh**
- Accurate glasses overlay aligned to facial landmarks
- Powered by OpenCV on the backend (`tryon` app)

### 🧊 3D Product Viewer
- Interactive 3D eyewear rendering using **Three.js** (`@react-three/fiber` + `@react-three/drei`)
- Smooth orbit controls for a premium product exploration experience

### 🤖 Vision AI
- AI-assisted vision and lens recommendation page

### 🎨 Bespoke & Atelier Pages
- Custom bespoke eyewear configurator concept page
- Atelier craftmanship showcase page

### 🛒 Cart & Orders
- Full cart management with a slide-out modal
- Order placement and order history

### 💳 Payments
- **Razorpay** and **Stripe** payment gateway integration
- Secure payment flow with order status tracking

### 📦 Backend — Django REST API
- Built with **Django 4.2** + **Django REST Framework**
- JWT authentication via `djangorestframework-simplejwt`
- Apps: `users`, `products`, `orders`, `payments`, `reviews`, `wishlist`, `prescriptions`, `notifications`, `tryon`
- Auto-generated API docs with **drf-spectacular**
- Cloudinary integration for image storage
- Email notifications via **Resend**
- Async task queue with **Celery** + **Redis**

### 🛠️ Admin Panel
- Custom in-app admin dashboard for managing products, orders, and users

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Routing | React Router v7 |
| Animation | Motion (Framer Motion), Lenis smooth scroll |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Try-On | MediaPipe Face Mesh, OpenCV |
| Backend | Django 4.2, Django REST Framework |
| Auth | JWT (SimpleJWT) |
| Database | PostgreSQL (via `psycopg2`) / SQLite (dev) |
| Payments | Razorpay, Stripe |
| Storage | Cloudinary |
| Email | Resend |
| Task Queue | Celery + Redis |
| Deployment | Gunicorn, WhiteNoise, Railway |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Python** 3.10+
- **Redis** (for Celery tasks)

---

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment example and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd akela-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate   # Windows
   source venv/bin/activate  # macOS/Linux
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy and configure the environment file:
   ```bash
   cp .env.example .env
   ```
   Fill in your `SECRET_KEY`, `DATABASE_URL`, `CLOUDINARY_*`, `RAZORPAY_*`, `STRIPE_*`, and `RESEND_API_KEY`.

5. Apply migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Run the backend server:
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`.

---

## 📁 Project Structure

```
eye/
├── src/
│   ├── components/       # Layout, Cart Modal, VirtualTryOn, Eyewear3D
│   ├── contexts/         # AuthContext, CartContext, ProtectedRoute
│   ├── pages/            # Dashboard, Collections, Bespoke, VisionAI, Atelier, Login, Register, AdminPanel
│   ├── services/         # API service layer, Gemini service
│   └── types.ts
├── akela-backend/
│   ├── apps/
│   │   ├── users/        # Auth, user profiles
│   │   ├── products/     # Product catalog
│   │   ├── orders/       # Order management
│   │   ├── payments/     # Razorpay & Stripe
│   │   ├── reviews/      # Product reviews
│   │   ├── wishlist/     # User wishlist
│   │   ├── prescriptions/# Prescription management
│   │   ├── notifications/# Email/push notifications
│   │   └── tryon/        # Virtual try-on (OpenCV + MediaPipe)
│   ├── akela/            # Django project settings
│   └── manage.py
├── index.html
├── vite.config.ts
└── package.json
```

---

## 📄 License

This project is proprietary. All rights reserved.
