import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import Alert from "../components/forms/Alert";
import { translateBackendErrors } from '../utils/errorTranslator';
import { validateLoginForm } from "../utils/validateForm";
import cardImage from '/img/card-image-top-login.jpg';

export default function Login() {
  const location = useLocation();
  const message = location.state?.message ? { loginRequired: location.state.message } : {}; // Mostrar mensaje de error si se ha redirigido desde otra página

  const emailRef = useRef(null); // Referencia al input de email
  const passwordRef = useRef(null); // Referencia al input de contraseña
  
  const [messages, setMessages] = useState(message); // Estado de mensajes
  const [isLoading, setIsLoading] = useState(false); // Estado de enviando datos
  const [isTimeOut, setIsTimeOut] = useState(false); // Estado de tiempo de espera
  const [countdown, setCountdown] = useState(0); // Contador de tiempo de espera
  const [isDisabled, setIsDisabled] = useState(false); // Estado de deshabilitación de botón
  
  const { validate } = useValidation(validateLoginForm);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Manejo de mensajes
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      setIsLoading(false);

      messages.error ? setIsDisabled(true) : setIsDisabled(false);

      if (messages.retry) {
        setTimeout( () => setMessages({}), 5000);
      }

      if (messages.errors) {
        setMessages(translateBackendErrors(messages.errors));
      }
    }
  } , [messages]);

  // Contador de tiempo de 60 segundos, para poder volver a iniciar sesión
  useEffect( () => {
    if (isTimeOut) {
      let seconds = 60;
      setCountdown(seconds);
      const interval = setInterval( () => {
        seconds--;
        setCountdown(seconds);
        
        if (seconds <= 0) {
          clearInterval(interval);
          setIsTimeOut(false);
          setIsDisabled(false);
          setMessages({ retry: "Ya puedes volver a iniciar sesión." });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  // Inicia sesión de un usuario
  const handleSubmit = async e => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Reiniciar estado de mensajes y activar isLoading
    setMessages({});
    setIsLoading(true);
    setIsDisabled(true);

    // Construcción de los datos de usuario
    const user = {
      email: emailRef.current.value.trim().toLowerCase(),
      password: passwordRef.current.value.trim(),
    };

    if (validate(user, setMessages)) { // Validación del formulario
      login(user, setMessages, setIsTimeOut); // Iniciar sesión
    }
  };

  return (
    <div className="relative z-50 w-full min-w-95-72 transition-transform duration-700">
      <div>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className="h-[40rem] flex flex-col items-center bg-dark-gray-400 p-14">
          <Title className="dark pb-10">LOGIN</Title>

          <form className="w-3/5 h-full flex flex-col justify-between" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className='w-full'>
              <Input 
                type="email"
                className="dark mb-6"
                name="email"
                placeholder="USUARIO"
                dataRef={emailRef}
              />
              {messages.email ? <Alert key={'email'} className='pl-2 mb-2 mt-[-1rem]'>{messages.email}</Alert> : null}

              <Input 
                type="password"
                className="dark mb-3" 
                name="password"
                placeholder="CONTRASEÑA"
                dataRef={passwordRef}
              />
              {messages.password ? <Alert key={'password'} className='pl-2 mb-2 mt-[-.25rem]'>{messages.password}</Alert> : null}

              <nav className='font-medium text-xl text-light-gray-600 cursor-pointer hover:underline hover:underline-offset-1 w-full'> 
                <Link to={'/auth/forgot-password'}>
                  ¿Has olvidado tu contraseña?
                </Link>
              </nav>
            </div>

            {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center'>{messages.error}</Alert> : null}
            {messages.loginRequired ? <Alert key={'loginRequired'} variant='errorBg' className='text-center'>{messages.loginRequired}</Alert> : null}
            {messages.retry ? <Alert key={'retry'} variant='successBg' className='text-center'>{messages.retry}</Alert> : null}
            {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center">Tiempo restante: {countdown} s</Alert> : null}

            <div className="w-full flex justify-center">
              <Button
                type={isLoading ? undefined : "submit"}
                disabled={isDisabled}
                isLoading={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <nav className='mt-2 text-center text-white text-2xl hover:underline hover:underline-offset-1'>
        <Link to={'/auth/register'}>
          ¿No tienes usuario? Regístrate
        </Link>
      </nav>
    </div>
  )
}
