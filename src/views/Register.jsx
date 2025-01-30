import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import CheckBox from '../components/forms/CheckBox';
import Button from '../components/forms/Button';
import cardImage from '/img/card-image-top-register.jpg';

export default function Register() {
  const formRef = useRef(null);
  const officeNameRef = useRef(null);
  const cifRef = useRef(null);
  const invitationCodeRef = useRef(null);
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
    }
  } , [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  // Limpiar los campos
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
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
            DESPACHO
          </Title>

          <form ref={formRef} className="w-3/5 flex flex-col items-start" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Input 
              className="dark mb-6"
              name="officeName"
              placeholder="Nombre Despacho"
              dataRef={officeNameRef}
            />
            <Input 
              className="dark mb-6"
              name="cif"
              placeholder="CIF"
              dataRef={cifRef}
            />
            <Input 
              className="dark mb-6"
              name="invitationCode"
              placeholder="Código de invitación"
              dataRef={invitationCodeRef}
            />
            <Input 
              className="dark mb-6"
              name="name"
              placeholder="Nombre"
              dataRef={nameRef}
            />
            <Input 
              className="dark mb-6"
              name="lastname"
              placeholder="Apellidos"
              dataRef={lastnameRef}
            />
            <Input 
              type="email"
              className="dark mb-6"
              name="email"
              placeholder="Email"
              dataRef={emailRef}
            />
            <Input 
              type="password"
              className="dark mb-6" 
              name="password"
              placeholder="Contraseña"
              dataRef={passwordRef}
            />
            <Input 
              type="password"
              className="dark mb-3" 
              name="password_confirmation"
              placeholder="Repetir Contraseña"
              dataRef={passwordConfirmationRef}
            />
            <div className="flex mb-10 w-full">
              <CheckBox 
                name="savePassword" 
                className="dark">
                  Acepto la&nbsp;
              </CheckBox>
              <nav className='font-medium text-xl text-light-gray-600 cursor-pointer hover:underline hover:underline-offset-1'>
                <Link to={''}>
                  Política de Privacidad y Condiciones de Uso
                </Link>
              </nav>
            </div>
            <div className="w-full flex justify-between">
              <Button
                variant='secondary'
                onClick={handleReset}>
                  Limpiar Formulario
              </Button>
              <Button
                type={isLoading ? undefined : "submit"}
                variant={isLoading ? "loading" : undefined}
                isLoading={isLoading}
                disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Crear Despacho"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <nav className='mt-2 text-center text-white text-2xl hover:underline hover:underline-offset-1'>
        <Link to={'/auth/login'}>
          ¿Ya tienes usuario? Inicia Sesión
        </Link>
      </nav>
    </div>
  )
}
