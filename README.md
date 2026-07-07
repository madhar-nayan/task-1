# Website Technology — Task 1: Basic React App + API

A full-stack MERN application built for the Website Technology internship. It includes a React frontend with a Card component, an Express REST API with full CRUD for Products, and MongoDB via Mongoose.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React (create-react-app structure)  |
| Backend  | Express.js                          |
| Database | MongoDB + Mongoose                  |
| API      | RESTful CRUD (`/api/products`)      |

## Project Structure

```
task-1/
├── backend/
│   ├── models/Product.js       # Mongoose schema
│   ├── routes/productRoutes.js # CRUD routes
│   ├── server.js               # Express entry point
│   ├── seed.js                 # Sample product data
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.js         # Reusable card (uses props)
│   │   │   ├── ProductList.js  # Renders cards from API data
│   │   │   ├── Header.js       # Navigation header
│   │   │   └── AddProductForm.js
│   │   ├── App.js              # Main app + fetch() integration
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017`

## Getting Started

### 1. Start MongoDB

Make sure MongoDB is running on your machine. If you use MongoDB Compass or a local install, the default URI is:

```
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

## API Endpoints

| GET    | `/api/products`       | Get all products   |
| GET    | `/api/products/:id`   | Get one product    |
| POST   | `/api/products`       | Create a product   |
| PUT    | `/api/products/:id`   | Update a product   |
| DELETE | `/api/products/:id`   | Delete a product   |

### Example POST body

```json
{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 149.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "inStock": true
}
```

## Features Demonstrated

- **React components & props** — `Card` receives product data via props
- **State management** — `useState` and `useEffect` in `App.js`
- **Data fetching** — Native `fetch()` API to load products from backend
- **REST API** — Full CRUD on Products resource
- **MongoDB schema** — Product model with validation
- **Frontend ↔ Backend integration** — Live product catalog with add/delete

## Contact

**Website Technology**
- Website: [www.website.com](https://www.website.com)
- Email: hr@website.com
