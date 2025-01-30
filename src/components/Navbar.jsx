import { useAuth } from '../hooks/useAuth';
import Button from '../components/forms/Button';

export default function Navbar() {

  const { logout } = useAuth({ middleware: 'auth' });

  return (
    <nav>
      Navbar
      <Button onClick={ logout }>
        Cerrar sesión
      </Button>
    </nav>
  )
}
