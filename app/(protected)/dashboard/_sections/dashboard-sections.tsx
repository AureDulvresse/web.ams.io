import { MySectionProps } from "@/src/types/custom-props";
import AdminDashboard from "../_components/admin-dashboard";
import DirectorDashboard from "../_components/director-dashboard";
import FinanceDashboard from "../_components/finance-dashboard";
import HRDashboard from "../_components/hr-dashboard";
import LibraryDashboard from "../_components/library-dashboard";
import StudentDashboard from "../_components/student-dashboard";
import TeacherDashboard from "../_components/teacher-dashboard";


const dashboardSections: MySectionProps[] = [
   {
      id: 'admin',
      component: <AdminDashboard />,
      permission: 'ADMIN_DASHBOARD_SHOW',
      roleNames: ['Admin', 'Super Admin']
   },
   {
      id: 'director',
      component: <DirectorDashboard />,
      permission: 'MANAGER_DASHBOARD_SHOW',
      roleNames: ['Directeur', 'manager', 'Super Admin']
   },
   {
      id: 'finance',
      component: <FinanceDashboard />,
      permission: 'FINANCE_DASHBOARD_SHOW',
      roleNames: ['Comptable', 'Finance Manager', 'Super Admin']
   },
   {
      id: 'student',
      component: <StudentDashboard />,
      permission: 'STUDENT_DASHBOARD_SHOW',
      roleNames: ['Student', 'Super Admin']
   },
   {
      id: 'hr',
      component: <HRDashboard />,
      permission: 'HR_DASHBOARD_SHOW',
      roleNames: ['HR Manager', 'Super Admin']
   },
   {
      id: 'teacher',
      component: <TeacherDashboard />,
      permission: 'TEACHER_DASHBOARD_SHOW',
      roleNames: ['Teacher', 'Super Admin']
   },
   {
      id: 'library',
      component: <LibraryDashboard />,
      permission: 'LIBRARY_DASHBOARD_SHOW',
      roleNames: ['Library', 'Super Admin']
   }
];

export default dashboardSections;