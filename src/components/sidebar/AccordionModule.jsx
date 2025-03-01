import { PropTypes } from "prop-types";
import SubModule from "./SubModule";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/components/sidebar/accordionModule.scss';

export default function AccordionModule({ 
  onClick,
  icon, 
  name, 
  submodules, 
  icons, 
  moduleId, 
  activeModuleId, 
  setActiveModuleId,
  expandedModuleId,
}) {

  return (
    <Accordion 
      expanded={expandedModuleId === moduleId}
      className={`!bg-transparent !shadow-none !static !m-0 ${activeModuleId.startsWith(moduleId) ? 'module-active' : ''}`}
    >
      <AccordionSummary 
        onClick={onClick}
        expandIcon={
          <ExpandMoreIcon 
            className="text-charcoal-950 dark:text-charcoal-50" 
            fontSize="large" 
          />
        }
      >
        <div className='
          w-full flex items-center gap-2 
          font-bold text-[1.7rem] text-charcoal-950 dark:text-charcoal-50 
          MuiAccordionSummary-content-custom'
        >
          <FontAwesomeIcon icon={icon} className="w-12 text-[1.7rem] text-charcoal-950 dark:text-charcoal-50" />
          {name}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {submodules.map(submodule => (
          <SubModule
            key={submodule.id}
            moduleId={moduleId}
            submoduleId={submodule.id.toString()}
            icon={icons[submodule.icon] || icons[faQuestion]}
            name={submodule.name}
            className={activeModuleId === `${moduleId}-${submodule.id}` ? 'active' : ''}
            setActiveModuleId={setActiveModuleId}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

AccordionModule.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  submodules: PropTypes.array.isRequired,
  icons: PropTypes.object.isRequired,
  moduleId: PropTypes.string.isRequired,
  activeModuleId: PropTypes.string.isRequired,
  setActiveModuleId: PropTypes.func.isRequired,
  expandedModuleId: PropTypes.string.isRequired,
}