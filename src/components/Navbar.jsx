import { useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../components/forms/Button';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar({ 
  icons, 
  isCollapsed, 
  setIsCollapsed, 
}) {

  const { logout } = useAuth({ middleware: 'auth' });
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <nav className='h-24 flex justify-between items-center bg-charcoal-50 dark:bg-charcoal-950 '>
      <button 
        type="button" 
        className="flex justify-center items-center p-5"
        onClick={handleClick}>
        <FontAwesomeIcon icon={icons.faBars} className="w-12 text-[2.5rem] text-charcoal-950 dark:text-charcoal-50 cursor-pointer" />
      </button>

      <div className='flex gap-4'>
        <Button onClick={ toggleTheme }>
          { theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro' }
        </Button>

        <Button onClick={ logout }>
          Cerrar sesión
        </Button>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  icons: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
}