import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from './pages/AuthLayout';
import Layout from './pages/Layout';
import MainContent from './views/MainContent';
import Login from './views/Login';
import Register from './views/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Esta vista se renderiza por defecto cuando se accede a la ruta '/'
        element: <MainContent />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login', // Esta vista se renderiza cuando se accede a la ruta '/auth/login'
        element: <Login />
      },
      {
        path: '/auth/register', // Esta vista se renderiza cuando se accede a la ruta '/auth/register'
        element: <Register />
      }
    ]
  }
]);

export default router;