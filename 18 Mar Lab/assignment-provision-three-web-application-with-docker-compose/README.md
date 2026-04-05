# Notes Application - Two-Tier Architecture

A full-stack web application built with Node.js backend, React frontend, and PostgreSQL database. This application allows users to create, read, update, and delete notes with a modern, responsive UI.

## 🏗️ Architecture

- **Frontend**: React.js with modern CSS styling
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (optional, for local development)

### Running with Docker Compose (Recommended)

1. **Clone and navigate to the project directory**
   ```bash
   cd sample-two-tier-application
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5432

### Manual Setup (Alternative)

If you prefer to run services individually:

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database Setup
Make sure PostgreSQL is running on port 5432 with:
- Database: `notes_db`
- Username: `postgres`
- Password: `password`

## 📋 API Endpoints

The backend provides the following REST API endpoints:

### Notes API (`/notes`)

- `GET /notes` - Get all notes
- `POST /notes` - Create a new note
- `GET /notes/:id` - Get a specific note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

### Health Check
- `GET /health` - Check if the backend is running

### Example API Usage

```bash
# Get all notes
curl http://localhost:3001/notes

# Create a new note
curl -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "This is the content"}'

# Get a specific note
curl http://localhost:3001/notes/1

# Update a note
curl -X PUT http://localhost:3001/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Note", "content": "Updated content"}'

# Delete a note
curl -X DELETE http://localhost:3001/notes/1
```

## 🗄️ Database Schema

The application uses a simple `notes` table:

```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Features

### Frontend Features
- **Modern UI**: Clean, responsive design with gradient background
- **Real-time Updates**: Immediate UI updates after CRUD operations
- **Form Validation**: Required field validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Mobile Responsive**: Works on all device sizes

### Backend Features
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Database Integration**: PostgreSQL with connection pooling
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin resource sharing enabled
- **Auto-initialization**: Database table creation on startup

## 🛠️ Development

### Project Structure
```
sample-two-tier-application/
├── docker-compose.yml          # Docker services configuration
├── backend/                    # Node.js backend
│   ├── package.json           # Backend dependencies
│   ├── Dockerfile             # Backend container
│   └── server.js              # Express server with API routes
├── frontend/                   # React frontend
│   ├── package.json           # Frontend dependencies
│   ├── Dockerfile             # Frontend container
│   ├── public/                # Static files
│   └── src/                   # React components
│       ├── App.js             # Main React component
│       ├── index.js           # React entry point
│       └── index.css          # Global styles
└── README.md                  # This file
```

### Environment Variables

#### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3001)

#### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001)

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3001, and 5432 are available
2. **Database connection**: Ensure PostgreSQL container is running
3. **CORS issues**: Backend has CORS enabled for localhost:3000

### Reset Database
```bash
# Stop services and remove volumes
docker-compose down -v

# Start fresh
docker-compose up --build
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
