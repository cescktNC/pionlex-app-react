import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Module from "./sidebar/Module";
import { modules } from "../data/modules";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./sidebar/Logo";
import Footer from "./sidebar/Footer";
import '../styles/components/sidebar/sidebar.scss';

export default function Sidebar({ 
  icons, 
  className, 
  isCollapsed, 
}) {

  const { theme } = useContext(ThemeContext);

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
    <aside 
      className={
        `h-screen flex flex-col justify-between 
         bg-charcoal-50 dark:bg-charcoal-950 
         border-r-1 border-r-gray-300 
         transition-all duration-300 ${className}`}
    >
      <Logo theme={theme} isCollapsed={isCollapsed} />
      
      <div className="flex-1 overflow-auto min-h-0">
        {modules.map( module => (
          <Module 
            key={module.id}
            module={module}
            moduleId={module.id.toString()}
            icons={icons}
            isCollapsed={isCollapsed}
            activeModuleId={activeModuleId}
            setActiveModuleId={setActiveModuleId}
            showSubmenuIndex={showSubmenuIndex}
            setShowSubmenuIndex={setShowSubmenuIndex}
            expandedModuleId={expandedModuleId}
            setExpandedModuleId={setExpandedModuleId}
          />
        ))}
      </div>

      {!isCollapsed && <Footer theme={theme} />}
    </aside>
  )
}

Sidebar.propTypes = {
  icons: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
}