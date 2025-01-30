import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/pages/authLayout.scss';

export default function AuthLayout() {
  return (
    <main className="relative overflow-hidden min-h-screen flex items-center justify-center background">
      {/* Capas translúcidas */}
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-1"></div>
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-2"></div>
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-3"></div>

      {/* Contenedor principal */}
      <div className="min-h-screen w-full flex justify-center items-center p-4">
        <Outlet /> {/* Aquí se renderizan las vistas hijas */}  
      </div>
    </main>
  )
}

AuthLayout.propTypes = {
  // No hay props actualmente, pero se pueden añadir en el futuro
};