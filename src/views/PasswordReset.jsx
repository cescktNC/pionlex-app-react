import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import { validatePasswordResetForm } from '../utils/validateForm';
import cardImage from '/img/card-image-left.jpg';

export default function PasswordReset() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const { token } = useParams();
  const email = searchParams.get("email");

  const { validate } = useValidation(validatePasswordResetForm);
  const { passwordReset } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
    }
  } , [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reiniciar estado de errores y activar isLoading
    setErrors({});
    setIsLoading(true);

    // Construcción de los datos de usuario
    const user = {
      email: email,
      token: token,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    // Validación del formulario
    if (validate(user, setErrors)) {
      passwordReset(user, setErrors);
    }
  }

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className='w-full flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className='flex flex-col items-center justify-between gap-24 bg-dark-gray-400 p-14'>
          <div>
            <Title className="dark title">
              RESTABLECER CONTRASEÑA
            </Title>
            <p className='text-white text-2xl font-semibold text-center mt-6'>Introduzca la nueva contraseña:</p>
          </div>

          <form className="w-5/6 h-3/4 flex flex-col items-start justify-between" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className='w-full'>
              <Input 
                type="password"
                className="dark mb-6" 
                name="password"
                placeholder="Contraseña"
                dataRef={passwordRef}
              />
              {errors.password ? <Alert key={'password'} className='pl-2 mb-3 mt-[-1rem]'>{errors.password}</Alert> : null}

              <Input 
                type="password"
                className="dark" 
                name="password_confirmation"
                placeholder="Repetir Contraseña"
                dataRef={passwordConfirmationRef}
              />
              {errors.passwordConfirmation ? <Alert key={'passwordConfirmation'} className='pl-2 mt-2'>{errors.passwordConfirmation}</Alert> : null}
              {errors.success ? <Alert key={'success'} variant='success' className='pl-2 mt-2'>{errors.success}</Alert> : null}
              {errors.redirecting ? <Alert key={'redirecting'} variant='success' className='pl-2 mt-3 animate-bounce'>{errors.redirecting}</Alert> : null}
            </div>
            
            <div className='w-full flex justify-center'>
              <Button
                type={isLoading ? undefined : "submit"}
                variant={isLoading ? "loading" : undefined}
                isLoading={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
