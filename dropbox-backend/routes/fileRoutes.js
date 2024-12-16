const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/fileModel');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, path: filePath, mimetype } = req.file;
    const file = await File.create({ name: originalname, path: filePath, mimeType: mimetype });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).send('File not found');
    res.sendFile(path.resolve(file.path));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
