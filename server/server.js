import express from 'express'; // framework
import cors from 'cors';
import dotenv from 'dotenv'; // access to .env file in backend
import multer from 'multer'; // store user uploaded pdf
import chat from './chat.js';

dotenv.config();

// To use middlewares
const app = express();
app.use(cors());

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
