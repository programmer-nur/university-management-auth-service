import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
// router.patch(
//   '/:id',
//   validateRequest(studentValidation.updateStudentZodSchema),
//   StudentController.updateStudent
// );

// router.get('/:id', StudentController.deleteStudent);

// router.get('/', StudentController.getAllStudents);

export const AuthRoutes = router;
