import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import About from './Pages/About'
import LogIn from './Pages/auth/LogIn'
import RequiredAuth from './Pages/auth/RequiredAuth'
import SignUp from './Pages/auth/SignUp'
import UnprotectedRoute from './Pages/auth/UnprotectedRoute'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/course/CourseDescription'
import CourseList from './Pages/course/CourseList'
import CreateCourse from './Pages/course/CreateCourse'
import EditCourse from './Pages/course/EditCourse'
import AddCourseLecture from './Pages/dashboard/AddCourseLecture'
import AdminDashboard from './Pages/dashboard/AdminDashboard'
import CourseLectures from './Pages/dashboard/CourseLectures'
import EditCourseLecture from './Pages/dashboard/EditCourseLecture'
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import ChangePassword from './Pages/password/ChangePassword'
import ResetPassword from './Pages/password/ResetPassword'
import Checkout from './Pages/payments/Checkout'
import CheckoutFail from './Pages/payments/CheckoutFail'
import CheckoutSuccess from './Pages/payments/CheckoutSuccess'
import Profile from './Pages/user/Profile'
function App() {
  const location = useLocation();
  useEffect(() => {
    const setTitle = () => {
      const path = location.pathname;
      if (path === '/') {
        document.title = 'Learning Management System';
      }
      else if (path === '/about') {
        document.title = 'About - Learning Management System';
      } else if (path === '/contact') {
        document.title = 'Contact - Learning Management System';
      } else if (path === '/signup') {
        document.title = 'Sign Up - Learning Management System';
      } else if (path === '/login') {
        document.title = 'Log In - Learning Management System';
      } else if (path === '/courses') {
        document.title = 'All courses - Learning Management System';
      } else if (path === '/course/description') {
        document.title = 'Course description - Learning Management System';
      } else if (path === '/course/create') {
        document.title = 'Create course - Learning Management System';
      } else if (path === '/admin/dashboard') {
        document.title = 'Admin dashboard - Learning Management System';
      } else if (path === '/profile') {
        document.title = 'Profile - Learning Management System';
      } else if (path === '/profile/changePassword') {
        document.title = 'Change Password - Learning Management System';
      }
    };

    setTitle();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route element={<UnprotectedRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Route>

        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element={<CourseDescription />} />
        <Route element={<RequiredAuth allowedRole={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/course/:name/:id/editCourse' element={<EditCourse />} />
          <Route path='/course/:name/:id/lectures/addlecture' element={<AddCourseLecture />} />
          <Route path='/course/:name/:id/lectures/editlecture' element={<EditCourseLecture />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={["ADMIN", "USER"]} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/changePassword' element={<ChangePassword />} />
          <Route path='/course/:name/checkout' element={<Checkout />} />
          <Route path='/course/:name/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/course/:name/checkout/fail' element={<CheckoutFail />} />
          <Route path='/course/:name/:id/lectures' element={<CourseLectures />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
