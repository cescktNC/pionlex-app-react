import PropTypes from 'prop-types';

export default function CheckBox({
  name,
  dataRef,
  checked,
  onChange,
}) {
  return (
    <input 
      type='checkbox'
      className="
        appearance-none
        size-6 rounded-md border-2 border-light-gray-600 
        bg-white dark:bg-dark-gray-600 
        accent-dark-gray-600 
        checked:appearance-auto" 
      name={name}
      ref={dataRef}
      checked={checked}
      onChange={onChange}
    />
  )
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  dataRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};