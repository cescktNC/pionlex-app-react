import PropTypes from 'prop-types';

export default function CheckBox({ 
  children, 
  name, 
  className = '',
  dataRef
}) {
  return (
    <label className={`grid grid-cols-[auto_1fr] items-center gap-3 ps-2 ${className}`}>
      <input 
        type='checkbox'
        className="
          appearance-none 
          size-6 rounded-md border-2 border-light-gray-600 
          bg-white dark:bg-dark-gray-600 
          accent-dark-gray-600 
          checked:appearance-auto" 
        name={name}
        ref={dataRef} />
      <span className={`select-none font-medium text-xl text-dark-gray-600 dark:text-light-gray-600 cursor-pointer`}>
        { children }
      </span>
    </label>
  );
}

CheckBox.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};