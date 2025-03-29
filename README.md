# Mini Query Simulator - Backend (Node.js)

This is the backend for the **Mini Query Simulator**, a Natural Language to SQL query converter.

## Features
- **Natural Language Processing (NLP) to SQL Translation**
- **Query Explanation**
- **Validation & Authentication**

## Tech Stack
- **Node.js** (Express.js)
- **MongoDB** (Mock Database, can be replaced with a real DB)
- **JWT Authentication**
- **Postman** (For API Testing)

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/mini-query-simulator.git
cd mini-query-simulator/backend-node
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create a `.env` File
```plaintext
PORT=5000
JWT_SECRET=your_secret_key
```

### 4. Start the Server
```sh
npm start
```
Server will run at `http://localhost:5000`

---

## API Documentation

### **1. Translate Natural Language Query**
**Endpoint:** `/query`  
**Method:** `POST`

**Request Body:**
```json
{
  "nl_query": "Show me all orders above $1000"
}
```

**Response:**
```json
{
  "natural_query": "Show me all orders above $1000",
  "translated_sql": "SELECT * FROM orders WHERE amount > 1000;"
}
```

---

### **2. Explain Query**
**Endpoint:** `/explain`  
**Method:** `POST`

**Request Body:**
```json
{
  "nl_query": "List all users who joined after 2023"
}
```

**Response:**
```json
{
  "natural_query": "List all users who joined after 2023",
  "translated_sql": "SELECT * FROM users WHERE joined_date > '2023-01-01';",
  "explanation": "This query retrieves all users who registered after January 1st, 2023."
}
```

---

### **3. Validate Query Feasibility**
**Endpoint:** `/validate`  
**Method:** `POST`

**Request Body:**
```json
{
  "nl_query": "Find customers who spent more than $5000 last year"
}
```

**Response:**
```json
{
  "valid": true,
  "message": "The query is feasible within the database."
}
```

---

## Authentication

All requests require an **API Key** in the `Authorization` header:
```sh
Authorization: Bearer YOUR_API_KEY
```

If an invalid API Key is provided, the response will be:
```json
{
  "error": "Invalid API Key"
}
```

---

## Testing with Postman

1. Import the provided **Postman Collection** (`postman_collection.json`).
2. Set the API Key in the Authorization header.
3. Run the requests and verify responses.

Alternatively, you can use **cURL**:
```sh
curl -X POST "http://localhost:5000/query" -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"nl_query": "Show all customers"}'
```

---

## Future Enhancements
- Improve NLP accuracy with AI/ML models.
- Support additional SQL databases.
- Implement role-based authentication.

---

## License
MIT License. Feel free to modify and use this project!

---

## Contributors
- **Ayush Patele** (@patelayush9876)

---

