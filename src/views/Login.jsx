import { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import CheckBox from '../components/forms/CheckBox';
import Button from '../components/forms/Button';
import cardImage from '/img/card-image-top-login.jpg';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

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

          <form id="login-form" className="w-3/5 flex flex-col items-center" method="POST" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Input 
              type="email"
              className="dark"
              name="email"
              placeholder="USUARIO"
            />
            <Input 
              type="password"
              className="dark mb-3" 
              name="password"
              placeholder="CONTRASEÑA"
            />
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
              type={!isLoading ? "submit" : "button"}
              text={!isLoading ? "ENTRAR" : "Entrando..."}
              className={!isLoading ? "" : "cursor-not-allowed"}
              isLoading={isLoading}
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
