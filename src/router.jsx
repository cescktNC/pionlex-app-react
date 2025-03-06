import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from './pages/AuthLayout';
import Layout from './pages/Layout';
import MainContent from './views/MainContent';
import Login from './views/Login';
import Register from './views/Register';
import VerificationNotification from './views/VerificationNotification';
import ForgotPassword from './views/ForgotPassword';
import PasswordReset from './views/PasswordReset';
import VerifyEmail from './views/VerifyEmail';
import Clients from './views/modules/crm/clients';
import Users from './views/modules/crm/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Esta vista se renderiza por defecto cuando se accede a la ruta '/'
        element: <MainContent />
      },
      {
        path: 'dashboard', // Esta vista se renderiza cuando se accede a la ruta '/dashboard'
      },
      {
        path: 'clients', // Esta vista se renderiza cuando se accede a la ruta '/clients'
        element: <Clients />
      },
      {
        path: 'users', // Esta vista se renderiza cuando se accede a la ruta '/users'
        element: <Users />
      },
      {
        path: 'judicial-processes', // Esta vista se renderiza cuando se accede a la ruta '/judicial-processes'
      },
      {
        path: 'document-templates', // Esta vista se renderiza cuando se accede a la ruta '/document-templates'
      },
      {
        path: 'digital-signature', // Esta vista se renderiza cuando se accede a la ruta '/digital-signature'
      },
      {
        path: 'incidents', // Esta vista se renderiza cuando se accede a la ruta '/incidents'
      },
      {
        path: 'emails', // Esta vista se renderiza cuando se accede a la ruta '/emails'
      },
      {
        path: 'payments', // Esta vista se renderiza cuando se accede a la ruta '/payments'
      },
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
      },
      {
        path: 'verify-email/:id/:hash', // Esta vista se renderiza cuando se accede a la ruta '/auth/verify-email'
        element: <VerifyEmail />
      }
    ]
  }
]);

export default router;