# Backend - Notes API

A Node.js backend application built with Express.js that provides a RESTful API for managing notes with PostgreSQL database integration.

## 🏗️ Architecture

- **Framework**: Express.js
- **Database**: PostgreSQL with connection pooling
- **Language**: Node.js (JavaScript)
- **Port**: 3001 (configurable via PORT environment variable)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (local or remote)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://postgres:password@localhost:5432/notes_db
   NODE_ENV=development
   ```

3. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📋 API Endpoints

### Health Check
- `GET /health` - Check if the backend is running
  - **Response**: `{ "status": "OK", "message": "Backend is running" }`

### Notes API

#### Get All Notes
- `GET /notes`
- **Description**: Retrieve all notes ordered by creation date (newest first)
- **Response**: Array of note objects
- **Example Response**:
  ```json
  [
    {
      "id": 1,
      "title": "My Note",
      "content": "This is the content",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
  ```

#### Create Note
- `POST /notes`
- **Description**: Create a new note
- **Request Body**:
  ```json
  {
    "title": "Note Title (required)",
    "content": "Note content (optional)"
  }
  ```
- **Response**: Created note object
- **Status Codes**: 201 (Created), 400 (Bad Request)

#### Get Single Note
- `GET /notes/:id`
- **Description**: Retrieve a specific note by ID
- **Response**: Note object
- **Status Codes**: 200 (OK), 404 (Not Found)

#### Update Note
- `PUT /notes/:id`
- **Description**: Update an existing note
- **Request Body**:
  ```json
  {
    "title": "Updated Title (required)",
    "content": "Updated content (optional)"
  }
  ```
- **Response**: Updated note object
- **Status Codes**: 200 (OK), 400 (Bad Request), 404 (Not Found)

#### Delete Note
- `DELETE /notes/:id`
- **Description**: Delete a note by ID
- **Response**: `{ "message": "Note deleted successfully" }`
- **Status Codes**: 200 (OK), 404 (Not Found)

## 🗄️ Database Schema

The application automatically creates the `notes` table on startup:

```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/notes_db` |
| `NODE_ENV` | Environment mode | `development` |

### Database Connection

The application uses the `pg` library with connection pooling for efficient database operations. The connection string format is:

```
postgresql://username:password@host:port/database
```

## 🛠️ Development

### Project Structure
```
backend/
├── package.json          # Dependencies and scripts
├── server.js             # Main server file with all routes
├── Dockerfile            # Docker container configuration
└── README.md             # This file
```

### Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (placeholder)

### Dependencies

#### Production Dependencies
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `pg` - PostgreSQL client
- `dotenv` - Environment variable management

#### Development Dependencies
- `nodemon` - Auto-restart server on file changes

## 🔍 Error Handling

The application includes comprehensive error handling:

- **Database Errors**: Logged and returned as 500 Internal Server Error
- **Validation Errors**: 400 Bad Request for missing required fields
- **Not Found Errors**: 404 for non-existent resources
- **CORS**: Enabled for cross-origin requests

## 🐳 Docker Support

The backend can be run in a Docker container:

```bash
# Build the image
docker build -t notes-backend .

# Run the container
docker run -p 3001:3001 -e DATABASE_URL=your_db_url notes-backend
```

## 📝 API Testing

### Using curl

```bash
# Health check
curl http://localhost:3001/health

# Get all notes
curl http://localhost:3001/notes

# Create a note
curl -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Note", "content": "This is a test"}'

# Get a specific note
curl http://localhost:3001/notes/1

# Update a note
curl -X PUT http://localhost:3001/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Note", "content": "Updated content"}'

# Delete a note
curl -X DELETE http://localhost:3001/notes/1
```

### Using Postman or similar tools

Import the following collection structure:
- Base URL: `http://localhost:3001`
- Endpoints: `/health`, `/notes`, `/notes/:id`

## 🔒 Security Considerations

- Input validation for required fields
- SQL injection protection through parameterized queries
- CORS configuration for frontend integration
- Environment variable management for sensitive data

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT environment variable
   - Kill existing process on port 3001

3. **CORS Issues**
   - Backend has CORS enabled for localhost:3000
   - Adjust CORS settings in server.js if needed

### Logs

The application logs important events:
- Server startup
- Database initialization
- API requests (in development)
- Error details
