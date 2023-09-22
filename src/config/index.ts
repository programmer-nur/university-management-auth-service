import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  prot: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expire_in: process.env.JWT_EXPIRE_IN,
    refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  },
  redis: {
    url: process.env.REDIS_URL,
    expire_in: process.env.REDIS_TOKEN_EXPIRE_IN,
  },
};
