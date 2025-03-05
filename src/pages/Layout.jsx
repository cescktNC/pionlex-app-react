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
      
      <div className='flex flex-col flex-1 min-h-screen'>
        <Navbar 
          user={user}
          icons={Icons}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          />

        <main className="flex-1 bg-white dark:bg-gray-800 p-6">
          <Outlet /> {/* Aquí se renderizan las vistas hijas */}
        </main>
      </div>
    </div>
  )
}
