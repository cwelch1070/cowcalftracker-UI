import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import Login from './Views/Login'
import Dashboard from './Views/Dashboard'
import CreateAccount from './Views/CreateAccount'
import Herd from './Views/Herd'
import ErrorPage from './Views/error-page'

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
    children: [
      {
        path: 'Herd',
        element: <Herd /> 
      },
    ],
  },
])

/* function App() {
  
} */

export default router;
