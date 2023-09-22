import { RedisClint } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETE,
  EVENT_ACADEMIC_FACULTY_UPDATE,
} from './academicFaculty.constans';
import { IAcademicFacultyCreateEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.services';

const initAcademicFacultyEvent = async () => {
  await RedisClint.subscribe(
    EVENT_ACADEMIC_FACULTY_CREATED,
    async (e: string) => {
      const data: IAcademicFacultyCreateEvent = JSON.parse(e);
      await AcademicFacultyService.createAcademicFacultyEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_FACULTY_UPDATE,
    async (e: string) => {
      const data: IAcademicFacultyCreateEvent = JSON.parse(e);
      await AcademicFacultyService.updateAcademicFacultyEvent(data);
    }
  );
  await RedisClint.subscribe(
    EVENT_ACADEMIC_FACULTY_DELETE,
    async (e: string) => {
      const data = JSON.parse(e);

      await AcademicFacultyService.deleteAcademicFacultyEvent(data.id);
    }
  );
};

export default initAcademicFacultyEvent;
