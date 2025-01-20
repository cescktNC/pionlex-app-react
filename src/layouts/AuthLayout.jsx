import { Outlet } from 'react-router-dom';
import '../styles/layouts/authLayout.scss';

export default function AuthLayout() {
  return (
    <main className="relative overflow-hidden flex justify-center background">
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-1"></div>
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-2"></div>
      <div className="absolute w-full h-full bg-white opacity-25 translucent-layer-3"></div>

      <Outlet /> {/* Aquí se renderizan las vistas hijas */}  
    </main>
  )
}
