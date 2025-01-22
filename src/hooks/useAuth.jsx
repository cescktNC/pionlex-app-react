import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom'
import instanceAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();

  // SWR hace peticiones automáticas a la url, para mantener sincronizada la información del usuario en caché con el servidor.
  // - Busca en caché antes de hacer la petición (mejor rendimiento).
  // - Si la petición es exitosa, guarda los datos en `user`. Si falla, los almacena en `error`.
  // - `mutate()` permite actualizar o limpiar estos datos manualmente en caché.
  const { data: user, error, mutate } = useSWR( '/api/user', () => {
    return instanceAxios('/api/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then( res => res.data)
    .catch( error => {
      throw Error(error?.response?.data?.errors);
    });
  });

  const login = async (user, setErrors) => {
    try {
      const {data} = await instanceAxios.post('/api/v1/login', user);
      localStorage.setItem('AUTH_TOKEN', data.token);
      // setErrors([]);
      setErrors({});
      await mutate(); // Refresca los datos del usuario tras iniciar sesión, haciendo la petición a /api/user y obtener la información más reciente del usuario.
    } catch (error) {
      // setErrors(Object.values(error.response.data.errors));
      setErrors(error.response.data.errors);
    }
  };

  const register = () => {
    console.log('register');
  };

  const logout = async () => {
    try {
      await instanceAxios.post('/api/v1/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined); // Elimina al usuario de la caché y fuerza una actualización para que la aplicación lo detecte como deslogeado.
    } catch (error) {
      throw Error(error?.response?.data?.errors);
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
    logout,
    user,
    error
  };

};