# **API Testing Document**

## **Project: Mini Query Simulator Backend**
**Version:** 1.0  
**Testing Date:** [2025-03-29]  
**Tester:** Ayush Patel 

---
## **1. API Endpoints Overview**

| Method | Endpoint      | Description |
|--------|--------------|-------------|
| POST   | `/query`     | Converts a natural language query to SQL |
| GET    | `/explain`   | Returns a simulated explanation of the SQL query |
| POST   | `/validate`  | Checks if the SQL query is valid |

---
## **2. Testing Environment**
- **Base URL:** `http://127.0.0.1:8000`
- **Tools Used:** Postman, cURL, Python Requests, FastAPI Test Client
- **Authentication:** Basic Authentication (if applicable)

---
## **3. API Test Cases**

### **3.1 POST /query**
**✅ Test Case 1: Valid Query**
- **Request:**
  ```json
  {
      "nl_query": "Show me all orders above $1000"
  }
  ```
- **Expected Response:**
  ```json
  {
      "nl_query": "Show me all orders above $1000",
      "translated_sql": "SELECT * FROM orders WHERE amount > 1000;"
  }
  ```

**❌ Test Case 2: Missing `nl_query` Field**
- **Request:**
  ```json
  {}
  ```
- **Expected Response:**
  ```json
  {
      "detail": [
          {
              "type": "missing",
              "loc": ["query", "nl_query"],
              "msg": "Field required",
              "input": null
          }
      ]
  }
  ```

### **3.2 GET /explain**
**✅ Test Case 3: Valid Query Parameter**
- **Request:**
  ```
  GET /explain?nl_query=Show me all customers in New York
  ```
- **Expected Response:**
  ```json
  {
      "nl_query": "Show me all customers in New York",
      "explanation": "SELECT * FROM customers WHERE city = 'New York';"
  }
  ```

**❌ Test Case 4: Missing Query Parameter**
- **Request:**
  ```
  GET /explain
  ```
- **Expected Response:**
  ```json
  {
      "detail": "Missing required parameter: nl_query"
  }
  ```

### **3.3 POST /validate**
**✅ Test Case 5: Valid Query**
- **Request:**
  ```json
  {
      "nl_query": "Get all products in stock"
  }
  ```
- **Expected Response:**
  ```json
  {
      "nl_query": "Get all products in stock",
      "valid": true
  }
  ```

**❌ Test Case 6: Invalid Query**
- **Request:**
  ```json
  {
      "nl_query": "Find the things with something"
  }
  ```
- **Expected Response:**
  ```json
  {
      "nl_query": "Find the things with something",
      "valid": false
  }
  ```

---
## **4. Testing with Postman**
1. **Open Postman**
2. **Set Base URL:** `http://127.0.0.1:8000`
3. **Create Requests:**
   - `POST /query`
   - `GET /explain?nl_query=Your Query`
   - `POST /validate`
4. **Send Requests and Verify Responses**

---
## **5. Testing with cURL**

### **Test /query Endpoint**
```sh
curl -X POST "http://127.0.0.1:8000/query" \
     -H "Content-Type: application/json" \
     -d '{"nl_query": "Show me all orders above $1000"}'
```

### **Test /explain Endpoint**
```sh
curl -X GET "http://127.0.0.1:8000/explain?nl_query=Show%20all%20orders%20above%201000"
```

### **Test /validate Endpoint**
```sh
curl -X POST "http://127.0.0.1:8000/validate" \
     -H "Content-Type: application/json" \
     -d '{"nl_query": "Get all products in stock"}'
```

---
## **6. Conclusion**
This document provides a structured way to test the Mini Query Simulator API using Postman and cURL. If any test fails, debug the FastAPI backend and ensure all dependencies are installed (`pip install -r requirements.txt`).

