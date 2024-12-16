const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 4000;

// Database setup (SQLite example)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './files.db',
});

// File model definition
const File = sequelize.define('File', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Sync database
sequelize.sync().then(() => console.log("Database synced"));

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Set up Multer for file upload
const upload = multer({
  dest: 'uploads/', // Files will be temporarily stored in the 'uploads' directory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image') || file.mimetype === 'application/json' || file.mimetype === 'text/plain') {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Unsupported file type'), false); // Reject file
    }
  },
});

// Route for uploading a file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, path: filePath } = req.file;

    const file = await File.create({
      name: originalname, // Save the original filename
      path: filePath,
      mimeType: mimetype,
    });

    res.status(201).json(file); // Return file data after upload
  } catch (error) {
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
});

// Route for listing all files
app.get('/files', async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve files', details: error.message });
  }
});

// Route for downloading a file
app.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Resolve full file path
    const filePath = path.resolve(file.path);

    // Send the file to the client
    res.download(filePath, file.name); // Second argument sets the filename for the download
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve file', details: error.message });
  }
});

// Root route to verify if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
