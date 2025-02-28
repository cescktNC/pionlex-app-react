import { PropTypes } from "prop-types";
import AccordionModule from "./AccordionModule";
import ButtonModule from "./ButtonModule";

export default function Module({ 
  module, 
  moduleId, 
  icons, 
  isCollapsed, 
  activeModuleId, 
  setActiveModuleId, 
  showSubmenuIndex, 
  setShowSubmenuIndex,
  expandedModuleId,
  setExpandedModuleId,
}) {

  const { name, icon, submodules } = module;
  const iconComponent = icons[icon] || icons.faQuestion;

  const handleClick = (moduleId) => {
    if (!isCollapsed || !submodules) {
      setActiveModuleId(moduleId);
    }
    
    if (isCollapsed) {
      if (!submodules) {
        setExpandedModuleId('');
      }

      if (!submodules || showSubmenuIndex === moduleId) {
        setShowSubmenuIndex('');
        return;
      }

      setShowSubmenuIndex(moduleId);
    }
  }

  const handleModuleClick = () => {
    if (expandedModuleId === moduleId) {
      setExpandedModuleId('');
      return;
    }
    setExpandedModuleId(moduleId);
  }

  if (submodules && submodules.length > 0) {
    if (isCollapsed) {
      return (
        <ButtonModule 
          onClick={() => handleClick(moduleId)}
          icon={iconComponent} 
          name={name}
          className={activeModuleId.startsWith(moduleId) ? 'active' : ''}
          isCollapsed={isCollapsed}
          submodules={submodules}
          icons={icons}
          moduleId={moduleId}
          activeModuleId={activeModuleId}
          setActiveModuleId={setActiveModuleId}
          showSubmenuIndex={showSubmenuIndex}
          setExpandedModuleId={setExpandedModuleId}
        />
      )
    }
    
    return (
      <AccordionModule 
        onClick={handleModuleClick}
        icon={iconComponent} 
        name={name} 
        submodules={submodules}
        icons={icons} 
        moduleId={moduleId}
        activeModuleId={activeModuleId}
        setActiveModuleId={setActiveModuleId}
        expandedModuleId={expandedModuleId}
        setExpandedModuleId={setExpandedModuleId}
      />
    )
  }

  return (
    <ButtonModule 
      onClick={() => handleClick(moduleId)}
      icon={iconComponent} 
      name={name}
      className={activeModuleId === moduleId ? 'active' : ''}
      isCollapsed={isCollapsed}
    />
  )
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  moduleId: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  activeModuleId: PropTypes.string.isRequired,
  setActiveModuleId: PropTypes.func.isRequired,
  showSubmenuIndex: PropTypes.string.isRequired,
  setShowSubmenuIndex: PropTypes.func.isRequired,
  expandedModuleId: PropTypes.string.isRequired,
  setExpandedModuleId: PropTypes.func.isRequired,
}