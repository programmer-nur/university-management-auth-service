import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOption from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constans';
import {
  IAcademicDepartment,
  AcademicDepartmentCreateAndUpdatedEvent,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllAcademicDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');
  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return result;
};

const insertAcademicDepartmentEvent = async (
  payload: AcademicDepartmentCreateAndUpdatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: payload.academicFacultyId,
  });
  await AcademicDepartment.create({
    title: payload.title,
    academicFaculty: academicFaculty?._id,
    syncId: payload.id,
  });
};

const updateAcademicDepartmentEvent = async (
  e: AcademicDepartmentCreateAndUpdatedEvent
): Promise<void> => {
  await AcademicDepartment.findOneAndUpdate(
    { syncId: e.academicFacultyId },
    {
      $set: {
        title: e.title,
        academicFaculty: e.academicFacultyId,
      },
    }
  );
};

const deleteAcademicDepartmentEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};
export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  insertAcademicDepartmentEvent,
  updateAcademicDepartmentEvent,
  deleteAcademicDepartmentEvent,
};
