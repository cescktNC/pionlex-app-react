import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Alert from '../components/forms/Alert';
import Button from '../components/forms/Button';
import cardImage from '/img/card-image-left.jpg';

export default function VerificationNotification() {
  const location = useLocation();
  const message = location.state?.message ?? "Tu correo electrónico no ha sido verificado. Revisa tu bandeja de entrada.";

  const [messages, setMessages] = useState({notVerified: message}); // Estado de mensajes
  const [isLoading, setIsLoading] = useState(false); // Estado de enviando datos
  const [isTimeOut, setIsTimeOut] = useState(false); // Estado de tiempo de espera
  const [countdown, setCountdown] = useState(0); // Contador de tiempo de espera
  const [isDisabled, setIsDisabled] = useState(false); // Estado de deshabilitación de botón

  const { resendVerificationEmail } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay mensajes, detener el estado de enviando datos y deshabilitar el botón de reenvío de correo de verificación
  useEffect(() => {
    if (messages.success) {
      setIsLoading(false);
      setIsDisabled(false);
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
          setMessages({success: "Revisa tu bandeja de entrada o inténtalo de nuevo."});
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  const handleSubmit = async () => {
    // Reiniciar estado de errores y activar isLoading
    setMessages({animated: "Se está reenviando el correo de verificación. Por favor, espera."});
    setIsLoading(true);
    setIsDisabled(true);

    // Reenviar correo de verificación
    resendVerificationEmail(setMessages, setIsTimeOut);
  };

  return (
    <div className="relative z-50 w-full min-w-95-93 transition-transform duration-700">
      <div className='flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className="w-full flex justify-center bg-dark-gray-400 py-24">
          <div className="w-4/5 flex flex-col justify-between">
            <Title className="dark">VERIFICAR CUENTA</Title>

            <div>
              {messages.notVerified ? <Alert key={'notVerified'} variant='errorBg' className='text-center'>{messages.notVerified}</Alert> : null}
              {messages.error ? <Alert key={'error'} variant='errorBg' className='text-center'>{messages.error}</Alert> : null}
              {messages.success ? <Alert key={'success'} variant='successBg' className='text-center'>{messages.success}</Alert> : null}
              {messages.animated ? <Alert key={'animated'} variant='successBg' className='text-center mt-8 animate-bounce'>{messages.animated}</Alert> : null}
              {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center mt-4">Tiempo restante: {countdown} s</Alert> : null}
            </div>

            <div className='flex flex-col items-center'>
              <p className='text-white text-2xl font-semibold mb-4 text-center'>¿No has recibido el correo o el enlace de verificación está expirado?</p>
              <Button
                isLoading={isLoading}
                disabled={isDisabled}
                onClick={handleSubmit}>
                  {isLoading ? "Reenviando..." : "Reenviar correo de verificación"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
