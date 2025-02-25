import { PropTypes } from "prop-types";
import AccordionModule from "./AccordionModule";
import ButtonModule from "./ButtonModule";

export default function Module({ module, icons, activeIndex, setActiveIndex }) {

  const { name, icon, submodules } = module;
  const iconComponent = icons[icon] || icons.faQuestion;

  const handleClick = (moduleId) => {
    setActiveIndex(moduleId);
  }

  if (module.submodules) {
    return (
      <AccordionModule 
        icon={iconComponent} 
        name={name} 
        submodules={submodules}
        icons={icons} 
        idModule={module.id}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    )
  }

  return (
    <ButtonModule 
      onClick={() => handleClick(module.id)}
      icon={iconComponent} 
      name={name}
      className={activeIndex === module.id ? 'active' : ''}
    />
  )
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
}