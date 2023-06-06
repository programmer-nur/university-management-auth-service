import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicsemester.interface';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createAcademicSemester };
