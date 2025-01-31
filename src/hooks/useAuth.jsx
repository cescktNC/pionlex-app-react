import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom'
import instanceAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

  const navigate = useNavigate();

  // SWR hace peticiones automáticas a la url, para mantener sincronizada la información del usuario en caché con el servidor.
  // - Busca en caché antes de hacer la petición (mejor rendimiento).
  // - Si la petición es exitosa, guarda los datos en `user`. Si falla, los almacena en `error`.
  // - `mutate()` permite actualizar o limpiar estos datos manualmente en caché.
  const { data: user, error, mutate } = useSWR( '/api/v1/user', () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    return instanceAxios('/api/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then( res => res.data)
    .catch( error => {
      console.error("Error al obtener usuario:", error?.response?.data?.message);
      throw Error(error?.response?.data?.errors);
    });
  });

  const login = async (user, setErrors) => {
    try {
      const {data} = await instanceAxios.post('/api/v1/login', user);
      localStorage.setItem('AUTH_TOKEN', data.token);

      if (!data.user.verified) {
        navigate('/auth/verification-notification');
      }

      await mutate(); // Refresca los datos del usuario tras iniciar sesión, haciendo la petición a /api/user y obtener la información más reciente del usuario.
    } catch (error) {
      setErrors(error?.response?.data?.errors ?? {});
    }
  };

  const register = () => {
    console.log('register');
  };

  const forgotPassword = async (user, setErrors, setIsTimeOut) => {
    try {
      const {data} = await instanceAxios.post('/api/v1/forgot-password', user);
      
      if (data.result) {
        setErrors({success: data.status})
        setTimeout(() => {
          setErrors({redirecting: 'Redirigiendo a la página de Login...'})
          setTimeout(() => navigate('/auth/login'), 5000);
        }, 7000);
      } else {
        if (Array.isArray(data.status)) {
          setErrors({email: data.status[0]});
        } else {
          setIsTimeOut(true);
          setErrors({email: data.status});
        }
      }
    } catch (error) {
      setErrors({ email: 'Error inesperado. Inténtalo más tarde.' });
    }
  };

  const passwordReset = async (user, setErrors) => {
    try {
      const {data} = await instanceAxios.post('/api/v1/reset-password', user);
      if (data.result) {
        setErrors({success: data.status});
        setTimeout(() => {
          setErrors({redirecting: 'Redirigiendo a la página de Login...'})
          setTimeout(() => navigate('/auth/login'), 5000);
        }, 5000);
      } else {
        setErrors({password: data.status});
      }
    } catch (error) {
      setErrors({ password: 'Error inesperado. Inténtalo más tarde.' });
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      await instanceAxios.post('/api/v1/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined); // Elimina al usuario de la caché y fuerza una actualización para que la aplicación lo detecte como deslogeado.
    } catch (error) {
      console.error(error?.response?.data?.errors);
      throw Error(error?.response?.data?.errors);
    }
  };

  const resendVerificationEmail = async (setErrors, setVerificationSent, setIsTimeOut, setUnauthenticated) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      await instanceAxios.post('/api/v1/email/verification-notification', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVerificationSent(true);
      setErrors({ emailNotVerified: "Correo de verificación reenviado. Revisa tu bandeja de entrada." });
    } catch (error) {
      setVerificationSent(false);
      if (error.response?.status === 429) { // Muchas peticiones
        setIsTimeOut(true);
        setErrors({ emailNotVerified: "Has realizado demasiadas peticiones. Inténtalo de nuevo más tarde." });
      } else if (error.response?.status === 401) { // No autenticado (No hay token)
        setErrors({ emailNotVerified: "Tu sesión ha expirado. Inicia sesión para continuar y vuelve a reenviar la verificación." });
        setTimeout(() => {
          setUnauthenticated(true);
          setErrors({ emailNotVerified: "Redirigiendo a la página de Login..." });
        }, 5000);
        setTimeout(() => navigate('/auth/login'), 7000);
      } else {
        setErrors({ emailNotVerified: "Error inesperado. Inténtalo más tarde." });
      }
    }
  };

  useEffect(() => {
    if (middleware === 'guest' && url && user) {
      navigate(url); // Redirige a la URL especificada si el usuario es un "guest" y hay una URL definida.
                     // Por ejemplo, si un usuario sin sesión intenta acceder a una página pública como /auth/register, pero ya está autenticado, lo redirige a su CRM `/`
    }
    if (middleware === 'auth' && error) {
      navigate('/auth/login'); // Si el usuario debería estar autenticado pero hay un error, lo manda al login.
                               // Por ejemplo, si un usuario sin sesión intenta entrar al CRM, pero falla la petición de /api/user, lo manda a `/auth/login`
    }
  } , [user, error]); // Se ejecuta cuando `user` o `error` cambian, es decir, cuando SWR obtiene una nueva respuesta del backend).

  return {
    login,
    register,
    forgotPassword,
    passwordReset,
    logout,
    resendVerificationEmail,
    user,
    error
  };

};