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

  const handleSubmit = async e => {
    e.preventDefault();

    // Reiniciar estado de errores y activar isLoading
    setErrors({});
    setIsLoading(true);

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    if (validate(user, setErrors)) {
      try {
        await login(user, setErrors);
      } catch (error) {
        setErrors(error?.response?.data?.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center z-50 w-min-95-72 transition-transform duration-700">
      <div>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
          className="card-img-top"
        />
        <div className="flex flex-col items-center bg-dark-gray-400 p-14">
        {/* <div className="flex flex-col items-center bg-white p-14 h-[38rem]"> */}
          <Title 
            text="LOGIN"
            className="dark" 
          />

          <form className="w-3/5 flex flex-col items-center" onSubmit={handleSubmit} autoComplete="off" noValidate>

            <Input 
              type="email"
              className="dark"
              name="email"
              placeholder="USUARIO"
              dataRef={emailRef}
            />
            {errors.email ? <Alert key={'email'}>{errors.email}</Alert> : null}

            <Input 
              type="password"
              className="dark mb-3" 
              name="password"
              placeholder="CONTRASEÑA"
              dataRef={passwordRef}
            />
            {errors.password ? <Alert key={'password'}>{errors.password}</Alert> : null}

            <div className="flex justify-between mb-10 w-full">
              <CheckBox 
                name="savePassword" 
                text="Guardar contraseña" 
                isDark={true}
              />
              <nav className='font-medium text-xl text-light-gray-600 cursor-pointer hover:underline hover:underline-offset-1'>
                <Link to={''}>
                  ¿Has olvidado tu contraseña?
                </Link>
              </nav>
            </div>

            <Button
              type={isLoading ? undefined : "submit"}
              text={isLoading ? "Entrando..." : "ENTRAR"}
              className={isLoading ? "cursor-not-allowed" : ""}
              isLoading={isLoading}
              disabled={isLoading}
            />
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
