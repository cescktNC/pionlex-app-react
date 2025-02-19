import PropTypes from 'prop-types';

export default function Alert({ 
  children, 
  variant = "error", 
  className = ''
}) {
  const variants = {
    error: "text-red-400",
    errorBg: "px-4 py-2 bg-red-400 text-white rounded-lg",
    success: "text-green-400",
    successBg: "px-4 py-2 bg-green-700 text-white rounded-lg",
  };

  return (
    <div className={`${variants[variant]} w-full text-xl font-semibold ${className}`}>
      {children}
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['error', 'errorBg', 'success', 'successBg']),
  className: PropTypes.string,
};