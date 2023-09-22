import { RedisClint } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETE,
  EVENT_ACADEMIC_DEPARTMENT_UPDATE,
} from './academicDepartment.constans';
import { AcademicDepartmentCreateAndUpdatedEvent } from './academicDepartment.interface';

import { AcademicDepartmentServices } from './academicDepartment.services';

const initAcademicDepartmentEvent = async () => {
  await RedisClint.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const data: AcademicDepartmentCreateAndUpdatedEvent = JSON.parse(e);
      await AcademicDepartmentServices.insertAcademicDepartmentEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATE,
    async (e: string) => {
      const data: AcademicDepartmentCreateAndUpdatedEvent = JSON.parse(e);
      await AcademicDepartmentServices.updateAcademicDepartmentEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETE,
    async (e: string) => {
      const data: AcademicDepartmentCreateAndUpdatedEvent = JSON.parse(e);
      await AcademicDepartmentServices.deleteAcademicDepartmentEvent(data.id);
    }
  );
};

export default initAcademicDepartmentEvent;
