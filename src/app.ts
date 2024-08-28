import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import './app/modules/subscriptions/subscription.cron';
export const app: Application = express();

app.use(
  cors({
    origin: "*",
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

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to Fitness APP');
});

app.use(globalErrorHandler);

app.use(NotFoundHandler.handle);
