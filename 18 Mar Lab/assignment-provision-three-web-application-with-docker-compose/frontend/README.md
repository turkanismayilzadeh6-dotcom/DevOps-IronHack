# Notes App Frontend

A modern React-based frontend application for managing notes. This is the frontend component of a two-tier application that provides an intuitive interface for creating, editing, and managing notes.

## 🚀 Features

- **Create Notes**: Add new notes with title and content
- **Edit Notes**: Modify existing notes inline
- **Delete Notes**: Remove notes with confirmation
- **Real-time Updates**: Automatic refresh of notes list
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: User-friendly error messages and success notifications
- **Loading States**: Visual feedback during API operations

## 🛠️ Technology Stack

- **React 18.2.0**: Modern React with hooks
- **Axios 1.4.0**: HTTP client for API communication
- **React Scripts 5.0.1**: Create React App build tools
- **CSS3**: Custom styling for modern UI

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend API server running (default: http://localhost:3001)

## 🚀 Getting Started

### Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

### Environment Variables

The application uses the following environment variable:

- `REACT_APP_API_URL`: Backend API URL (defaults to `http://localhost:3001`)

Create a `.env` file in the frontend directory to override the default:

```env
REACT_APP_API_URL=http://your-backend-url:3001
```

## 🐳 Docker Setup

### Build Docker Image
```bash
docker build -t notes-frontend .
```

### Run with Docker
```bash
docker run -p 3000:3000 notes-frontend
```

## 📱 Application Structure

```
frontend/
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── Dockerfile          # Docker configuration
└── README.md          # This file
```

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## 🌐 API Integration

The frontend communicates with the backend API through the following endpoints:

- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update an existing note
- `DELETE /notes/:id` - Delete a note

## 🎨 UI Components

- **Header**: Application title and description
- **Form**: Create/edit note form with validation
- **Note Cards**: Display individual notes with actions
- **Loading States**: Visual feedback during operations
- **Error/Success Messages**: User notification system

## 🔒 Security Considerations

- Input validation on client-side
- Confirmation dialogs for destructive actions
- Error handling for API failures
- Environment variable configuration for API endpoints

## 🚀 Deployment

### Production Build
1. Run `npm run build` to create optimized production build
2. Serve the `build` folder using a web server like nginx or Apache

### Docker Deployment
1. Build the Docker image: `docker build -t notes-frontend .`
2. Run the container: `docker run -p 3000:3000 notes-frontend`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of a sample two-tier application demonstration.

## 🆘 Support

For issues and questions, please refer to the main project README or create an issue in the repository.


