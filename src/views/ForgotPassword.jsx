import { useState, useEffect, useRef } from 'react';
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import { validateForgotPasswordForm } from '../utils/validateForm';
import cardImage from '/img/card-image-left.jpg';

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const emailRef = useRef(null);

  const { validate } = useValidation(validateForgotPasswordForm);
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
    }
  } , [errors]);

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
          setErrors({ success: "Ya puedes volver a enviar la petición."});
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reiniciar estado de errores y activar isLoading
    setErrors({});
    setIsLoading(true);

    // Construcción de los datos de usuario
    const user = {
      email: emailRef.current.value,
    };

    // Validación del formulario
    if (validate(user, setErrors)) {
      forgotPassword(user, setErrors, setIsTimeOut);
    }
  }

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className='w-full flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className='flex flex-col items-center justify-between bg-dark-gray-400 px-14 py-20'>
          <div>
            <Title className="dark title">
              RECUPERAR CONTRASEÑA
            </Title>
            <p className='text-white text-2xl font-semibold text-center mt-6'>Introduzca la dirección de correo electrónico:</p>
          </div>

          {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center">Tiempo restante: {countdown} s</Alert> : null}
          
          <form className="w-5/6 h-1/2 flex flex-col items-start justify-between" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className='w-full'>
              <Input 
                type="email"
                className="dark"
                name="email"
                placeholder="Email"
                dataRef={emailRef}
              />
              {errors.email ? <Alert key={'email'} className='pl-2 mt-2'>{errors.email}</Alert> : null}
              {errors.success ? <Alert key={'success'} variant='success' className='pl-2 mt-2'>{errors.success}</Alert> : null}
              {errors.redirecting ? <Alert key={'redirecting'} variant='success' className='pl-2 mt-3 animate-bounce'>{errors.redirecting}</Alert> : null}
            </div>
            
            <div className='w-full flex items-center justify-center gap-10'>
              <Button
                variant='secondary'
                to='/auth/login'>
                  Volver
              </Button>
              <Button
                type={isLoading ? undefined : "submit"}
                variant={isLoading || isTimeOut ? "loading" : undefined}
                isLoading={isLoading}
                disabled={isTimeOut}>
                  {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
