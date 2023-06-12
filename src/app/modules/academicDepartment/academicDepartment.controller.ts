import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.services';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constans';
import { paginationField } from '../../../constans/pagination';

const creteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;

    const result = await AcademicDepartmentServices.createAcademicDepartment(
      academicDepartmentData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully!',
      data: result,
    });
  }
);

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await AcademicDepartmentServices.getAllAcademicDepartment(
    paginationOptions,
    filters
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Academic department successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentServices.getSingleAcademicDepartment(
    id
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Department successfully!',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    id,
    updateData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Update successfully!',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentServices.deleteAcademicDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Department successfully!',
    data: result,
  });
});
export const AcademicDepartmentController = {
  creteAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
