import { useRef, useState, useEffect } from "react";
import useDynamicPageSize from "../../../hooks/useDynamicPageSize";
import Button from "../../../components/forms/Button";
import Table from "../../../components/tables/Table";
import CheckBox from "../../../components/forms/CheckBox";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { users } from '../../../data/users';
import { law_offices } from "../../../data/law_offices";

const getLawOfficeName = (id) => law_offices.find(law_office => law_office.id === id);

export default function Users() {
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
    setSelectedIds(allChecked ? users.map(user => user.id) : []);
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
  const paginatedUsers = users.slice(0, pageSize); // Filtrar los usuarios a mostrar en la tabla

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
            checked={selectedIds.length === users.length}
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
      align: 'center',
      render: (item) => <span className="block text-center text-nowrap">{item.phoneNumber}</span>
    },
    { 
      key: 'email', 
      label: 'Email',
      align: 'center',
      render: (item) => <span className="block text-center text-nowrap">{item.email}</span>
    },
    { 
      key: 'position', 
      label: 'Posición',
      align: 'center',
      render: (item) => <span className="block text-center text-nowrap">{item.position}</span>
    },
    { 
      key: 'law_office_id', 
      label: 'Oficina',
      align: 'center',
      render: (item) => {
        const law_office = getLawOfficeName(item.law_office_id);
        return <span className="block text-center text-nowrap">{law_office ? law_office.name : 'Desconocida'}</span>
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
      <h1 ref={titleRef} className="font-bold dark:text-white">Usuarios</h1>
      <p ref={descriptionRef} className="text-2xl font-medium text-gray-700 dark:text-gray-300 pb-5">Listado de usuarios incluyendo su nombre, teléfono, email, posición y oficina asignada</p>
      <div ref={buttonRef} className="flex justify-end">
        <Button className="mb-10" variant="indigo">Nuevo Usuario</Button>
      </div>
      <Table ref={tableRef} columns={columns} data={paginatedUsers} />
    </div>
  )
}
