import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

import globalErrorHandler from './app/middlewares/globalErrorHandeler';
import { userRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route';

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoute);

// testing
// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(400, 'THs is eoorr')
// })

app.use(globalErrorHandler);

export default app;
