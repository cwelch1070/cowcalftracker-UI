import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import CreateAccount from './components/CreateAccount'
//import DisplayCattle from './components/DisplayCattle'
import Gallery from './components/Test'
import ErrorPage from './components/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Gallery />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Login',
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
    // children: [
    //   {
    //     path: 'cattle',
    //     element: <Main /> 
    //   },
    // ],
  },
])

/* function App() {
  
} */

export default router;
