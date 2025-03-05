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
    1: 'outline-1 -outline-offset-1',
    2: 'outline-2 -outline-offset-2',
  };

  return (
    <input 
      type={type} 
      className={`
        block w-full p-4 bg-white dark:bg-gray-800
        text-2xl font-medium text-gray-900 dark:text-white placeholder:text-gray-400
        ${borderStyles[borderWidth]} outline-gray-300 dark:outline-gray-700
        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-indigo-500
        ${roundedStyles[rounded]}
        custom-input
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
  borderWidth: PropTypes.oneOf(['1', '2']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dataRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};