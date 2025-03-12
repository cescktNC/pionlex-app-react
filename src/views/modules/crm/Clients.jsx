import { useEffect, useRef, useState } from "react";
import useDynamicPageSize from "../../../hooks/useDynamicPageSize";
import Button from "../../../components/forms/Button";
import Table from "../../../components/tables/Table";
import CheckBox from "../../../components/forms/CheckBox";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { clients } from "../../../data/clients";
import { statuses } from "../../../data/statuses";

const styleStatus = {
  0: 'text-black bg-white dark:text-gray-300 dark:bg-gray-900',
  1: 'text-blue-900 bg-blue-200 dark:text-blue-300 dark:bg-blue-900',
  2: 'text-orange-900 bg-orange-200 dark:text-orange-300 dark:bg-orange-900',
  3: 'text-gray-900 bg-gray-200 dark:text-gray-300 dark:bg-gray-900',
  4: 'text-green-900 bg-green-200 dark:text-green-300 dark:bg-green-900',
  5: 'text-yellow-900 bg-yellow-200 dark:text-yellow-300 dark:bg-yellow-900',
  6: 'text-purple-900 bg-purple-200 dark:text-purple-300 dark:bg-purple-900',
  7: 'text-pink-900 bg-pink-200 dark:text-pink-300 dark:bg-pink-900',
  8: 'text-red-900 bg-red-200 dark:text-red-300 dark:bg-red-900',
  9: 'text-indigo-900 bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900',
  10: 'text-teal-900 bg-teal-200 dark:text-teal-300 dark:bg-teal-900',
}

const getStatusName = (id) => statuses.find(status => status.id === id);

export default function Clients() {
  const checkBoxRefs = useRef({});
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const tableRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);

  const toggleSelectAll = () => {
    const allChecked = checkBoxRefs.current.selectAll.checked;
    setSelectedIds(allChecked ? clients.map(client => client.id) : []);
  };

  const toggleSelectItem = (id) => {
    setSelectedIds(prevSelectedIds => {
      return prevSelectedIds.includes(id) ? prevSelectedIds.filter(selectedId => selectedId !== id) : [...prevSelectedIds, id]
    });
  };

  useEffect(() => {
    if (titleRef.current && descriptionRef.current && buttonRef.current) {
      const titleHeight = titleRef.current.clientHeight;
      const descriptionHeight = descriptionRef.current.clientHeight;
      const buttonHeight = buttonRef.current.clientHeight;
      if (titleHeight && descriptionHeight && buttonHeight)
        setOffsetTop(titleHeight + descriptionHeight + buttonHeight);
    }

    if (tableRef.current) {
      const firstRow = tableRef.current.querySelector('tbody tr');
      if (firstRow) 
        setRowHeight(firstRow.clientHeight);
    }
  }, []);
  
  const { containerRef, pageSize } = useDynamicPageSize({ rowHeight, offsetTop });
  const paginatedClients = clients.slice(0, pageSize); // Filtrar los clientes a mostrar en la tabla

  const columns = [
    {
      key: 'id',
      label: 'Seleccionar',
      align: "center",
      renderHeader: () => (
        <span className="flex justify-center align-center">
          <CheckBox 
            name="selectAll" 
            dataRef={ (el) => checkBoxRefs.current.selectAll = el }
            checked={selectedIds.length === clients.length}
            onChange={toggleSelectAll}
          />
        </span>
      ),
      render: (item) => (
        <span className="flex justify-center align-center">
          <CheckBox 
            name={`selectItem-${item.id}`} 
            dataRef={ (el) => checkBoxRefs.current[item.id] = el }
            checked={selectedIds.includes(item.id)}
            onChange={() => toggleSelectItem(item.id)}
          />
        </span>
      )
    },
    { 
      key: 'name', 
      label: 'Nombre', 
      render: (item) => <span className="font-bold text-nowrap text-gray-900 dark:text-white">{item.name} {item.lastname}</span> 
    },
    { 
      key: 'phoneNumber', 
      label: 'Teléfono', 
      align: "center",
      render: (item) => <span className="block text-center text-nowrap">{item.phoneNumber}</span> 
    },
    { 
      key: 'email', 
      label: 'Email',
      align: "center",
      render: (item) => <span className="block text-center text-nowrap">{item.email}</span>
    },
    { 
      key: 'city', 
      label: 'Población',
      align: "center",
      render: (item) => <span className="block text-center text-nowrap">{item.city}</span>
    },
    { 
      key: 'registrationDate', 
      label: 'Fecha de alta',
      align: "center",
      render: (item) => <span className="block text-center text-nowrap">{item.registrationDate
        .split('-')
        .reverse()
        .join('-')}</span>
    },
    { 
      key: 'status', 
      label: 'Estado',
      align: "center",
      render: (item) => {
        const status = getStatusName(item.status);
        const style = status ? styleStatus[item.status] : styleStatus[0];
        return (
          
          <div className="flex justify-center">
            <span className={`font-bold text-center text-nowrap text-xl px-4 py-1 rounded-lg ${style}`}>{status ? status.name : 'Desconocido'}</span>
          </div>
        )
      }
    },
    {
      key: 'actions',
      label: 'Acciones',
      align: 'center',
      render: () => (
        <div className="flex justify-center p-2">
          <Button variant="indigo" className="mr-2 !size-15">
            <EditIcon fontSize="large" />
          </Button>
          <Button variant="indigo" className="!size-15">
            <DeleteForeverIcon fontSize="large" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="h-full">
      <h1 ref={titleRef} className="font-bold dark:text-white">Clientes</h1>
      <p ref={descriptionRef} className="text-2xl font-medium text-gray-700 dark:text-gray-300 pb-5">Listado de clientes asignados a ti incluyendo su nombre, teléfono, email, población y fecha de alta</p>
      <div ref={buttonRef} className="flex justify-end">
        <Button className="mb-10" variant="indigo">Nuevo Cliente</Button>
      </div>
      <Table ref={tableRef} columns={columns} data={paginatedClients} />
    </div>
  )
}
