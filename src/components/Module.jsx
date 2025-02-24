import { PropTypes } from "prop-types";
import AccordionModule from "./AccordionModule";
import ButtonModule from "./ButtonModule";

export default function Module({ module, icons }) {

  const { name, icon, submodules } = module;
  const iconComponent = icons[icon] || icons.faQuestion;

  if (module.submodules) {
    return (
      <AccordionModule 
        icon={iconComponent} 
        name={name} 
        submodules={submodules}
        icons={icons} 
      />
    )
  }

  return (
    <ButtonModule 
      icon={iconComponent} 
      name={name}
    />
  )
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
}