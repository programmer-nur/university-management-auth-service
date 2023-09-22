import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handelValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const error: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );
  const statusCode = 500;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: error,
  };
};

export default handelValidationError;
