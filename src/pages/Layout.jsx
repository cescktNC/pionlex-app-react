import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Layout() {

  const { user, error } = useAuth({ middleware: 'auth' });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState("3-1");
  const [showSubmenuIndex, setShowSubmenuIndex] = useState(activeModuleId);
  const [expandedModuleId, setExpandedModuleId] = useState(activeModuleId.charAt(0));

  useEffect(() => {
    if (!isCollapsed) {
      setShowSubmenuIndex('');
      setExpandedModuleId(activeModuleId.charAt(0));
    }
  }, [isCollapsed]);

  return (
    <div className='flex min-h-screen'>
      <Sidebar 
        icons={Icons} 
        className={isCollapsed ? "w-[5rem]" : "w-[30rem]"} 
        isCollapsed={isCollapsed}
        activeModuleId={activeModuleId}
        setActiveModuleId={setActiveModuleId}
        showSubmenuIndex={showSubmenuIndex}
        setShowSubmenuIndex={setShowSubmenuIndex}
        expandedModuleId={expandedModuleId}
        setExpandedModuleId={setExpandedModuleId}
        />
      
      <div className='flex-1'>
        <Navbar 
          icons={Icons}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeModuleId={activeModuleId}
          setShowSubmenuIndex={setShowSubmenuIndex}
          setExpandedModuleId={setExpandedModuleId}
          />

        <Outlet /> {/* Aquí se renderizan las vistas hijas */}
      </div>
    </div>
  )
}
