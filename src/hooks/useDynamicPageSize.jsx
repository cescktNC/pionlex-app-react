import { useEffect, useRef, useState } from 'react'

export default function useDynamicPageSize({
  rowHeight = 65,
  offsetTop = 0,
}) {
  const containerRef = useRef(null);

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const updatePageSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight - offsetTop; // Altura del contenedor
        const numberOfRows = Math.floor(containerHeight / rowHeight); // Número de filas que caben en el contenedor
        numberOfRows <= 3 ? setPageSize(1) : setPageSize(numberOfRows - 2); // Actualizar el número de filas a mostrar para dejar espacio para el paginador
      }
    };

    // Observador de cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(updatePageSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Limpiar observador al desmontar el componente
    return () => resizeObserver.disconnect();
  }, [rowHeight]);

  return { containerRef, pageSize };
}
