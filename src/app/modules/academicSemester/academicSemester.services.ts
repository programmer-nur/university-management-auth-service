import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterTitlesCodeMapper } from './academicSemester.constans';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  if (academicSemesterTitlesCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!');
  }
  return result;
};

export const AcademicSemesterService = { createAcademicSemester };
