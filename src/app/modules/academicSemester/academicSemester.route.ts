import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicController.createAcademicSemester
);

router.get('/:id', AcademicController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicController.updateAcademicSemester
);
router.delete('/:id', AcademicController.deleteAcademicSemester);
router.get('/', AcademicController.getAllAcademicSemester);
export const AcademicSemesterRoute = router;
