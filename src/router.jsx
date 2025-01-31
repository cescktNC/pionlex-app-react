import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from './pages/AuthLayout';
import Layout from './pages/Layout';
import MainContent from './views/MainContent';
import Login from './views/Login';
import Register from './views/Register';
import VerificationNotification from './views/VerificationNotification';
import ForgotPassword from './views/ForgotPassword';
import PasswordReset from './views/PasswordReset';

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
        path: 'login', // Esta vista se renderiza cuando se accede a la ruta '/auth/login'
        element: <Login />
      },
      {
        path: 'register', // Esta vista se renderiza cuando se accede a la ruta '/auth/register'
        element: <Register />
      },
      {
        path: 'forgot-password', // Esta vista se renderiza cuando se accede a la ruta '/auth/forgot-password'
        element: <ForgotPassword />
      },
      {
        path: 'password-reset/:token', // Esta vista se renderiza cuando se accede a la ruta '/auth/password-reset'
        element: <PasswordReset />
      },
      {
        path: 'verification-notification', // Esta vista se renderiza cuando se accede a la ruta '/auth/verification-notification'
        element: <VerificationNotification />
      }
    ]
  }
]);

export default router;