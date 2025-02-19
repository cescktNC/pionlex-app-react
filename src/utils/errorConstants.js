// Definición de constantes para el manejo de errores en la aplicación.
export const passwordMinLength = 8;
export const stringMaxLength = 255;

// Definición de las etiquetas de los campos del formulario.
export const fieldLabels = {
  officeLawName: 'Nombre Despacho',
  nif: 'NIF',
  invitationCode: 'Código de Invitación',
  name: 'Nombre',
  lastname: 'Apellidos',
  email: 'Email',
  password: 'Contraseña',
  password_confirmation: 'Repetir Contraseña',
  phoneNumber: 'Teléfono',
  city: 'Población',
  registrationDate: 'Fecha de Alta',
};

// Definición de los mensajes de error para los campos del formulario.
export const formErrorMessages = {
  required: 'El campo :field es requerido.',
  format: 'El formato del :field no es válido.',
  min: 'El campo :field debe tener al menos :min caracteres.',
  max: 'El campo :field debe ser menor que :max caracteres.',
  confirmed: 'El campo de confirmación de :field no coincide.',
  // phoneNumber: 'El formato del :field no es válido.',
};

// Definición de los mensajes de error para el backend.
export const backendErrorMessages = {
  422: 'Algunos campos no cumplen con los requisitos.',
  429: 'Demasiados intentos. Espera un momento y vuelve a intentarlo.',
  401: 'Tu sesión ha expirado. Inicia sesión para continuar.',
  403: 'Acceso denegado. El enlace o la acción no son válidos.',
  default: 'Ocurrió un error inesperado. Inténtalo más tarde.'
};