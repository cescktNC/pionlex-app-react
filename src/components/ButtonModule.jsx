import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/components/buttonModule.scss';

export default function ButtonModule({ icon, name }) {
  return (
    <button 
      type="button" 
      className='w-full h-[4.8rem] flex items-center gap-2 px-[1.6rem]
                 font-bold text-[1.7rem] text-charcoal-950 dark:text-charcoal-50 
                 dark:hover:text-charcoal-950 hover:bg-charcoal-300 
                 cursor-pointer button-module'>
        <FontAwesomeIcon icon={icon} className="w-12 text-[1.7rem] text-charcoal-950 dark:text-charcoal-50" />
        {name}
    </button>
  )
}

ButtonModule.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}