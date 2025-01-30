import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

export default function Button({
  children,
  type = 'button', 
  className = '', 
  variant = 'primary', 
  disabled = false, 
  onClick,
  isLoading = false,
}) {
  const variants = {
    primary: 'text-dark-gray-600 bg-pionlex-primary-400 hover:bg-pionlex-primary-600',
    secondary: 'text-dark-gray-600 bg-slate-400 hover:bg-slate-500',
    warning: 'text-dark-gray-600 bg-yellow-400 hover:bg-yellow-600',
    loading: 'bg-pionlex-primary-400 hover:bg-pionlex-primary-600 text-black cursor-not-allowed opacity-50',
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center
        py-3 px-8 rounded-lg w-fit
        font-semibold text-2xl  
        ${variants[variant]}
        ${className}
        cursor-pointer transition-colors duration-300 ease-in-out`}>
        { isLoading && <CircularProgress className='mr-3' size='1.6rem' sx={{ color: '#000' }} /> }
      { children }
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'warning', 'loading']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};