import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import Title from '../components/forms/Title';
import Alert from "../components/forms/Alert";
import Button from '../components/forms/Button';
import cardImage from '/img/card-image-left.jpg';
import '../styles/components/VerificationNotification.scss';

export default function VerificationNotification() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [message, setMessage] = useState("Cuenta no verificada revisa el correo electrónico.");
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [unauthenticated, setUnauthenticated] = useState(false);

  const { resendVerificationEmail } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Cuando hay errores, detener el estado de carga
  useEffect(() => {
    if (errors.emailNotVerified) {
      setMessage(errors.emailNotVerified);
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
          setMessage("Revisa tu bandeja de entrada o inténtalo de nuevo.");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimeOut]);

  const handleSubmit = async () => {
    // Reiniciar estado de errores y activar isLoading
    setErrors({});
    setIsLoading(true);
    resendVerificationEmail(setErrors, setVerificationSent, setIsTimeOut, setUnauthenticated);
  };

  return (
    <div className="min-h-screen flex items-center z-50 min-w-95-93 transition-transform duration-700">
      <div className='w-full flex'>
        <img 
          src={cardImage}
          alt="Pionlex Logo"
        />
        <div className="w-full flex flex-col items-center justify-between bg-dark-gray-400 px-24 py-24">
          <div>
            <Title className="dark pb-20 title">
              VERIFICAR CUENTA
            </Title>

            <Alert 
              key={'emailNotVerified'} 
              variant={verificationSent ? "successBg" : "errorBg"}
              className={`text-center ${unauthenticated ? "animate-bounce" : ""}`}>
                {message}
            </Alert>
          </div>
          
          {isTimeOut ? <Alert key={'countdown'} variant="successBg" className="text-center">Tiempo restante: {countdown} s</Alert> : null}

          <div className='flex flex-col items-center'>
            <p className='text-white text-2xl font-semibold mb-4 text-center'>¿No has recibido el correo?</p>
            <Button
              variant={isLoading || isTimeOut ? "loading" : undefined}
              isLoading={isLoading}
              disabled={isLoading || isTimeOut}
              onClick={handleSubmit}>
                {isLoading ? "Reenviando..." : "REENVIAR VERIFICACIÓN"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
