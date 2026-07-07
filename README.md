# Website Technology — Task 1: Full-Stack MERN Product Catalog with Authentication

A full-stack MERN application with user authentication, product ownership tracking, and advanced product management features. Built for the Website Technology internship.

## Key Features

✅ **User Authentication** — Secure register/login with bcrypt password hashing  
✅ **Product Ownership** — Only product creators can delete or modify their listings  
✅ **Stock Management** — Toggle in-stock/out-of-stock status for owned products  
✅ **Photo Upload** — Upload product images as base64 with live preview  
✅ **Category Filtering** — Dynamic dropdown to filter products by category  
✅ **Order System** — Non-owners can order products from catalog  
✅ **MongoDB Persistence** — User credentials and product data saved securely

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React with Hooks + CSS               |
| Backend  | Express.js with CORS & middleware   |
| Database | MongoDB + Mongoose ORM              |
| Auth     | bcryptjs for password hashing       |
| API      | RESTful with Bearer + header auth   |

## Project Structure

```
task-1/
├── backend/
│   ├── models/
│   │   ├── User.js             # User schema with hashed passwords
│   │   └── Product.js          # Product schema with owner field
│   ├── routes/
│   │   ├── authRoutes.js       # POST /register, /login
│   │   └── productRoutes.js    # CRUD with auth headers
│   ├── server.js               # Express setup (10mb body limit)
│   ├── seed.js                 # Sample product data
│   ├── .env                    # PORT=5002, MONGODB_URI
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.js      # Login/Register toggle UI
│   │   │   ├── Header.js         # User display + Logout
│   │   │   ├── AddProductForm.js # Form + photo upload + preview
│   │   │   ├── ProductList.js    # List with category filter
│   │   │   └── Card.js           # Product card with owner controls
│   │   ├── App.js                # Auth state + API orchestration
│   │   ├── App.css               # Login/filter styles
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally: `mongodb://127.0.0.1:27017/website_products`
- **npm** or yarn

## Getting Started

### 1. Start MongoDB

```bash
# Default local URI
mongodb://127.0.0.1:27017/website_products
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run seed    # Load sample products (optional)
npm start       # Runs on http://localhost:5002
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start       # Runs on http://localhost:3000
```

## Authentication Flow

### Register a New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}

Response: { "success": true, "data": { "username": "johndoe" } }
```

### Login Existing User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}

Response: { "success": true, "data": { "username": "johndoe" } }
```

After login, the username is stored in frontend state and sent in all product requests.

## API Endpoints

### Public (No Auth Required)
| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| GET    | `/api/products`        | Get all products           |
| GET    | `/api/products/:id`    | Get single product         |

### Protected (x-user Header Required)
| Method | Endpoint               | Description                | Auth Check      |
|--------|------------------------|----------------------------|-----------------|
| POST   | `/api/products`        | Create new product         | Login required  |
| PUT    | `/api/products/:id`    | Update product stock       | Must be owner   |
| DELETE | `/api/products/:id`    | Delete product             | Must be owner   |
| POST   | `/api/auth/register`   | Register new account       | None            |
| POST   | `/api/auth/login`      | Login to account           | None            |

### Example: Create Product
```bash
POST /api/products
Content-Type: application/json
x-user: johndoe

{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 149.99,
  "category": "Electronics",
  "image": "data:image/png;base64,...",
  "inStock": true
}

Response: 
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "owner": "johndoe",
    "inStock": true,
    ...
  }
}
```

### Example: Toggle Stock (Owner Only)
```bash
PUT /api/products/:id
Content-Type: application/json
x-user: johndoe

{
  "inStock": false
}

Response: { "success": true, "data": { ...updated product } }
```

### Example: Delete Product (Owner Only)
```bash
DELETE /api/products/:id
x-user: johndoe

Response: { "success": true, "message": "Product deleted successfully" }
```

## Frontend Features

### Login & Registration
- Toggle between login and register modes
- Credentials validated against MongoDB
- Passwords hashed with bcryptjs before storage

### Product Management (Owners Only)
- **Add Product** — Upload photo or use image URL
- **Toggle Stock** — Mark in-stock/out-of-stock
- **Delete** — Remove owned products from catalog
- Photo preview displays before submission

### Product Browsing (All Users)
- **Category Filter** — Dynamic dropdown built from product data
- **Order Button** — Any user can order from the catalog
- **View Details** — See owner name and all product info

### Error Handling
- Login validation with server-side credential checking
- 404 for non-existent products
- 403 Forbidden when non-owners try to modify products
- 413 Payload Too Large handled (10mb limit)
- JSON parse errors display user-friendly messages

## Environment Variables

### `.env` (Backend)
```
PORT=5002
MONGODB_URI=mongodb://127.0.0.1:27017/website_products
```

### Frontend API URL
Frontend automatically points to `http://localhost:5002/api` unless overridden via `REACT_APP_API_URL`

## Technologies & Libraries

### Backend
- **express** (v4.21.2) — HTTP server framework
- **mongoose** (v8.9.3) — MongoDB ORM
- **bcryptjs** (v2.4.3) — Password hashing
- **cors** (v2.8.5) — Cross-origin requests
- **dotenv** (v16.4.7) — Environment variables

### Frontend
- **react** (v18.3.1) — UI library
- **react-dom** (v18.3.1) — DOM rendering

## Features Demonstrated

- ✅ **Authentication** — User registration, login, password hashing
- ✅ **Authorization** — Owner-based access control (delete/update)
- ✅ **State Management** — useState, useEffect, useCallback hooks
- ✅ **Data Persistence** — User credentials and product ownership in MongoDB
- ✅ **File Handling** — Base64 image upload and preview
- ✅ **Form Validation** — Client & server-side checks
- ✅ **API Integration** — Fetch with headers for auth
- ✅ **Dynamic UI** — Category filtering, conditional rendering
- ✅ **Error Handling** — JSON parse errors, 403/404 responses

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 5002
Get-NetTCPConnection -LocalPort 5002

# Kill the process (PowerShell)
Stop-Process -Id <PID>
```

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check connection URI in `.env` file
- Verify database exists or is creatable

### 404 on Auth Routes
- Restart backend: `npm start` in `/backend`
- Verify `authRoutes.js` is loaded
- Check that `/api/auth` is mounted in `server.js`

### 413 Payload Too Large
- Image files are converted to base64 (larger than binary)
- Backend supports up to 10mb by default
- Compress images before upload if needed

## Future Enhancements

- [ ] Email verification on registration
- [ ] JWT tokens for stateless auth
- [ ] Image optimization and CDN storage
- [ ] Product reviews and ratings
- [ ] Shopping cart system
- [ ] Order history tracking
- [ ] Admin dashboard

## Contact

**Website Technology**
- Website: [www.website.com](https://www.website.com)
- Email: hr@website.com
