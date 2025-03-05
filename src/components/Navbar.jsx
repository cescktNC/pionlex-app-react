import { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import BarsButton from './navbar/BarsButton';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import AccountMenu from './navbar/AccountMenu';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar({ 
  user,
  icons, 
  isCollapsed, 
  setIsCollapsed, 
}) {

  const searchRef = useRef(null); // Referencia al input de búsqueda

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className='h-24 flex justify-between items-center bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
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
              variant='indigo'
              rounded='right'
              onClick={() => console.log(searchRef.current.value)}
            >
              Buscar
            </Button>
        </div>
      </div>

      <div className='flex items-center'>
        <Button className='h-13' onClick={ toggleTheme }>
          { theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro' }
        </Button>

        <AccountMenu user={user} />
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  user: PropTypes.object,
  icons: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
}