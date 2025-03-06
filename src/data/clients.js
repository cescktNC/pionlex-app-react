const clients = [
  {
    id: 1,
    name: "Carlos",
    lastname: "Gómez Fernández",
    phoneNumber: "+34677123456",
    email: "carlos.gomez@example.com",
    city: "Tarragona",
    registrationDate: "2023-05-10",
    status: 1
  },
  {
    id: 2,
    name: "Laura",
    lastname: "Martínez Soler",
    phoneNumber: "+34655987654",
    email: "laura.martinez@example.com",
    city: "Reus",
    registrationDate: "2023-02-15",
    status: 2
  },
  {
    id: 3,
    name: "Jordi",
    lastname: "López Riera",
    phoneNumber: "+34612456789",
    email: "jordi.lopez@example.com",
    city: "Salou",
    registrationDate: "2022-11-05",
    status: 3
  },
  {
    id: 4,
    name: "Marta",
    lastname: "Vila Puig",
    phoneNumber: "+34666321789",
    email: "marta.vila@example.com",
    city: "Valls",
    registrationDate: "2023-08-20",
    status: 4
  },
  {
    id: 5,
    name: "Pere",
    lastname: "Font Rovira",
    phoneNumber: "+34688789123",
    email: "pere.font@example.com",
    city: "Tortosa",
    registrationDate: "2023-01-10",
    status: 5
  },
  {
    id: 6,
    name: "Anna",
    lastname: "Serra Vidal",
    phoneNumber: "+34611987321",
    email: "anna.serra@example.com",
    city: "Amposta",
    registrationDate: "2022-09-22",
    status: 6
  },
  {
    id: 7,
    name: "Joan",
    lastname: "Pérez Gallart",
    phoneNumber: "+34644123789",
    email: "joan.perez@example.com",
    city: "Cambrils",
    registrationDate: "2023-03-18",
    status: 7
  },
  {
    id: 8,
    name: "Núria",
    lastname: "Navarro Prats",
    phoneNumber: "+34622456321",
    email: "nuria.navarro@example.com",
    city: "El Vendrell",
    registrationDate: "2022-07-30",
    status: 8
  },
  {
    id: 9,
    name: "Rosa",
    lastname: "Casals Ferrer",
    phoneNumber: "+34666654987",
    email: "rosa.casals@example.com",
    city: "Montblanc",
    registrationDate: "2023-06-12",
    status: 9
  },
  {
    id: 10,
    name: "Albert",
    lastname: "Pujol Cerdà",
    phoneNumber: "+34677321654",
    email: "albert.pujol@example.com",
    city: "Tarragona",
    registrationDate: "2023-04-25",
    status: 10
  },
  {
    id: 11,
    name: "Sergi",
    lastname: "Aragonés Martí",
    phoneNumber: "+34699123987",
    email: "sergi.aragones@example.com",
    city: "Reus",
    registrationDate: "2023-09-14",
    status: 1
  },
  {
    id: 12,
    name: "Cristina",
    lastname: "Ferrer Bosch",
    phoneNumber: "+34655654321",
    email: "cristina.ferrer@example.com",
    city: "Tarragona",
    registrationDate: "2023-05-30",
    status: 2
  },
  {
    id: 13,
    name: "Eduard",
    lastname: "Vilaseca Baró",
    phoneNumber: "+34622789456",
    email: "eduard.vilaseca@example.com",
    city: "Valls",
    registrationDate: "2023-08-07",
    status: 3
  },
  {
    id: 14,
    name: "Lucía",
    lastname: "Gallego Pérez",
    phoneNumber: "+34611345987",
    email: "lucia.gallego@example.com",
    city: "El Vendrell",
    registrationDate: "2023-04-01",
    status: 4
  },
  {
    id: 15,
    name: "Pol",
    lastname: "Soler Dalmau",
    phoneNumber: "+34666876543",
    email: "pol.soler@example.com",
    city: "Salou",
    registrationDate: "2023-07-13",
    status: 5
  },
  {
    id: 16,
    name: "Eva",
    lastname: "Cabré Llop",
    phoneNumber: "+34644987234",
    email: "eva.cabre@example.com",
    city: "Tortosa",
    registrationDate: "2023-01-19",
    status: 6
  },
  {
    id: 17,
    name: "Oriol",
    lastname: "Esteve Coll",
    phoneNumber: "+34611432789",
    email: "oriol.esteve@example.com",
    city: "Cambrils",
    registrationDate: "2023-03-25",
    status: 7
  },
  {
    id: 18,
    name: "Lidia",
    lastname: "Miró Costa",
    phoneNumber: "+34688654123",
    email: "lidia.miro@example.com",
    city: "Montblanc",
    registrationDate: "2022-09-11",
    status: 8
  },
  {
    id: 19,
    name: "Alejandro",
    lastname: "Blanch Torres",
    phoneNumber: "+34644321789",
    email: "alejandro.blanch@example.com",
    city: "Amposta",
    registrationDate: "2022-12-18",
    status: 9
  },
  {
    id: 20,
    name: "Paula",
    lastname: "Sanz Durán",
    phoneNumber: "+34633456987",
    email: "paula.sanz@example.com",
    city: "Reus",
    registrationDate: "2023-02-06",
    status: 10
  },
  {
    id: 21,
    name: "Marc",
    lastname: "Clavell Serra",
    phoneNumber: "+34655234765",
    email: "marc.clavell@example.com",
    city: "Tarragona",
    registrationDate: "2023-06-20",
    status: 1
  },
  {
    id: 22,
    name: "Ingrid",
    lastname: "Rubio Tormo",
    phoneNumber: "+34699765432",
    email: "ingrid.rubio@example.com",
    city: "Valls",
    registrationDate: "2022-10-10",
    status: 2
  },
  {
    id: 23,
    name: "Raúl",
    lastname: "Vidal Ortiz",
    phoneNumber: "+34688987123",
    email: "raul.vidal@example.com",
    city: "Salou",
    registrationDate: "2022-11-22",
    status: 3
  },
  {
    id: 24,
    name: "Noemí",
    lastname: "Ramírez Mas",
    phoneNumber: "+34611234987",
    email: "noemi.ramirez@example.com",
    city: "Cambrils",
    registrationDate: "2023-09-15",
    status: 4
  },
  {
    id: 25,
    name: "Roger",
    lastname: "Cortés Villalba",
    phoneNumber: "+34622765543",
    email: "roger.cortes@example.com",
    city: "El Vendrell",
    registrationDate: "2023-05-28",
    status: 5
  },
  {
    id: 26,
    name: "Clara",
    lastname: "Pastor Lozano",
    phoneNumber: "+34644876321",
    email: "clara.pastor@example.com",
    city: "Montblanc",
    registrationDate: "2023-03-07",
    status: 6
  },
  {
    id: 27,
    name: "Xavier",
    lastname: "Camps Florit",
    phoneNumber: "+34633765987",
    email: "xavier.camps@example.com",
    city: "Tortosa",
    registrationDate: "2023-07-10",
    status: 7
  },
  {
    id: 28,
    name: "Verónica",
    lastname: "Navarro Sánchez",
    phoneNumber: "+34655765432",
    email: "veronica.navarro@example.com",
    city: "Reus",
    registrationDate: "2023-01-03",
    status: 8
  }
];

export {
  clients
};