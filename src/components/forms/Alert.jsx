import PropTypes from 'prop-types';

export default function Alert({ 
  children, 
  variant = "error", 
  className = ''
}) {
  const variants = {
    error: "text-red-400",
    errorBg: "px-4 py-2 bg-red-500 text-white rounded-lg",
    success: "text-green-400",
    successBg: "px-4 py-2 bg-green-500 text-white rounded-lg",
  };

  return (
    <div className={`${variants[variant]} text-2xl font-semibold ${className}`}>
      {children}
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['error', 'errorBg', 'success', 'successBg']),
  className: PropTypes.string,
};