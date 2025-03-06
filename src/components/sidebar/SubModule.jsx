import { useNavigate } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/components/sidebar/subModule.scss';

export default function SubModule({ 
  moduleId, 
  submoduleId, 
  icon, 
  name, 
  path, 
  className, 
  setActiveModuleId,
  setExpandedModuleId,
}) {
  const navigate = useNavigate(); // Hook de navegación

  const handleClick = () => {
    setActiveModuleId(moduleId + "-" + submoduleId);

    if (setExpandedModuleId) {
      setExpandedModuleId(moduleId);
    }

    navigate(path);
  }

  return (
    <button 
      type="button" 
      onClick={handleClick}
      className={`w-full h-[3.8rem] flex items-center gap-2 px-[1.6rem] 
                 font-medium text-[1.4rem] text-gray-700 dark:text-gray-300 
                 hover:text-white hover:bg-indigo-400
                 cursor-pointer sub-module ${className}`}>
        <FontAwesomeIcon icon={icon} className={`w-12 text-[1.4rem] text-gray-700 dark:text-gray-300 ${className}`} />
        {name}
    </button>
  )
}

SubModule.propTypes = {
  moduleId: PropTypes.string.isRequired,
  submoduleId: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  setActiveModuleId: PropTypes.func.isRequired,
  setExpandedModuleId: PropTypes.func,
}