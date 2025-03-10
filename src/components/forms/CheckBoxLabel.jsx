import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

export default function CheckBoxLabel({ 
  children, 
  name, 
  className = '',
  dataRef
}) {
  return (
    <label className={`grid grid-cols-[auto_1fr] items-center gap-3 ps-2 ${className}`}>
      <CheckBox name={name} dataRef={dataRef} />
      <span className={`select-none font-medium text-xl text-dark-gray-600 dark:text-light-gray-600 cursor-pointer`}>
        { children }
      </span>
    </label>
  );
}

CheckBoxLabel.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};