import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';
import { useValidation } from "../hooks/useValidation";
import Title from '../components/forms/Title';
import Input from '../components/forms/Input';
import CheckBoxLabel from '../components/forms/CheckBoxLabel';
import Button from '../components/forms/Button';
import Alert from "../components/forms/Alert";
import { fieldLabels } from "../utils/errorConstants";
import { translateBackendErrors } from '../utils/errorTranslator';
import { validateRegisterForm } from "../utils/validateForm";
import cardImage from '/img/card-image-top-register.jpg';

export default function Register() {
  const formRef = useRef(null);
  const officeLawNameRef = useRef(null);
  const nifRef = useRef(null);
  const invitationCodeRef = useRef(null);
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const policyTermsRef = useRef(null);

  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { validate } = useValidation(validateRegisterForm);
  const { register } = useAuth({
      middleware: 'guest',
      url: '/'
    });
  
  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      setIsLoading(false);
      setIsDisabled(false);
      
      if (messages.success) {
        setIsDisabled(true);
        formRef.current.reset();
      }

      if (messages.errors) {
        setMessages(translateBackendErrors(messages.errors));
      }
    }
  } , [messages]);

  const handleSubmit = event => {
    event.preventDefault();
    
    // Reiniciar estado de errores y activar isLoading
    setMessages({});
    setIsLoading(true);
    setIsDisabled(true);

    // Construcción de los datos de usuario
    const user = {
      officeLawName: officeLawNameRef.current.value.trim(),
      nif: nifRef.current.value.trim(),
      invitationCode: invitationCodeRef.current.value.trim(),
      name: nameRef.current.value.trim(),
      lastname: lastnameRef.current.value.trim(),
      email: emailRef.current.value.trim().toLowerCase(),
      password: passwordRef.current.value.trim(),
      password_confirmation: passwordConfirmationRef.current.value.trim(),
    };
    
    const policyTerms = policyTermsRef.current.checked;

    // Validación del formulario de registro.
    if (validate(user, setMessages) && policyTerms) {
      register(user, setMessages);
    } else if (!policyTerms) { // Validación de las Políticas y los Términos.
      setMessages(prevMessages => ({...prevMessages, policyTerms: "Tienes que aceptar las Políticas y los Términos."}));
    }
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
          <Title className="dark pb-10">DESPACHO</Title>

          <form ref={formRef} className="w-3/5 flex flex-col items-start" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Input 
              className="dark mb-6"
              name="officeLawName"
              placeholder={fieldLabels.officeLawName}
              dataRef={officeLawNameRef}
            />
            {messages.officeLawName ? <Alert key={'officeLawName'} className='pl-2 mb-3 mt-[-1rem]'>{messages.officeLawName}</Alert> : null}
            <Input 
              className="dark mb-6"
              name="nif"
              placeholder={fieldLabels.nif}
              dataRef={nifRef}
            />
            {messages.nif ? <Alert key={'nif'} className='pl-2 mb-3 mt-[-1rem]'>{messages.nif}</Alert> : null}
            <Input 
              className="dark mb-6 dark:border-yellow-500 focus:dark:border-yellow-600"
              name="invitationCode"
              placeholder={fieldLabels.invitationCode}
              dataRef={invitationCodeRef}
            />
            {messages.invitationCode ? <Alert key={'invitationCode'} className='pl-2 mb-3 mt-[-1rem]'>{messages.invitationCode}</Alert> : null}
            <Input 
              className="dark mb-6"
              name="name"
              placeholder={fieldLabels.name}
              dataRef={nameRef}
            />
            {messages.name ? <Alert key={'name'} className='pl-2 mb-3 mt-[-1rem]'>{messages.name}</Alert> : null}
            <Input 
              className="dark mb-6"
              name="lastname"
              placeholder={fieldLabels.lastname}
              dataRef={lastnameRef}
            />
            {messages.lastname ? <Alert key={'lastname'} className='pl-2 mb-3 mt-[-1rem]'>{messages.lastname}</Alert> : null}
            <Input 
              type="email"
              className="dark mb-6"
              name="email"
              placeholder={fieldLabels.email}
              dataRef={emailRef}
            />
            {messages.email ? <Alert key={'email'} className='pl-2 mb-3 mt-[-1rem]'>{messages.email}</Alert> : null}
            <Input 
              type="password"
              className="dark mb-6" 
              name="password"
              placeholder={fieldLabels.password}
              dataRef={passwordRef}
            />
            {messages.password ? <Alert key={'password'} className='pl-2 mb-3 mt-[-1rem]'>{messages.password}</Alert> : null}
            <Input 
              type="password"
              className="dark mb-3" 
              name="password_confirmation"
              placeholder={fieldLabels.password_confirmation}
              dataRef={passwordConfirmationRef}
            />
            {messages.password_confirmation ? <Alert key={'password_confirmation'} className='pl-2 mb-3 mt-[-.4rem]'>{messages.password_confirmation}</Alert> : null}
            <div className="flex w-full">
              <CheckBoxLabel 
                name="policyTerms" 
                className="dark"
                dataRef={policyTermsRef}>
                  Acepto la&nbsp;
              </CheckBoxLabel>
              <nav className='font-medium text-xl text-light-gray-600 cursor-pointer hover:underline hover:underline-offset-1'>
                <Link to={''}>
                  Política de Privacidad y Condiciones de Uso
                </Link>
              </nav>
            </div>
            {messages.policyTerms ? <Alert key={'policyTerms'} className='pl-2 mb-3 mt-2'>{messages.policyTerms}</Alert> : null}
            <div className="w-full flex justify-between mt-10">
              <Button
                variant="secondary"
                onClick={handleReset}
                disabled={isDisabled}>
                  Limpiar Formulario
              </Button>
              <Button
                type={isLoading ? undefined : "submit"}
                loading={isLoading}
                disabled={isDisabled}>
                  {isLoading ? "Guardando..." : "Crear Despacho"}
              </Button>
            </div>
            {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center mt-8'>{messages.error}</Alert> : null}
            {messages.success ? <Alert key={'success'} variant='successBg' className='text-center mt-8'>{messages.success}</Alert> : null}
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
