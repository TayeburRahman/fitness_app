import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import './app/modules/subscriptions/subscription.cron';
export const app: Application = express();
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const upload = multer({ dest: 'uploads/videos' });
app.use(
  cors({
    origin: [
      'https://app.unityinmotion.ca',
      'https://unityinmotion.ca',
      'http://192.168.30.250:3008',
      'http://192.168.10.147:3001',
      'http://192.168.10.6:3002',
      'http://192.168.10.6:3001',
      'http://103.161.9.133:3001',
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: '3000mb' }));
app.use(express.urlencoded({ extended: true, limit: '3000mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/', routes);

app.post('/upload', upload.single('chunk'), (req: Request, res: Response) => {
  const chunk = req.file;
  const { originalname, chunkIndex, totalChunks } = req.body;
  const uploadDir = path.join(__dirname, '../uploads');
  const filePath = path.join(uploadDir, originalname);
  const pathDir = path.join(originalname);
  if (!chunk || !chunkIndex || !totalChunks || !originalname) {
    return res.status(400).json({ status: 'error', message: 'Invalid upload data' });
  }
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  try {
    fs.appendFileSync(filePath, fs.readFileSync(chunk.path));
    fs.unlinkSync(chunk.path);
    if (Number(chunkIndex) + 1 === Number(totalChunks)) {
      return res.json({ success: true, status: 'completed', path: pathDir, message: 'File uploaded successfully!' });
    } else {
      return res.json({ success: false, status: 'chunkReceived', message: 'Chunk received!' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'File handling error', error });
  }
});

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to Fitness APP');
});

app.use(globalErrorHandler);

app.use(NotFoundHandler.handle);
