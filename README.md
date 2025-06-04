
# 🏫 School Management API Documentation

## 📘 Overview

This API allows users to manage school information. Users can add new schools to the database and retrieve a list of schools sorted by distance from a specified location.

---

## 🌐 Base URL

```
https://educase-assignment-2ijk.onrender.com
```

---

## 🔐 Authentication

No authentication is required currently.

---

## 📌 Endpoints

### ➕ Add a School

- **URL:** `/api/school/addSchool`
- **Method:** `POST`
- **Description:** Adds a new school to the database.

#### 📥 Request Body

```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.345678,
  "longitude": 98.765432
}
```

#### ✅ Success Response

- **Status Code:** `201 Created`

```json
{
  "statusCode": 201,
  "message": "School added successfully",
  "data": {
    "id": 1
  },
  "success": true
}
```

#### ❌ Error Responses

- **400 Bad Request**

```json
{
  "statusCode": 400,
  "message": "Validation error message"
}
```

- **409 Conflict**

```json
{
  "statusCode": 409,
  "message": "Failed to add school"
}
```

- **500 Internal Server Error**

```json
{
  "statusCode": 500,
  "message": "Server error message"
}
```

---

### 📍 List Schools

- **URL:** `/api/school/listSchools`
- **Method:** `GET`
- **Description:** Returns a list of schools sorted by proximity to the provided latitude and longitude.

#### 🧭 Query Parameters

- `latitude` (required): Latitude coordinate of the reference point.
- `longitude` (required): Longitude coordinate of the reference point.

#### 📤 Example Request

```
/api/school/listSchools?latitude=28.6139&longitude=77.2090
```

#### ✅ Success Response

- **Status Code:** `200 OK`

```json
{
  "statusCode": 200,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 28.5355,
      "longitude": 77.3910,
      "distance": 5.2
    }
  ],
  "success": true
}
```

#### ❌ Error Responses

- **400 Bad Request**

```json
{
  "statusCode": 400,
  "message": "Latitude and Longitude are required"
}
```

- **404 Not Found**

```json
{
  "statusCode": 404,
  "message": "No school found"
}
```

- **500 Internal Server Error**

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

---

## 🧮 Distance Calculation

- Method: Haversine Formula
- Output: Distance in kilometers
- Description: Calculates the great-circle distance between two geo-coordinates.

---

## 📦 Schema Models

### 🏫 School

| Field     | Type    | Description                        |
|-----------|---------|------------------------------------|
| id        | Integer | Auto-generated primary key         |
| name      | String  | Name of the school (4–100 chars)   |
| address   | String  | Physical address of the school     |
| latitude  | Number  | Latitude of the school             |
| longitude | Number  | Longitude of the school            |

---

## 🚀 Running the API

### ▶️ Development

```bash
npm run dev
```

### 🚢 Production

```bash
npm start
```

---

## 🧪 Testing Suggestions (Dummy Payloads)

```json
[
  {
    "name": "Greenwood High",
    "address": "123 Hill Road, Dehradun",
    "latitude": 30.3165,
    "longitude": 78.0322
  },
  {
    "name": "Delhi Public School",
    "address": "Sector 45, Noida",
    "latitude": 28.5355,
    "longitude": 77.3910
  },
  {
    "name": "St. Xavier's High",
    "address": "Pali Hill, Bandra, Mumbai",
    "latitude": 19.0606,
    "longitude": 72.8363
  }
]
```

---

## 📎 Notes

- No rate limiting is currently applied.
- All APIs return responses in JSON format.
- The backend uses Node.js, Express.js, MySQL, and proper production-level practices including validation via Joi, environment config, connection pooling, and error handling.

---
