import { useContext } from "react";
import PropTypes from "prop-types";
import Module from "./sidebar/Module";
import { modules } from "../data/modules";
import { ThemeContext } from "../context/ThemeContext";
import '../styles/components/sidebar/sidebar.scss';

export default function Sidebar({ 
  icons, 
  className, 
  isCollapsed, 
  activeModuleId, 
  setActiveModuleId, 
  showSubmenuIndex, 
  setShowSubmenuIndex,
  expandedModuleId,
  setExpandedModuleId,
}) {

  const { theme } = useContext(ThemeContext);

  return (
    <aside 
      className={
        `h-screen flex flex-col justify-between 
         bg-charcoal-50 dark:bg-charcoal-950 
         border-r-1 border-r-gray-300 
         transition-all duration-300 ${className}`}
    >
      {isCollapsed ? (
          <div className="h-24 flex justify-center p-5">
            <img 
              className="w-6"
              src="img/collapsed-pionlex-logo.svg"
              alt="Pionlex Logo"
            />
          </div>
        ) : (
          <div className="h-24 flex justify-center p-5">
            <img 
              className=""
              src={theme === "dark" ? "img/dark-pionlex-logo.svg" : "img/light-pionlex-logo.svg"}
              alt="Pionlex Logo"
            />
          </div>
        )
      }
      
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

      {!isCollapsed && (
        <footer className="flex justify-evenly items-center text-lg font-bold text-charcoal-950 dark:text-charcoal-50 px-5 py-10">
          <div className="flex flex-col items-end gap-6">
            <p className="leading-0">&copy; 2025 - Pion Lex</p>
            <p className="leading-0">Todos los derechos reservados</p>
          </div>
          <img 
            className="w-30"
            src={theme === "dark" ? "img/dark-footer-pionlex-logo.svg" : "img/light-footer-pionlex-logo.svg"}
            alt="logotipo" />
        </footer>
      )}
    </aside>
  )
}

Sidebar.propTypes = {
  icons: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  activeModuleId: PropTypes.string.isRequired,
  setActiveModuleId: PropTypes.func.isRequired,
  showSubmenuIndex: PropTypes.string.isRequired,
  setShowSubmenuIndex: PropTypes.func.isRequired,
  expandedModuleId: PropTypes.string.isRequired,
  setExpandedModuleId: PropTypes.func.isRequired,
}