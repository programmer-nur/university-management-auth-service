import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelper } from '../../../helper/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist.password &&
    (await !User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // access token and refresh tooken
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.expire_refresh_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = JwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userId } = verifyToken;
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist!');
  }
  const { id, role } = isUserExist;
  const newAccessToken = JwtHelper.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

// const user = new User();

// const isExistUser = await user.isUserExist(id);
// if (!isExistUser) {
//   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
// }

// if (
//   isExistUser.password &&
//   !user.isPasswordMatch(password, isExistUser?.password)
// ) {
//   throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
// }
