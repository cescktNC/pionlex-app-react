import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Layout() {

  const { user, error } = useAuth({ middleware: 'auth' });

  return (
    <div className='flex'>
      <Sidebar />
      
      <div className='flex-1'>
        <Navbar />
        <Outlet /> {/* Aquí se renderizan las vistas hijas */}
      </div>
    </div>
  )
}
