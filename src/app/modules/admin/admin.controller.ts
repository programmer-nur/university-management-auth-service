import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constans';
import { paginationField } from '../../../constans/pagination';
import { AdminService } from './admin.services';
import sendResponse from '../../../shared/sendRespons';
import { IAdmin } from './admin.interface';
import httpStatus from 'http-status';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationField);
  const result = await AdminService.getAllAdmins(filters, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Admin retrieved successfully',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Admin successfully',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AdminService.updateAdmin(id, updateData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Admin successfully',
    data: result,
  });
});
export const AdminController = {
  getAllAdmins,
  deleteAdmin,
  getSingleAdmin,
  updateAdmin,
};
