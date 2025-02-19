import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import cardImage from '/img/card-image-left.jpg';

export default function ForgotPassword() {
  const [messages, setMessages] = useState({waiting: "Estamos verificando tu correo electrónico..."}); // Estado de mensajes
  const [isDisabled, setIsDisabled] = useState(true); // Estado de deshabilitación de botón
  const [isLoading, setIsLoading] = useState(false); // Estado de enviando datos
  const [isTimeOut, setIsTimeOut] = useState(false); // Estado de tiempo de espera
  const [countdown, setCountdown] = useState(0); // Contador de tiempo de espera

  const { id, hash } = useParams(); // Parámetros de la URL (id, hash)
  
  // Parámetros de la URL (expires, signature)
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const expires = location.state?.params?.expires ?? searchParams.get("expires"); // Parámetro expires de la URL;
  const signature = location.state?.params?.signature ?? searchParams.get("signature"); // Parámetro signature de la URL;

  const { sendVerifyEmail } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay errores, detener el estado de enviando datos y deshabilitar el botón de reenvío de correo de verificación
  useEffect(() => {
    if (messages.success) {
      setIsLoading(false);
      setIsDisabled(true);
    }

    if (messages.error) setIsLoading(false);
  } , [messages]);

  // Contador de tiempo de 60 segundos, para poder reenviar correo de verificación
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
          setMessages({retry: "Revisa tu bandeja de entrada o pulsa al botón de abajo."});
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  // Reenviar correo de verificación al cargar la página de verificación de correo electrónico.
  useEffect(() =>{
    setIsDisabled(true);

    const user = { id, hash, expires, signature };
    sendVerifyEmail(user, setMessages, setIsTimeOut);
  }, []);

  const handleSubmit = async () => {
    setMessages({waiting: "Estamos verificando tu correo electrónico..."});
    setIsLoading(true);
    setIsDisabled(true);

    const user = { id, hash, expires, signature };
    sendVerifyEmail(user, setMessages, setIsTimeOut);
  }

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className="flex">
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className="w-full flex justify-center bg-dark-gray-400 py-24">
          <div className="w-3/4 flex flex-col justify-between">
            <Title className="dark title w-full">VERIFICAR CUENTA</Title>
            
            <div>
              {messages.waiting ? <Alert key={'waiting'} variant='successBg' className='text-center animate-bounce'>{messages.waiting}</Alert> : null}
              {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center'>{messages.error}</Alert> : null}
              {messages.success ? <Alert key={'success'} variant='successBg' className='text-center'>{messages.success}</Alert> : null}
              {messages.retry ? <Alert key={'retry'} variant='successBg' className='text-center'>{messages.retry}</Alert> : null}
              {messages.animated ? <Alert key={'animated'} variant='successBg' className='text-center mt-8 animate-bounce'>{messages.animated}</Alert> : null}
              {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center mt-4">Tiempo restante: {countdown} s</Alert> : null}
            </div>

            <div className="flex justify-center">
              <Button
                isLoading={isLoading}
                disabled={isDisabled}
                onClick={handleSubmit}>
                  {isLoading ? "Confirmando..." : "Confirme su correo electrónico"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
