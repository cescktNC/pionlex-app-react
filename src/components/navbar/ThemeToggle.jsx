import { useContext } from "react";
import { ThemeContext } from '../../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={ toggleTheme }
      className='w-15 h-15 flex justify-center items-center p-2 rounded-full bg-transparent cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      { theme === 'dark' ? (
        <LightModeIcon fontSize="large" className="text-white" sx={{ width: 25, height: 25 }} /> 
      ) : (
        <DarkModeIcon fontSize="large" className="text-gray-900" sx={{ width: 25, height: 25 }} /> 
      )}
    </button>
  )
}
