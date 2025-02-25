import { createContext, useState, useEffect } from 'react';

// Creamos un contexto para el tema
export const ThemeContext = createContext();

// Creamos el proveedor de tema
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Cambiamos el tema en el DOM y guardamos el tema en localStorage
  useEffect(() => {
    theme === 'dark' 
      ? document.documentElement.classList.add('dark') 
      : document.documentElement.classList.remove('dark');
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // Proporcionamos el contexto con el tema actual y la función para cambiarlo
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}