import PropTypes from 'prop-types';

export default function Logo({ theme, isCollapsed }) {
  const logoSrc = isCollapsed
    ? 'img/collapsed-pionlex-logo.svg'
    : theme === 'dark'
      ? 'img/dark-pionlex-logo.svg'
      : 'img/light-pionlex-logo.svg';

  return (
    <div className="h-24 flex justify-center p-5">
      <img 
        className={isCollapsed ? 'w-6' : ''}
        src={logoSrc}
        alt="Pionlex Logo"
      />
    </div>
  )
}

Logo.propTypes = {
  theme: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
}