import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'AcademicSemester created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicController = {
  createAcademicSemester,
};
