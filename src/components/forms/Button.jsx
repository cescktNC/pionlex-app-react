import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Button({
  children,
  type = 'button', 
  className = '', 
  variant = 'primary', 
  rounded = 'full',
  disabled = false, 
  loading = false,
  onClick,
  to
}) {
  
  const variants = {
    primary: 'text-dark-gray-600 bg-pionlex-primary-400 hover:bg-pionlex-primary-600 disabled:hover:bg-pionlex-primary-400',
    secondary: 'text-dark-gray-600 bg-slate-400 hover:bg-slate-500 disabled:hover:bg-slate-400',
    warning: 'text-dark-gray-600 bg-yellow-400 hover:bg-yellow-600 disabled:hover:bg-yellow-400',
  };

  const roundedStyles = {
    full: 'rounded-lg',
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    none: 'rounded-none',
  };

  const buttonContent = (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center
        py-3 px-8 w-fit
        font-semibold text-2xl  
        ${variants[variant]}
        ${roundedStyles[rounded]}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
        cursor-pointer transition-colors duration-300 ease-in-out`}>
        { loading && <CircularProgress className='mr-3' size='1.6rem' sx={{ color: '#000' }} /> }
      { children }
    </button>
  );

  return to ? <Link to={to}>{buttonContent}</Link> : buttonContent;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'warning']),
  rounded: PropTypes.oneOf(['full', 'left', 'right', 'none']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};