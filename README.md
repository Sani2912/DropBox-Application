# Dropbox Application

A full-stack Dropbox-like file management application built with **Node.js**, **React**, and **Express.js**. The application allows users to upload, view, and manage their files seamlessly on their local setup.

## Features
- **File Upload**: Upload files via a simple interface.
- **File Management**: View and manage uploaded files.
- **Backend Support**: RESTful APIs for file handling.
- **Frontend UI**: React-based user interface for smooth interactions.
- **Local Storage**: Files are stored locally on the server.

---

## Tech Stack

### Frontend
- **React**: UI components and state management.
- **Axios**: For API communication.
- **Bootstrap**: For responsive design.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: RESTful API framework.
- **Multer**: File upload middleware.
- **SQLite**: Lightweight database for file metadata.

---

## Prerequisites

1. **Node.js**: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/)
2. **NPM/Yarn**: Comes bundled with Node.js.

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-username/Dropbox-Application.git
cd Dropbox-Application
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd dropbox-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `dropbox-backend` and configure the following variables:
   ```env
   PORT=4000
   DATABASE_URL=./database.sqlite
   UPLOADS_DIR=uploads
   ````

4. Run the backend server:
   ```bash
   node app.js
   ```

   The backend server will be available at `http://localhost:4000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../dropbox-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Directory Structure
```plaintext
Dropbox-Application/
├── dropbox-backend/    # Backend code
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── uploads/        # Uploaded files
│   ├── app.js          # Main server file
│   ├── config.js       # Configuration settings
│   ├── package.json    # Backend dependencies
│   └── .env            # Backend environment variables
├── dropbox-frontend/   # Frontend code
│   ├── src/            # React components and logic
│   ├── public/         # Static assets
│   ├── package.json    # Frontend dependencies
│   └── .env            # Frontend environment variables
└── README.md           # Project documentation
```

---

## Usage
1. Open the frontend in your browser at `http://localhost:3000`.
2. Use the UI to upload files.
3. View and manage uploaded files.

---

## Known Issues
- Files are stored locally; cloud storage integration is planned for future versions.
- CORS settings must be properly configured for cross-origin requests.

---

## Future Enhancements
- Deployment on cloud platforms.
- User authentication and authorization.
- Integration with cloud storage services (e.g., AWS S3).

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
Special thanks to the open-source community for tools and libraries used in this project.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

