import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Department is exist!');
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
