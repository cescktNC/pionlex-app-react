const users = [
  [
    {
      id: 1,
      law_office_id: 1,
      name: "Martí",
      lastname: "Martínez Rovira",
      email: "marti.garcia@example.com",
      phone: "+34600123456",
      position: "Derecho Penal"
    },
    {
      id: 2,
      law_office_id: 1,
      name: "Núria",
      lastname: "Martínez Puig",
      email: "nuria.martinez@example.com",
      phone: "+34600234567",
      position: "Derecho Civil"
    },
    {
      id: 3,
      law_office_id: 1,
      name: "Pere",
      lastname: "Fernández Soler",
      email: "pere.fernandez@example.com",
      phone: "+34600345678",
      position: "Derecho Mercantil"
    },
    {
      id: 4,
      law_office_id: 1,
      name: "Anna",
      lastname: "González Roca",
      email: "anna.gonzalez@example.com",
      phone: "+34600456789",
      position: "Derecho Laboral"
    },
    {
      id: 5,
      law_office_id: 1,
      name: "Marc",
      lastname: "López Martínez",
      email: "marc.lopez@example.com",
      phone: "+34600567890",
      position: "Derecho de Familia"
    },
    {
      id: 6,
      law_office_id: 1,
      name: "Clara",
      lastname: "Sánchez Rovira",
      email: "clara.sanchez@example.com",
      phone: "+34600678901",
      position: "Derecho Administrativo"
    },
    {
      id: 7,
      law_office_id: 1,
      name: "Jordi",
      lastname: "Pujol Martínez",
      email: "jordi.pujol@example.com",
      phone: "+34600789012",
      position: "Derecho Inmobiliario"
    },
    {
      id: 8,
      law_office_id: 1,
      name: "Laia",
      lastname: "Fernández Rovira",
      email: "laia.fernandez@example.com",
      phone: "+34600890123",
      position: "Derecho Tributario"
    },
    {
      id: 9,
      law_office_id: 1,
      name: "Arnau",
      lastname: "García Martínez",
      email: "arnau.garcia@example.com",
      phone: "+34600901234",
      position: "Derecho de Sucesiones"
    },
    {
      id: 10,
      law_office_id: 1,
      name: "Carla",
      lastname: "Martínez Rovira",
      email: "carla.martinez@example.com",
      phone: "+34601012345",
      position: "Derecho de Extranjería"
    },
    {
      id: 11,
      law_office_id: 1,
      name: "Pau",
      lastname: "Fernández Martínez",
      email: "pau.fernandez@example.com",
      phone: "+34601123456",
      position: "Derecho de Consumo"
    },
    {
      id: 12,
      law_office_id: 1,
      name: "Júlia",
      lastname: "García Rovira",
      email: "julia.garcia@example.com",
      phone: "+34601234567",
      position: "Derecho de la Competencia"
    },
    {
      id: 13,
      law_office_id: 2,
      name: "Jordi",
      lastname: "López Vidal",
      email: "jordi.sanchez@example.com",
      phone: "+34600567890",
      position: "Derecho Administrativo"
    },
    {
      id: 14,
      law_office_id: 2,
      name: "Laia",
      lastname: "Pujol Roca",
      email: "laia.pujol@example.com",
      phone: "+34600678901",
      position: "Derecho Laboral"
    },
    {
      id: 15,
      law_office_id: 2,
      name: "Carlos",
      lastname: "García López",
      email: "carlos.garcia@example.com",
      phone: "+34600789012",
      position: "Derecho Penal"
    },
    {
      id: 16,
      law_office_id: 2,
      name: "María",
      lastname: "Martínez Ruiz",
      email: "maria.martinez@example.com",
      phone: "+34600890123",
      position: "Derecho Civil"
    },
    {
      id: 17,
      law_office_id: 2,
      name: "David",
      lastname: "Fernández Gómez",
      email: "david.fernandez@example.com",
      phone: "+34600901234",
      position: "Derecho Mercantil"
    },
    {
      id: 18,
      law_office_id: 2,
      name: "Ana",
      lastname: "González Díaz",
      email: "ana.gonzalez@example.com",
      phone: "+34600123456",
      position: "Derecho Internacional"
    },
    {
      id: 19,
      law_office_id: 2,
      name: "José",
      lastname: "Rodríguez Pérez",
      email: "jose.rodriguez@example.com",
      phone: "+34600234567",
      position: "Derecho Tributario"
    },
    {
      id: 20,
      law_office_id: 2,
      name: "Lucía",
      lastname: "Hernández Sánchez",
      email: "lucia.hernandez@example.com",
      phone: "+34600345678",
      position: "Derecho Laboral"
    },
    {
      id: 21,
      law_office_id: 2,
      name: "Manuel",
      lastname: "López García",
      email: "manuel.lopez@example.com",
      phone: "+34600456789",
      position: "Derecho Administrativo"
    },
    {
      id: 22,
      law_office_id: 2,
      name: "Carmen",
      lastname: "Martín Fernández",
      email: "carmen.martin@example.com",
      phone: "+34600567890",
      position: "Derecho Penal"
    },
    {
      id: 23,
      law_office_id: 2,
      name: "Francisco",
      lastname: "Jiménez Ruiz",
      email: "francisco.jimenez@example.com",
      phone: "+34600678901",
      position: "Derecho Civil"
    },
    {
      id: 24,
      law_office_id: 2,
      name: "Laura",
      lastname: "Ruiz López",
      email: "laura.ruiz@example.com",
      phone: "+34600789012",
      position: "Derecho Mercantil"
    },
    {
      id: 25,
      law_office_id: 2,
      name: "Antonio",
      lastname: "Moreno García",
      email: "antonio.moreno@example.com",
      phone: "+34600890123",
      position: "Derecho Internacional"
    },
    {
      id: 26,
      law_office_id: 2,
      name: "Marta",
      lastname: "Álvarez Martínez",
      email: "marta.alvarez@example.com",
      phone: "+34600901234",
      position: "Derecho Tributario"
    },
    {
      id: 27,
      law_office_id: 2,
      name: "Sergio",
      lastname: "Gómez Pérez",
      email: "sergio.gomez@example.com",
      phone: "+34600123456",
      position: "Derecho Administrativo"
    },
    {
      id: 28,
      law_office_id: 3,
      name: "Arnau",
      lastname: "García Ferrer",
      email: "arnau.ruiz@example.com",
      phone: "+34600789012",
      position: "Derecho Penal"
    },
    {
      id: 29,
      law_office_id: 3,
      name: "Isabel",
      lastname: "Santos García",
      email: "isabel.santos@example.com",
      phone: "+34600890123",
      position: "Derecho Civil"
    },
    {
      id: 30,
      law_office_id: 3,
      name: "Pablo",
      lastname: "Vega López",
      email: "pablo.vega@example.com",
      phone: "+34600901234",
      position: "Derecho Mercantil"
    },
    {
      id: 31,
      law_office_id: 3,
      name: "Elena",
      lastname: "Morales Pérez",
      email: "elena.morales@example.com",
      phone: "+34600123456",
      position: "Derecho Internacional"
    },
    {
      id: 32,
      law_office_id: 3,
      name: "Miguel",
      lastname: "Romero Sánchez",
      email: "miguel.romero@example.com",
      phone: "+34600234567",
      position: "Derecho Tributario"
    },
    {
      id: 33,
      law_office_id: 3,
      name: "Sara",
      lastname: "Navarro Gómez",
      email: "sara.navarro@example.com",
      phone: "+34600345678",
      position: "Derecho Laboral"
    },
    {
      id: 34,
      law_office_id: 4,
      name: "Carla",
      lastname: "Hernández Mas",
      email: "carla.torres@example.com",
      phone: "+34600890123",
      position: "Derecho Civil"
    },
  ]
];

export {
  users
};