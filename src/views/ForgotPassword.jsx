import { useState, useEffect, useRef } from 'react';
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from 'react-router-dom';
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import { translateBackendErrors } from '../utils/errorTranslator';
import { validateForgotPasswordForm } from '../utils/validateForm';
import cardImage from '/img/card-image-left.jpg';

export default function ForgotPassword() {
  const location = useLocation();
  const message = location.state?.message ? { forgotPasswordRequired: location.state.message } : {}; // Mostrar mensaje de error si se ha redirigido desde otra página

  const [messages, setMessages] = useState(message); // Estado de mensajes
  const [isLoading, setIsLoading] = useState(false); // Estado de enviando datos
  const [isTimeOut, setIsTimeOut] = useState(false); // Estado de tiempo de espera
  const [countdown, setCountdown] = useState(0); // Contador de tiempo de espera
  const [isDisabled, setIsDisabled] = useState(false); // Estado de deshabilitación de botón

  const formRef = useRef(null);
  const emailRef = useRef(null);

  const { validate } = useValidation(validateForgotPasswordForm);
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay mensajes, detener el estado de carga
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      setIsLoading(false);

      messages.error ? setIsDisabled(true) : setIsDisabled(false);

      if (messages.success) {
        formRef.current.reset();
      }

      if (messages.errors) {
        setMessages(translateBackendErrors(messages.errors));
      }
    }
  } , [messages]);

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
          setMessages({ retry: "Ya puedes volver a enviar la petición."});
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reiniciar estado de errores y activar isLoading
    setMessages({});
    setIsLoading(true);
    setIsDisabled(true);

    // Construcción de los datos de usuario
    const user = {
      email: emailRef.current.value.trim().toLowerCase(),
    };

    // Validación del formulario
    if (validate(user, setMessages)) {
      forgotPassword(user, setMessages, setIsTimeOut);
    }
  }

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className='w-full flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className='w-full flex justify-center bg-dark-gray-400 py-24 px-20'>
          <div className="flex flex-col justify-between">

            <div>
              <Title className="dark">RECUPERAR CONTRASEÑA</Title>
              <p className='text-white text-2xl font-semibold text-center mt-6'>Introduzca la dirección de correo electrónico:</p>
            </div>

            <div className='h-full flex flex-col justify-evenly'>
              {messages.email ? <Alert key={'email'} variant='errorBg' className='text-center'>{messages.email}</Alert> : null}
              {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center'>{messages.error}</Alert> : null}
              {messages.retry ? <Alert key={'retry'} variant='successBg' className='text-center'>{messages.retry}</Alert> : null}
              {messages.success ? <Alert key={'success'} variant='successBg' className='text-center'>{messages.success}</Alert> : null}
              {messages.forgotPasswordRequired ? <Alert key={'forgotPasswordRequired'} variant='errorBg' className='text-center'>{messages.forgotPasswordRequired}</Alert> : null}
              {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center">Tiempo restante: {countdown} s</Alert> : null}
            </div>
          
            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off" noValidate>
              <Input 
                type="email"
                className="dark"
                name="email"
                placeholder="Email"
                dataRef={emailRef}
              />
              
              <div className='w-full flex items-center justify-center gap-10 mt-6'>
                <Button
                  variant='secondary'
                  to='/auth/login'>
                    Volver
                </Button>
                <Button
                  type={isLoading ? undefined : "submit"}
                  loading={isLoading}
                  disabled={isDisabled}>
                    {isLoading ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
