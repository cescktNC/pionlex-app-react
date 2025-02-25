import { PropTypes } from "prop-types";
import SubModule from "./SubModule";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/components/accordionModule.scss';

export default function AccordionModule({ icon, name, submodules, icons, idModule, activeIndex, setActiveIndex }) {

  const handleClick = (key) => {
    setActiveIndex(idModule + "-" + key);
  }

  return (
    <Accordion className="!bg-transparent !shadow-none !static !m-0">
      <AccordionSummary expandIcon={<ExpandMoreIcon className="text-charcoal-950 dark:text-charcoal-50" fontSize="large" />}>
        <div className="flex items-center gap-2 font-bold text-[1.7rem] text-charcoal-950 dark:text-charcoal-50 MuiAccordionSummary-content-custom">
          <FontAwesomeIcon icon={icon} className="w-12 text-[1.7rem] text-charcoal-950 dark:text-charcoal-50" />
          {name}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {submodules.map(submodule => (
          <SubModule
            key={submodule.id}
            onClick={() => handleClick(submodule.id)}
            icon={icons[submodule.icon] || icons[faQuestion]}
            name={submodule.name}
            className={activeIndex === idModule + "-" + submodule.id ? 'active' : ''}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

AccordionModule.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  submodules: PropTypes.array.isRequired,
  icons: PropTypes.object.isRequired,
}