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
        className={isCollapsed ? "min-w-[5rem] max-w-[5rem]" : "min-w-[30rem] max-w-[30rem]"} 
        isCollapsed={isCollapsed}
        />
      
      <div className='flex flex-col flex-1 h-screen'>
        <Navbar 
          user={user}
          icons={Icons}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          />

        <main className="flex-1 overflow-y-scroll bg-white dark:bg-gray-800 py-10 px-15">
          <Outlet /> {/* Aquí se renderizan las vistas hijas */}
        </main>
      </div>
    </div>
  )
}
