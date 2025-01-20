import CircularProgress from '@mui/material/CircularProgress';

export default function Button({
  type = "button", 
  text, 
  className, 
  variant = "accept", 
  disabled, 
  onClick,
  isLoading = false,
}) {
  const variants = {
    accept: "text-dark-gray-600 bg-pionlex-primary-400 hover:bg-pionlex-primary-600",
    cancel: "text-white bg-dark-gray-400 hover:bg-dark-gray-600",
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        py-3 px-8 rounded-lg w-fit
        font-semibold text-2xl  
        ${variants[variant]}
        ${className}
        transition-colors`}>
        {isLoading && <CircularProgress className='mr-3' size="1.6rem" sx={{ color: '#232D37' }} />}
        {text}
    </button>
  )
}
