const modules = [
  {
    id: 1,
    name: "Module 1",
    icon: "faFontAwesome",
    submodules: [
      { id: 1, name: "Opcion 1", icon: "faFileLines", path: "/dashboard" },
      { id: 2, name: "Opcion 2", icon: "faEnvelope", path: "/dashboard" },
    ]
  },
  {
    id: 2,
    name: "Module 2",
    icon: "faFax",
    submodules: [
      { id: 1, name: "Opcion 1", icon: "faAddressBook", path: "/dashboard" },
      { id: 2, name: "Opcion 2", icon: "faFileLines", path: "/dashboard" },
      { id: 3, name: "Opcion 3", icon: "faTriangleExclamation", path: "/dashboard" },
    ]
  },
  {
    id: 3,
    name: "CRM",
    icon: "faGavel",
    submodules: [
      { id: 1, name: "Dashboard", icon: "faChartPie", path: "/dashboard" },
      { id: 2, name: "Clientes", icon: "faAddressBook", path: "/clients" },
      { id: 3, name: "Usuarios", icon: "faUserGroup", path: "/users" },
      { id: 4, name: "Procesos Judiciales", icon: "faScaleBalanced", path: "/judicial-processes" },
      { id: 5, name: "Modelos de Documentos", icon: "faFileLines", path: "/document-templates" },
      { id: 6, name: "Firma Digital", icon: "faFileSignature", path: "/digital-signature" },
      { id: 7, name: "Incidencias", icon: "faTriangleExclamation", path: "/incidents" },
      { id: 8, name: "Emails", icon: "faEnvelope", path: "/emails" },
      { id: 9, name: "Pagos", icon: "faMoneyCheckDollar", path: "/payments" },
    ]
  },
  {
    id: 4,
    name: "Module 4",
    icon: "faCompactDisc",
    path: "/dashboard",
  },
  {
    id: 5,
    name: "Module 5",
    icon: "faAtom",
    submodules: [
      { id: 1, name: "Opcion 1", icon: "faUserGroup", path: "/dashboard" },
      { id: 2, name: "Opcion 2", icon: "faChartPie", path: "/dashboard" },
    ]
  },
  {
    id: 6,
    name: "Module 6",
    icon: "faLocationPin",
    path: "/dashboard",
  },
  {
    id: 7,
    name: "Module 7",
    icon: "faRadiation",
    path: "/dashboard",
  },
  {
    id: 8,
    name: "Module 8",
    icon: "faPrescriptionBottle",
    submodules: [
      { id: 1, name: "Opcion 1", icon: "faFileSignature", path: "/dashboard" },
      { id: 2, name: "Opcion 2", icon: "faMoneyCheckDollar", path: "/dashboard" },
      { id: 3, name: "Opcion 3", icon: "faAddressBook", path: "/dashboard" },
    ]
  },
  {
    id: 9,
    name: "Module 9",
    icon: "faCircleQuestion",
    submodules: [
      { id: 1, name: "Opcion 1", icon: "faScaleBalanced", path: "/dashboard" },
      { id: 2, name: "Opcion 2", icon: "faAddressBook", path: "/dashboard" },
    ]
  }
]

export {
  modules 
}