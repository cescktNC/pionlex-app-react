import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/components/buttonModule.scss';

export default function ButtonModule({ icon, name, className }) {
  return (
    <button type="button" className={`w-full flex items-center gap-2 font-bold text-[1.7rem] text-charcoal-950 dark:text-charcoal-50 cursor-pointer moduleButton ${className}`}>
      <FontAwesomeIcon icon={icon} className="w-12 text-[1.7rem] text-charcoal-950 dark:text-charcoal-50" />
      {name}
    </button>
  )
}

ButtonModule.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}