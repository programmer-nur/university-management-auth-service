import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  //   if is exist user
  const isExistUser = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }
  //   match password
  const isPasswordMatch = bcrypt.compare(password, isExistUser?.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
  }
};

export const AuthSerivce = {
  loginUser,
};
