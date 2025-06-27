# Student Records CRUD API

- This is a simple RESTful API built with Node.js, Express, and MongoDB for managing student records. It supports full CRUD operations along with pagination and filtering.

## Features

- Create a new student
- Get all students (with optional pagination and filtering)
- Update a student by ID
- Delete a student by ID
- Get the total number of students
- reset all student data

## Requirements

- Node.js (v14+)
- npm
- MongoDB (local or Atlas)
- [MongoDB Compass (optional)](https://www.mongodb.com/try/download/compass)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd student-crud-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB using Compass

start a new connection with the localhost link
mongodb://localhost:27017/

### 4. Start MongoDB (Local Only)

If using local MongoDB, make sure it's running:

```bash
mongod
```

### 5. Start the API Server

```bash
node index.js
```

You should see:

```
MongoDB connected
Server running on port 3000
```

---

## API Endpoints

| Method | Endpoint          | Description                                        |
| ------ | ----------------- | -------------------------------------------------- |
| POST   | `/students`       | Create a new student                               |
| GET    | `/students`       | Get all students (supports pagination & filtering) |
| GET    | `/students/count` | Get total number of students                       |
| GET    | `/students/:id`   | Get a single student by ID                         |
| PUT    | `/students/:id`   | Update a student by ID                             |
| DELETE | `/students/:id`   | Delete a student by ID                             |

---

## Query Parameters

### Pagination

```
GET /students?page=1&limit=10
```

### Filter by last name

```
GET /students?lastName=Smith
```

You can also combine both:

```
GET /students?page=2&limit=5&lastName=Johnson
```

---

## Testing with Postman

You can use the provided Postman collection:

1. Open Postman
2. Import `student-api.postman_collection.json`
3. Run the "Reset" request to clear existing data
4. Run the other requests as needed

---

## Project Structure

```
student-crud-api/
├── index.js
├── models/
│   └── Student.js
└── README.md
```

---

## Validation & Error Handling

- `400 Bad Request` – Missing or invalid fields
- `409 Conflict` – Duplicate email
- `404 Not Found` – ID does not exist
- `500 Internal Server Error` – Server/database errors

---

## License

MIT License – free to use and modify.
