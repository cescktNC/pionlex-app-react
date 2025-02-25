import { useContext, useState } from "react";
import Module from "./Module";
import { modules } from "../data/modules";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";
import '../styles/components/sidebar.scss';

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState("3-1");

  return (
    <aside className="w-[30rem] flex h-screen flex-col justify-between bg-charcoal-50 dark:bg-charcoal-950 border-r-1 border-r-gray-300">
      <div className="flex justify-center p-15">
        <img 
          className="w-60"
          src={theme === "dark" ? "img/dark-pionlex-logo.svg" : "img/light-pionlex-logo.svg"}
          alt="Pionlex Logo"
        />
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        {modules.map( module => (
          <Module 
            key={module.id}
            module={module}
            icons={Icons}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>

      <footer className="flex justify-evenly items-center text-lg font-bold text-charcoal-950 dark:text-charcoal-50 px-5 py-10">
        <div className="flex flex-col items-end gap-6">
          <p className="leading-0">&copy; 2025 - Pion Lex</p>
          <p className="leading-0">Todos los derechos reservados</p>
        </div>
        <img 
          className="w-30"
          src={theme === "dark" ? "img/dark-footer-pionlex-logo.svg" : "img/light-footer-pionlex-logo.svg"}
          alt="logotipo" />
      </footer>
    </aside>
  )
}
