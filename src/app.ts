import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import config from './app/config';
import errorHandler from './app/middlewares/errorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

dotenv.config();
const app: Application = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  }),
);
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to olory-mini server!');
});

// Error handle;
app.use(errorHandler);

// Not found rout;
app.use(notFound);

export default app;
