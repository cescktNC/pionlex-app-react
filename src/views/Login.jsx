import { createRef, useState, useEffect } from "react";
import { useValidation } from "../hooks/useValidation";
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import CheckBox from '../components/forms/CheckBox';
import Button from '../components/forms/Button';
import Alert from "../components/forms/Alert";
import { validateLoginForm } from "../utils/validateForm";
import cardImage from '/img/card-image-top-login.jpg';

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { validate } = useValidation(validateLoginForm);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
    }
  } , [errors]);

  // Inicia sesión de un usuario
  const handleSubmit = async e => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Reiniciar estado de errores y activar isLoading
    setErrors({});
    setIsLoading(true);

    // Construcción de los datos de usuario
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    console.log(user);

    // Validación del formulario
    if (validate(user, setErrors)) {
      login(user, setErrors);
    }
  };

  return (
    <div className="relative z-50 w-full min-w-95-72 transition-transform duration-700">
      <div>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className="flex flex-col items-center bg-dark-gray-400 p-14">
          <Title className="dark pb-10">
            LOGIN
          </Title>

          <form className="w-3/5 flex flex-col items-start" onSubmit={handleSubmit} autoComplete="off" noValidate>

            <Input 
              type="email"
              className="dark mb-6"
              name="email"
              placeholder="USUARIO"
              dataRef={emailRef}
            />
            {errors.email ? <Alert key={'email'} className='pl-2 mb-6 mt-[-1rem]'>{errors.email}</Alert> : null}

            <Input 
              type="password"
              className="dark mb-3" 
              name="password"
              placeholder="CONTRASEÑA"
              dataRef={passwordRef}
            />
            {errors.password ? <Alert key={'password'} className='pl-2 mb-3 mt-[-.5rem]'>{errors.password}</Alert> : null}

            <div className="flex justify-between mb-10 w-full">
              <CheckBox 
                name="savePassword" 
                className="dark">
                  Guardar contraseña
              </CheckBox>
              <nav className='font-medium text-xl text-light-gray-600 cursor-pointer hover:underline hover:underline-offset-1'>
                <Link to={''}>
                  ¿Has olvidado tu contraseña?
                </Link>
              </nav>
            </div>

            <div className="w-full flex justify-center">
              <Button
                type={isLoading ? undefined : "submit"}
                variant={isLoading ? "loading" : undefined}
                disabled={isLoading}
                isLoading={isLoading}>
                  {isLoading ? "Entrando..." : "ENTRAR"}
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
