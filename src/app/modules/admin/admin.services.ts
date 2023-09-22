/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import IPaginationOption from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constans';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOption
) => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOptions);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const deleteAdmin = async (id: string) => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const admin = await Admin.findOneAndDelete({ id }, { session });
    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to admin delete');
    }
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();
    return admin;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }
  const { name, ...adminData } = payload;
  const updateData = { ...adminData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findByIdAndUpdate(
    { _id: id },

    updateData,
    {
      new: true,
    }
  );
  return result;
};
export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
