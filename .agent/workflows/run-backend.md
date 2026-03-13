---
description: How to run the Akela Django Backend
---

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```bash
   python manage.py makemigrations api
   python manage.py migrate
   ```

6. Create a superuser (for admin access):
   ```bash
   python manage.py createsuperuser
   ```

7. Start the server:
   ```bash
   python manage.py runserver
   ```

// turbo
8. The backend will be available at `http://127.0.0.1:8000/`.
   - Admin panel: `http://127.0.0.1:8000/admin/`
   - API browser: `http://127.0.0.1:8000/api/`
