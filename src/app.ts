import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandeler';
import routers from './app/routes';

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routers);
// testing
// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(400, 'THs is eoorr')
// })

app.use(globalErrorHandler);

export default app;
