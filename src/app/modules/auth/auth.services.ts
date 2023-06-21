import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  //   if is exist user
  const user = new User();

  const isExistUser = await user.isUserExist(id);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isExistUser.password &&
    !user.isPasswordMatch(password, isExistUser?.password)
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
  }
};

export const AuthService = {
  loginUser,
};
