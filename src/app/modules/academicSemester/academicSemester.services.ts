import { AcademicSemester } from './academicSemester.model';
import {
  IAcademicSemester,
  IAcademicSemesterCreateEvent,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constans';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import IPaginationOption from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!');
  }
  return result;
};

const getAllAcademicSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
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

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const updateAcademicSemesterEvent = async (
  e: IAcademicSemesterCreateEvent
): Promise<void> => {
  await AcademicSemester.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: {
        title: e.title,
        year: e.year,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    }
  );
};

const deleteAcademicSemesterEvent = async (syncId: string): Promise<void> => {
  await AcademicSemester.findOneAndDelete({ syncId });
};
const createAcademicSemesterEvent = async (
  e: IAcademicSemesterCreateEvent
): Promise<void> => {
  await AcademicSemester.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
  updateAcademicSemesterEvent,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
  createAcademicSemesterEvent,
  deleteAcademicSemesterEvent,
};
