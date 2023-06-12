import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.patch('/:id', AcademicFacultyController.updateAcademicFaculty);

router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRoute = router;
