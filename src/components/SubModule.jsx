import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/components/subModule.scss';

export default function SubModule({ onClick, icon, name, className }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className={`w-full h-[3.8rem] flex items-center gap-2 px-[1.6rem] 
                 font-medium text-[1.4rem] text-charcoal-700 dark:text-charcoal-300 
                 hover:text-charcoal-950 hover:bg-charcoal-300
                 cursor-pointer sub-module ${className}`}>
        <FontAwesomeIcon icon={icon} className={`w-12 text-[1.4rem] text-charcoal-700 dark:text-charcoal-300 ${className}`} />
        {name}
    </button>
  )
}

SubModule.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}