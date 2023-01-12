import express, { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { purchaseRouter } from './routes/purchase.route';
import { userRouter } from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/purchase', purchaseRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Route Not Found!'));
});

// middleware to handle thrown errors
app.use(errorHandler);

export { app };
