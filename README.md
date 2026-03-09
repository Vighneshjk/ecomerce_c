# Akila Eyewear - Running the Project

Follow these steps to run the complete e-commerce application.

## Prerequisites
- **Python 3.10+**
- **Node.js 20+** and **npm**

---

## 1. Backend Setup (Django + DRF)

In the root directory of the project:

### Windows:
```bash
# Activate virtual environment
.\venv\Scripts\activate

# Run the server
python manage.py runserver
```

### Linux/Mac:
```bash
# Activate virtual environment
source venv/bin/activate

# Run the server
python manage.py runserver
```

The backend API will be available at: `http://127.0.0.1:8000/`

---

## 2. Frontend Setup (Angular)

Open a **NEW** terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run start
```

The frontend application will be available at: **`http://localhost:4200`**

---

## Integration Notes
- The Angular app is configured with a **proxy** (`proxy.conf.json`) to automatically route any `/api` or `/media` requests to the Django backend.
- Ensure the backend is running first so the frontend can fetch products and categories on load.
- If you need to populate the database with sample glasses data again, run:
  ```bash
  python populate.py
  ```

## Features
- **3D Virtual Try-On**: Click on any product and hit the "Virtual Try-On" button.
- **Dynamic Scrolling**: Infinite scroll is implemented on the product list.
- **Mobile Friendly**: Styled with TailwindCSS for all screen sizes.
