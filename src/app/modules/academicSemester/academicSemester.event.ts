import { RedisClint } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETE,
  EVENT_ACADEMIC_SEMESTER_UPDATE,
} from './academicSemester.constans';
import { IAcademicSemesterCreateEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.services';

const initAcademicSemesterEvent = async () => {
  await RedisClint.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (e: string) => {
      const data: IAcademicSemesterCreateEvent = JSON.parse(e);
      await AcademicSemesterService.createAcademicSemesterEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATE,
    async (e: string) => {
      const data: IAcademicSemesterCreateEvent = JSON.parse(e);
      await AcademicSemesterService.updateAcademicSemesterEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_SEMESTER_DELETE,
    async (e: string) => {
      const data = JSON.parse(e);

      await AcademicSemesterService.deleteAcademicSemesterEvent(data.id);
    }
  );
};

export default initAcademicSemesterEvent;
