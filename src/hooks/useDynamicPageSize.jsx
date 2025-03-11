import { useEffect, useRef, useState } from 'react'

export default function useDynamicPageSize(rowHeight = 60) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const updatePageSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight - titleRef.current.clientHeight - descriptionRef.current.clientHeight - buttonRef.current.clientHeight - 20; // Altura del contenedor
        const numberOfRows = Math.floor(containerHeight / rowHeight); // Número de filas que caben en el contenedor
        setPageSize(numberOfRows);
      }
    };

    // Observador de cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(updatePageSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Limpiar observador al desmontar el componente
    return () => resizeObserver.disconnect();
  }, [rowHeight]);

  return { containerRef, titleRef, descriptionRef, buttonRef, pageSize };
}
