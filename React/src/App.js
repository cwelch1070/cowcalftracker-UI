import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import CreateAccount from './components/CreateAccount'
import DisplayCattle from './components/DisplayCattle'
import Attendance from './components/Attendance';
import ErrorPage from './components/error-page'
import DisplayAttendanceRecords from './components/DisplayAttendanceRecords';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/CreateAccount',
    element: <CreateAccount />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Cattle',
    element: <DisplayCattle />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Attendance',
    element: <Attendance />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Records',
    element: <DisplayAttendanceRecords />,
    errorElement: <ErrorPage />
  }
])

export default router;
