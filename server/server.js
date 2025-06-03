import express from 'express'; // framework
import cors from 'cors';
import dotenv from 'dotenv'; // access to .env file in backend
import multer from 'multer'; // store user uploaded pdf
import chat from './chat.js';

dotenv.config();

// To use middlewares
const app = express();
app.use(cors());

// Takes care of storing pdf when user upload PDF
const storage = multer.diskStorage({
  // Where to store file
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Filename to be stored as
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

const PORT = 5001;

let filePath;

// POST Request Handler
app.post('/upload', upload.single('file'), async (req, res) => {
  // Should check if pdf file
  filePath = req.file.path;
  // Sends to frontend
  res.send(filePath + 'upload successful');
});

// GET Request Handler
app.get('/chat', async (req, res) => {
  const resp = await chat(filePath, req.query.question);
  res.send(resp.text);
  //   console.log('get chat request received');
});

// Server Running
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
