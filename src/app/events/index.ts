import initAcademicDepartmentEvent from '../modules/academicDepartment/academicDepartment.event';
import initAcademicFacultyEvent from '../modules/academicFaculty/academicFaculty.event';
import initAcademicSemesterEvent from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvent();
  initAcademicFacultyEvent();
  initAcademicDepartmentEvent();
};

export default subscribeToEvents;
