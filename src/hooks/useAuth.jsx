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

  // Iniciar sesión de un usuario en la aplicación.
  const login = async (user, setMessages, setIsTimeOut) => {
    try {
      const { data } = await instanceAxios.post('/api/v1/login', user);
      
      const token = data.user.token;
      localStorage.setItem('AUTH_TOKEN', token);
      const redirectAfterLogin = JSON.parse(localStorage.getItem('REDIRECT_AFTER_LOGIN'));
      
      if (!data.user.verified && redirectAfterLogin) { // Redirige al usuario a la URL que intentó acceder antes de iniciar sesión.
        navigate(redirectAfterLogin.url, {state: { params: redirectAfterLogin.params } });
      } else if (!data.user.verified) { // Si el usuario no ha verificado su correo electrónico aún, lo redirige a la notificación de verificación.
        navigate('/auth/verification-notification');
      }
      
      localStorage.removeItem('REDIRECT_AFTER_LOGIN');
      mutate(); // Refresca los datos del usuario tras iniciar sesión, haciendo la petición a /api/user y obtener la información más reciente del usuario.

    } catch (error) {
      if (error.response?.status === 422) { // Datos de login incorrectos
        setMessages({ errors: error.response.data.errors });

      } else if (error.response?.status === 429) { // Muchas peticiones (Demasiados intentos)
        setIsTimeOut(true);
        setMessages({ error: "Demasiados intentos. Espera un momento y vuelve a intentarlo." });

      } else { // Otros errores (500, 404, etc.)
        setIsTimeOut(true);
        setMessages({ error: 'Ocurrió un error. Inténtalo más tarde.' });
        console.error(`Pionlex Backend Error: ${error?.message}`);
      }
    }
  };

  // Registrar un nuevo usuario en la aplicación.
  const register = async (user, setMessages) => {
    try {
      const { data } = await instanceAxios.post('/api/v1/law-office-register', user);
      
      localStorage.setItem('AUTH_TOKEN', data.token);
      setMessages({success: 'Usuario registrado correctamente. Verifica tu correo electrónico para continuar.'});

    } catch (error) {
      if (error.response?.status === 422 || error.response?.status === 400) { // Datos de registro incorrectos (422) o código de invitación inválido (400)
        setMessages({ errors: error.response.data.errors });
      } else {  
        console.error(`Pionlex Backend Error: ${error?.message}`);
        setMessages({ error: 'Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.' });
      }
    }
  };

  // Enviar correo de recuperación de contraseña a un usuario (olvidó su contraseña) con un enlace de recuperación.
  const forgotPassword = async (user, setMessages, setIsTimeOut) => {
    try {
      await instanceAxios.post('/api/v1/forgot-password', user);
      setMessages({ success: "Correo de restablecimiento de contraseña enviado. Revisa tu bandeja de entrada." });
      
    } catch (error) {
      if (error.response?.status === 422) { // Datos de recuperación de contraseña incorrectos
        setMessages({ errors: error.response.data.errors });

      } else if (error.response?.status === 429) { // Muchas peticiones (Demasiados intentos)
        setIsTimeOut(true);
        setMessages({ error: "Demasiados intentos. Espera un momento y vuelve a intentarlo." });

      } else { // Otros errores (500, 404, etc.)
        setIsTimeOut(true);
        console.error(`Pionlex Backend Error: ${error?.message}`);
        setMessages({ error: 'Ocurrió un error. Inténtalo más tarde.' });
      }
    }
  };

  // Resetear la contraseña de un usuario (olvidó su contraseña) con el token de recuperación enviado por correo.
  const passwordReset = async (user, setMessages, setIsTimeOut) => {
    try {
      await instanceAxios.post('/api/v1/reset-password', user);
      setMessages({success: "Contraseña restablecida correctamente. Redirigiendo al inicio de sesión..."});

      setTimeout(() => {
        setTimeout(() => navigate('/auth/login'), 5000);
      }, 5000);

    } catch (error) { // Otros errores (500, 404, etc.)
      if (error.response?.status === 400) { // Enlace de restablecimiento de contraseña inválido
        navigate('/auth/forgot-password', {state: { message: error.response.data.errors.message } });
      
      } else if (error.response?.status === 422) { // Datos de restablecimiento de contraseña incorrectos
        setMessages({ errors: error.response.data.errors });
      
      } else if (error.response?.status === 429) { // Muchas peticiones (Demasiados intentos)
        setIsTimeOut(true);
        setMessages({ error: "Demasiados intentos. Espera un momento y vuelve a intentarlo." });

      } else { // Otros errores (500, 404, etc.)
        setIsTimeOut(true);
        console.error(`Pionlex Backend Error: ${error?.message}`);
        setMessages({ error: 'Ocurrió un error. Inténtalo más tarde.' });
      }
    }
  };

  // Cerrar sesión de un usuario (elimina el token de autenticación y fuerza una actualización de la caché para que la aplicación detecte que el usuario está deslogeado).
  const logout = async () => {
    try {
      await instanceAxios.post('/api/v1/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
      });

    } catch (error) {
      console.error(`Pionlex Backend Error: ${error?.message}`);
    } finally {
      localStorage.removeItem('AUTH_TOKEN');
      mutate(undefined); // Elimina al usuario de la caché y fuerza una actualización para que la aplicación lo detecte como deslogeado.
    } 
  };

  // Reenviar correo de verificación de cuenta (para usuarios no verificados)
  const resendVerificationEmail = async (setMessages, setIsTimeOut) => {
    // Verificar si hay token antes de hacer la petición
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      navigate('/auth/login', {state: { message: "Debes iniciar sesión para continuar." } });
      return;
    }

    try {
      await instanceAxios.post('/api/v1/email/verification-notification', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessages({ success: "Correo de verificación reenviado. Revisa tu bandeja de entrada." });

    } catch (error) {
      if (error.response?.status === 429) { // Muchas peticiones (Demasiados intentos)
        setIsTimeOut(true);
        setMessages({ error: "Demasiados intentos. Espera un momento y vuelve a intentarlo." });

      } else if (error.response?.status === 401) { // No autenticado (No hay token o token inválido)
        navigate('/auth/login', {state: { message: "Tu sesión ha expirado. Inicia sesión para continuar." } });

      } else { // Otros errores (500, 404, etc.)
        setIsTimeOut(true);
        setMessages({ error: 'Ocurrió un error. Inténtalo más tarde.' });
        console.error(`Pionlex Backend Error: ${error?.message}`);
      }
    }
  };

  // Verificar correo electrónico de un usuario (al hacer clic en el enlace de verificación enviado por correo).
  const sendVerifyEmail = async (user, setMessages, setIsTimeOut) => {
    const url = `/api/v1/verify-email/${user.id}/${user.hash}`;
    const params = {
      expires: user.expires,
      signature: user.signature,
    };

    // Verificar si hay token antes de hacer la petición
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      const urlRedirect = `/auth/verify-email/${user.id}/${user.hash}`;
      localStorage.setItem('REDIRECT_AFTER_LOGIN', JSON.stringify({ url: urlRedirect, params }));
      navigate('/auth/login', {state: { message: "Debes iniciar sesión para continuar." } });
      return;
    }

    try {
      await instanceAxios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('REDIRECT_AFTER_LOGIN');
      setMessages({ success: 'Correo verificado correctamente. Iniciando sesion...' });
      mutate(); // Refresca los datos del usuario tras verificar el correo, haciendo la petición a /api/user y obtener la información más reciente del usuario.

    } catch (error) {
      if (error.response?.status === 401) { // No autenticado (No hay token o token inválido)
        const urlRedirect = `/auth/verify-email/${user.id}/${user.hash}`;
        localStorage.setItem('REDIRECT_AFTER_LOGIN', JSON.stringify({ url: urlRedirect, params }));
        navigate('/auth/login', {state: { message: "Tu sesión ha expirado. Inicia sesión para continuar." } });

      } else if (error.response?.status === 403) { // Enlace expirado
        navigate('/auth/verification-notification', {state: { message: "El enlace de verificación ha expirado." } });
      
      } else if (error.response?.status === 409) { // Correo ya verificado
        setMessages({ error: 'El correo electrónico ya ha sido verificado.' });

      } else if (error.response?.status === 429) { // Muchas peticiones (Demasiados intentos)
        setIsTimeOut(true);
        setMessages({ error: 'Demasiados intentos. Espera un momento y vuelve a intentarlo.' });

      } else { // Otros errores (500, 404, etc.)
        setIsTimeOut(true);
        setMessages({ error: 'Ocurrió un error. Inténtalo más tarde.' });
      }
    }
  };

  // Redirigir al usuario según el middleware y el estado de autenticación.
  useEffect(() => {
    if (middleware === 'guest' && url && user) {
      navigate(url); // Redirige a la URL especificada si el usuario es un "guest" y hay una URL definida.
                     // Por ejemplo, si un usuario intenta acceder a una página pública como /auth/verify-email, pero ya está autenticado y validado, lo redirige a su CRM `/`
                     // Otro ejemplo, si un usuario intenta acceder a la página de login, pero ya está autenticado, lo redirige a su CRM `/` y lo mismo con el registro.
    }
    if (middleware === 'auth' && error) {
      mutate(undefined); // Elimina al usuario de la caché y fuerza una actualización para que la aplicación lo detecte como deslogeado (En caso de que haya otra ventana abierta con la aplicación).
      navigate('/auth/login'); // Si el usuario debería estar autenticado pero hay un error, lo manda al login.
                               // Por ejemplo, si un usuario sin sesión intenta entrar al CRM, pero falla la petición de /api/user, lo manda a `/auth/login`
    }
  } , [user, error]); // Se ejecuta cuando `user` o `error` cambian, es decir, cuando SWR obtiene una nueva respuesta del backend).

  // Devuelve las funciones y estados necesarios para la autenticación.
  return {
    login,
    register,
    forgotPassword,
    passwordReset,
    logout,
    resendVerificationEmail,
    sendVerifyEmail,
    user,
    error
  };

};