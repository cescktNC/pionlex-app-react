import { useAuth } from '../hooks/useAuth';
import Button from '../components/forms/Button';

export default function Navbar() {

  const { logout } = useAuth({ middleware: 'auth' });

  return (
    <nav>
      Navbar
      <Button
        text="Cerrar sesión"
        onClick={ logout }
      />
    </nav>
  )
}
