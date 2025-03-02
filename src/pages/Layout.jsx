import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Layout() {

  const { user, error } = useAuth({ middleware: 'auth' });

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen'>
      <Sidebar 
        icons={Icons} 
        className={isCollapsed ? "w-[5rem]" : "w-[30rem]"} 
        isCollapsed={isCollapsed}
        />
      
      <div className='flex-1'>
        <Navbar 
          icons={Icons}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          />

        <Outlet /> {/* Aquí se renderizan las vistas hijas */}
      </div>
    </div>
  )
}
