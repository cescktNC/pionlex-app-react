import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import { translateBackendErrors } from '../utils/errorTranslator';
import { validatePasswordResetForm } from '../utils/validateForm';
import cardImage from '/img/card-image-left.jpg';

export default function PasswordReset() {
  const [messages, setMessages] = useState({}); // Estado de mensajes
  const [isLoading, setIsLoading] = useState(false); // Estado de enviando datos
  const [isTimeOut, setIsTimeOut] = useState(false); // Estado de tiempo de espera
  const [countdown, setCountdown] = useState(0); // Contador de tiempo de espera
  const [isDisabled, setIsDisabled] = useState(false); // Estado de deshabilitación de botón
  const [searchParams] = useSearchParams(); // Parámetros de la URL

  const formRef = useRef(null); // Referencia al formulario
  const passwordRef = useRef(null); // Referencia al input de contraseña
  const passwordConfirmationRef = useRef(null); // Referencia al input de confirmación de contraseña
  const { token } = useParams(); // Parámetro de la URL (token)
  const email = searchParams.get("email"); // Parámetro de la URL (email)

  const { validate } = useValidation(validatePasswordResetForm);
  const { passwordReset } = useAuth({
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
      email: email,
      token: token,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    // Validación del formulario
    if (validate(user, setMessages)) {
      passwordReset(user, setMessages, setIsTimeOut);
    }
  }

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className='w-full flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        
        <div className='w-full flex justify-center bg-dark-gray-400 py-16'>
          
          <div className="flex flex-col justify-between">

            <div>
              <Title className="dark">RESTABLECER CONTRASEÑA</Title>
              <p className='text-white text-2xl font-semibold text-center mt-6'>Introduzca la nueva contraseña:</p>
            </div>

            <div className='h-full flex flex-col justify-evenly'>
              {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center'>{messages.error}</Alert> : null}
              {messages.retry ? <Alert key={'retry'} variant='successBg' className='text-center'>{messages.retry}</Alert> : null}
              {messages.success ? <Alert key={'success'} variant='successBg' className='text-center'>{messages.success}</Alert> : null}
              {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center">Tiempo restante: {countdown} s</Alert> : null}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off" noValidate>
              <Input 
                type="password"
                className="dark mb-6" 
                name="password"
                placeholder="Contraseña"
                dataRef={passwordRef}
              />
              {messages.password ? <Alert key={'password'} className='pl-2 mb-3 mt-[-1rem]'>{messages.password}</Alert> : null}

              <Input 
                type="password"
                className="dark" 
                name="password_confirmation"
                placeholder="Repetir Contraseña"
                dataRef={passwordConfirmationRef}
              />
              {messages.password_confirmation ? <Alert key={'password_confirmation'} className='pl-2 mt-2'>{messages.password_confirmation}</Alert> : null}
              
              <div className='w-full flex justify-center mt-6'>
                <Button
                  type={isLoading ? undefined : "submit"}
                  loading={isLoading}
                  disabled={isDisabled}>
                    {isLoading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
