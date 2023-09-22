import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constans/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constans';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester created successfully!',
      data: result,
    });
  }
);

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await AcademicSemesterService.getAllAcademicSemester(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester get successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      updatedData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully !',
      data: result,
    });
  }
);

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Semester successfully !',
      data: result,
    });
  }
);
export const AcademicController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
