import { useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/forms/Button';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {

  const { logout } = useAuth({ middleware: 'auth' });
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className='flex'>
      Navbar

      <Button onClick={ toggleTheme }>
        { theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro' }
      </Button>

      <Button onClick={ logout }>
        Cerrar sesión
      </Button>
    </nav>
  )
}
