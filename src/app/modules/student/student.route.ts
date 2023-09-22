import express from 'express';
import { StudentController } from './student.controller';
import { studentValidation } from './studentValidation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

router.get('/:id', StudentController.deleteStudent);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
