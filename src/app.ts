import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import errorHandler from './app/middlewares/errorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to olory-mini server!');
});

// Error handle;
app.use(errorHandler);

// Not found rout;
app.use(notFound);

export default app;
