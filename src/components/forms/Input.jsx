import PropTypes from 'prop-types';

export default function Input({ 
  type = 'text', 
  className = '', 
  rounded = 'full',
  borderWidth = '2',
  name, 
  placeholder = '', 
  dataRef
}) {

  const roundedStyles = {
    full: 'rounded-lg',
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    none: 'rounded-none',
  };

  const borderStyles = {
    1: 'border border-solid',
    2: 'border-2 border-solid',
    3: 'border-3 border-solid',
    4: 'border-4 border-solid',
  };

  return (
    <input 
      type={type} 
      className={`
        block w-full p-4
        text-2xl font-medium text-dark-gray-600 dark:text-light-gray-600
        border-light-gray-600
        ${roundedStyles[rounded]}
        ${borderStyles[borderWidth]}
        bg-white dark:bg-dark-gray-600
        transition-colors 
        placeholder:text-light-gray-600 dark:placeholder:text-light-gray-600 
        focus:outline-none focus:border-dark-gray-400 focus:dark:border-light-gray-400 duration-300
        ${className}`} 
      name={name} 
      placeholder={placeholder} 
      required 
      autoComplete="off" 
      ref={dataRef}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.oneOf(['full', 'left', 'right', 'none']),
  borderWidth: PropTypes.oneOf(['1', '2', '3', '4']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dataRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};