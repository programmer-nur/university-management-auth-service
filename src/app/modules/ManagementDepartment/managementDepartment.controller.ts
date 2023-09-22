import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import { ManagementDepartmentService } from './managementDepartment.services';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFiled } from './managementDepartment.constans';
import { paginationField } from '../../../constans/pagination';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;

    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create ManagementDepartment successfully',
      data: result,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single ManagementDepartment get successfully',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFiled);
    const paginationOptions = pick(req.body, paginationField);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Management department successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updateData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Management department successfully!',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Management department successfully!',
      data: result,
    });
  }
);
export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
