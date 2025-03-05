import { useRef } from 'react';
import PropTypes from 'prop-types';
import BarsButton from './navbar/BarsButton';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import ThemeToggle from './navbar/ThemeToggle';
import AccountMenu from './navbar/AccountMenu';

export default function Navbar({ 
  user,
  icons, 
  isCollapsed, 
  setIsCollapsed, 
}) {

  const searchRef = useRef(null); // Referencia al input de búsqueda

  return (
    <nav className='h-28 flex justify-between items-center bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
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

      <div className='h-full flex items-center gap-5 pr-5'>
        <ThemeToggle />
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