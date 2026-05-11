# Sports Management API Documentation

## Project Structure

```
Vind_api/
├── src/
│   ├── app.js
│   └── v1.0.0/
│       ├── controller/
│       │   ├── teamController.js
│       │   ├── playerController.js
│       │   └── matchController.js
│       ├── database/
│       │   └── db.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── repositories/
│       │   ├── teamRepository.js
│       │   ├── playerRepository.js
│       │   └── matchRepository.js
│       └── routes/
│           ├── teamRoutes.js
│           ├── playerRoutes.js
│           └── matchRoutes.js
├── package.json
└── database_schema.sql
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

### 3. Create Database and Tables
Run the SQL script to create tables:
```sql
-- Execute database_schema.sql in your MySQL client
```

### 4. Start the Server
```bash
npm start
```
The server will run on `http://localhost:3000`

---

## API Endpoints

### Teams

#### 1. Get All Teams
- **Endpoint:** `GET /api/v1/teams`
- **Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "team_id": 1,
      "team_name": "Team A"
    }
  ],
  "message": "Teams retrieved successfully"
}
```

#### 2. Create a Team
- **Endpoint:** `POST /api/v1/teams`
- **Request Body:**
```json
{
  "team_name": "Team A"
}
```
- **Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "team_id": 1,
    "team_name": "Team A"
  },
  "message": "Team created successfully"
}
```
- **Validation Errors:** 400 Bad Request if `team_name` is missing

#### 3. Delete a Team
- **Endpoint:** `DELETE /api/v1/teams/:team_id`
- **Response:** 200 OK
```json
{
  "success": true,
  "message": "Team deleted successfully"
}
```
- **Error:** 404 Not Found if team doesn't exist

---

### Players

#### 1. Create a Player
- **Endpoint:** `POST /api/v1/players`
- **Request Body:**
```json
{
  "player_name": "John Doe",
  "team_id": 1
}
```
- **Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "player_id": 1,
    "player_name": "John Doe",
    "team_id": 1
  },
  "message": "Player created successfully"
}
```
- **Validation Errors:** 
  - 400 Bad Request if `player_name` or `team_id` is missing
  - 404 Not Found if team doesn't exist

#### 2. Get All Players by Team
- **Endpoint:** `GET /api/v1/teams/:team_id/players`
- **Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "player_id": 1,
      "player_name": "John Doe",
      "team_id": 1
    }
  ],
  "message": "Players retrieved successfully"
}
```
- **Error:** 404 Not Found if team doesn't exist

#### 3. Delete a Player
- **Endpoint:** `DELETE /api/v1/players/:player_id`
- **Response:** 200 OK
```json
{
  "success": true,
  "message": "Player deleted successfully"
}
```
- **Error:** 404 Not Found if player doesn't exist

---

### Matches

#### 1. Get All Matches
- **Endpoint:** `GET /api/v1/matches`
- **Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "match_id": 1,
      "team_id_1": 1,
      "team_id_2": 2,
      "time": "2026-05-11T15:00:00.000Z",
      "result": null
    }
  ],
  "message": "Matches retrieved successfully"
}
```

#### 2. Get Match by ID
- **Endpoint:** `GET /api/v1/matches/:match_id`
- **Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "match_id": 1,
    "team_id_1": 1,
    "team_id_2": 2,
    "time": "2026-05-11T15:00:00.000Z",
    "result": null
  },
  "message": "Match retrieved successfully"
}
```
- **Error:** 404 Not Found if match doesn't exist

#### 3. Create a Match
- **Endpoint:** `POST /api/v1/matches`
- **Request Body:**
```json
{
  "team_id_1": 1,
  "team_id_2": 2,
  "time": "2026-05-11T15:00:00Z",
  "result": null
}
```
- **Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "match_id": 1,
    "team_id_1": 1,
    "team_id_2": 2,
    "time": "2026-05-11T15:00:00.000Z",
    "result": null
  },
  "message": "Match created successfully"
}
```
- **Validation Errors:**
  - 400 Bad Request if required fields are missing
  - 404 Not Found if either team doesn't exist

#### 4. Update Match Result (Only)
- **Endpoint:** `PUT /api/v1/matches/:match_id`
- **Request Body:**
```json
{
  "result": "Team A wins 2-1"
}
```
- **Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "match_id": 1,
    "team_id_1": 1,
    "team_id_2": 2,
    "time": "2026-05-11T15:00:00.000Z",
    "result": "Team A wins 2-1"
  },
  "message": "Match updated successfully"
}
```
- **Validation Errors:**
  - 400 Bad Request if `result` is missing
  - 404 Not Found if match doesn't exist

#### 5. Delete a Match
- **Endpoint:** `DELETE /api/v1/matches/:match_id`
- **Response:** 200 OK
```json
{
  "success": true,
  "message": "Match deleted successfully"
}
```
- **Error:** 404 Not Found if match doesn't exist

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- **200 OK:** Successful GET, PUT, or DELETE
- **201 Created:** Successful POST
- **400 Bad Request:** Validation error or missing required field
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Database error

Error Response Format:
```json
{
  "success": false,
  "message": "Error message description"
}
```

---

## Testing

You can test the API using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code Extension)
- cURL

Example cURL commands:

```bash
# Create a team
curl -X POST http://localhost:3000/api/v1/teams \
  -H "Content-Type: application/json" \
  -d '{"team_name": "Team A"}'

# Get all teams
curl http://localhost:3000/api/v1/teams

# Create a player
curl -X POST http://localhost:3000/api/v1/players \
  -H "Content-Type: application/json" \
  -d '{"player_name": "John Doe", "team_id": 1}'

# Create a match
curl -X POST http://localhost:3000/api/v1/matches \
  -H "Content-Type: application/json" \
  -d '{"team_id_1": 1, "team_id_2": 2, "time": "2026-05-11T15:00:00Z"}'

# Update match result
curl -X PUT http://localhost:3000/api/v1/matches/1 \
  -H "Content-Type: application/json" \
  -d '{"result": "Team A wins 2-1"}'
```

---

## Notes

- All database operations use async/await with mysql2/promise
- Foreign key constraints are enforced
- Cascade delete is enabled for related records
- All responses follow a consistent JSON format
- Input validation is performed before database operations
