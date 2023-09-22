import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOption from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyCreateEvent,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { academicFacultySearchableFields } from './academicFaculty.constans';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const createAcademicFacultyEvent = async (
  payload: IAcademicFacultyCreateEvent
): Promise<void> => {
  await AcademicFaculty.create({
    title: payload.title,
    syncId: payload.id,
  });
};

const updateAcademicFacultyEvent = async (
  e: IAcademicFacultyCreateEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    { syncId: e.id },

    {
      $set: {
        title: e.title,
      },
    }
  );
};

const deleteAcademicFacultyEvent = async (syncId: string): Promise<void> => {
  await AcademicFaculty.findOneAndDelete({ syncId });
};
export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  deleteAcademicFacultyEvent,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicSemester,
  createAcademicFacultyEvent,
  updateAcademicFacultyEvent,
};
