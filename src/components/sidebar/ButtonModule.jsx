import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from "prop-types";
import SubModule from "./SubModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/components/sidebar/buttonModule.scss';

export default function ButtonModule({ 
  onClick, 
  icon, 
  name, 
  className, 
  isCollapsed, 
  submodules, 
  icons, 
  moduleId, 
  activeModuleId, 
  setActiveModuleId, 
  showSubmenuIndex,
  setExpandedModuleId,
}) {

  const buttonRef = useRef(null);
  const [modulePositionTop, setModulePositionTop] = useState(0);

  useEffect(() => {
    if (isCollapsed && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect(); // Devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización
      setModulePositionTop(buttonRect.top); // Devuelve la distancia de un elemento al borde superior de la ventana de visualización
    }
  }, [isCollapsed]);

  return (
    <div className="button-module-container">

      <button 
        ref={buttonRef}
        type="button" 
        onClick={onClick}
        className={`w-full h-[4.8rem] flex items-center gap-2 px-[1.6rem]
                  font-bold text-[1.7rem] text-charcoal-950 dark:text-charcoal-50 
                  dark:hover:text-charcoal-950 hover:bg-charcoal-300 
                  cursor-pointer button-module ${className}`}>	
          <FontAwesomeIcon icon={icon} className="w-12 text-[1.7rem] text-charcoal-950 dark:text-charcoal-50" />
          {!isCollapsed && <span>{name}</span>}
      </button>

      {isCollapsed && (
        <div
          className={`fixed left-[5rem] top-0 min-w-[27rem] h-[4.8rem] opacity-0 flex flex-col justify-center p-5
                   font-bold text-[1.7rem] text-charcoal-950
                   bg-charcoal-300 
                   ${showSubmenuIndex === moduleId && submodules ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                   whitespace-nowrap collapsed-module`}
          style={{ top: `${modulePositionTop}px` }}
        >
          <span>{name}</span>

          <div
            className='fixed min-w-[27rem] left-[5rem] top-0 dark:bg-charcoal-950 shadow-md collapsed-submodule'
            style={{ top: `${modulePositionTop + 48}px` }}
          >
            {submodules && submodules.length > 0 && (
              submodules.map(submodule => (
                <SubModule
                  key={submodule.id}
                  moduleId={moduleId}
                  submoduleId={submodule.id.toString()}
                  icon={icons[submodule.icon] || icons[faQuestion]}
                  name={submodule.name}
                  className={activeModuleId === `${moduleId}-${submodule.id}` ? 'active' : ''}
                  setActiveModuleId={setActiveModuleId}
                  setExpandedModuleId={setExpandedModuleId}
                />
              ))
            )}
          </div>

        </div>
      )}

    </div>
  )
}

ButtonModule.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isCollapsed: PropTypes.bool.isRequired,
  submodules: PropTypes.array,
  icons: PropTypes.object,
  moduleId: PropTypes.string,
  activeModuleId: PropTypes.string,
  setActiveModuleId: PropTypes.func,
  showSubmenuIndex: PropTypes.string,
  setExpandedModuleId: PropTypes.func,
}