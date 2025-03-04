import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { Menu, MenuItem, IconButton, Avatar, Divider } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import '../../styles/components/navbar/accountMenu.scss';

export default function AccountMenu( { user } ) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { logout } = useAuth({ middleware: 'auth' });

  const name = user?.name;
  const lastname = user?.lastname;
  const position = user?.position;
  const avatarUrl = 'account_picture/carme_sole_roca.jpg';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ width: 60, height: 60 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        >
        <Avatar 
          src={avatarUrl}
          alt={`${name ?? "Usuario"} ${lastname ?? ""}`}
          sx={{ width: 35, height: 35, fontSize: 18 }}
          >
          {name ? name.charAt(0) : <PersonIcon fontSize="large" />}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: { 
            elevation: 0, 
            sx: { 
              overflow: 'visible',
              filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.32))',
              mt: 1,
              fontFamily: "inherit",
            }, 
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} // Posición del botón que despliega el menú con respecto al menú desplegable.
        transformOrigin={{ horizontal: 'right', vertical: 'top' }} // Posición del menú desplegable con respecto al botón que lo despliega.
      >
        <div className="flex items-center px-6 py-4">
          <Avatar 
            src={avatarUrl}
            alt={`${name ?? "Usuario"} ${lastname ?? ""}`}
            sx={{ width: 60, height: 60, fontSize: 28 }}
            >
            {name ? name.charAt(0) : <PersonIcon fontSize="large" />}
          </Avatar>
          <div className="flex flex-col pl-6 text-gray-900 dark:text-white">
            <span className="text-2xl font-bold">{`${name ?? "Usuario"} ${lastname ?? ""}`}</span>
            <span className="text-xl font-normal">{`${position ?? "Cargo no definido"}`}</span>
          </div>
        </div>
        <Divider />

        <div className="py-4 text-gray-900 dark:text-white">
          <MenuItem onClick={() => console.log("Mi Cuenta")}>
            <ListItemIcon>
              <PersonIcon fontSize="medium" className="text-gray-900 dark:text-white" />
            </ListItemIcon>
            Mi Cuenta
          </MenuItem>
          
          <MenuItem onClick={() => console.log("Configuración")}>
            <ListItemIcon>
              <SettingsIcon fontSize="medium" className="text-gray-900 dark:text-white" />
            </ListItemIcon>
            Configuración
          </MenuItem>
          
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="medium" className="text-gray-900 dark:text-white" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </div>
      </Menu>
    </>
  )
}

AccountMenu.propTypes = {
  user: PropTypes.object,
};