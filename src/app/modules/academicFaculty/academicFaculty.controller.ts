import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.services';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constans/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constans';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicFaculty created successfully!',
      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationField);
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Academic Faculty successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicFaculty single fetched successfully!',
      data: result,
    });
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updateData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicFaculty update successfully!',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicFacultyService.deleteAcademicSemester(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Faculty successfully !',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
