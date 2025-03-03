import { useContext, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import BarsButton from './navbar/BarsButton';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar({ 
  icons, 
  isCollapsed, 
  setIsCollapsed, 
}) {

  const searchRef = useRef(null); // Referencia al input de búsqueda

  const { logout } = useAuth({ middleware: 'auth' });
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className='h-24 flex justify-between items-center bg-charcoal-50 dark:bg-charcoal-950 transition-all duration-300'>
      <div className='flex items-center'>
        <BarsButton 
          icons={icons} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          />

        <div className='flex h-13'>
          <Input
            type='search'
            rounded='left'
            borderWidth='1'
            name='search'
            placeholder='Buscar...'
            dataRef={searchRef}
            />

            <Button
              rounded='right'
              onClick={() => console.log(searchRef.current.value)}
            >
              Buscar
            </Button>
        </div>
      </div>

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