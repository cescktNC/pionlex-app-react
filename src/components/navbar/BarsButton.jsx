import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BarsButton({ icons, isCollapsed, setIsCollapsed }) {

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <button 
      type="button" 
      className="h-full flex justify-center items-center p-6"
      >
      <FontAwesomeIcon 
        onClick={handleClick} 
        icon={icons.faBars} 
        className="w-12 text-[2.5rem] text-charcoal-950 dark:text-charcoal-50 cursor-pointer" 
        />
    </button>
  )
}

BarsButton.propTypes = {
  icons: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
}