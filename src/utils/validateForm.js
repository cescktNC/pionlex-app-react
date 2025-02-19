import { passwordMinLength, stringMaxLength, fieldLabels, formErrorMessages } from './errorConstants';

// Validación de campos obligatorios
const validateRequired = obj => {
  let errors = {};

  Object.keys(obj).forEach( key => {
    if ( obj[key].trim() === '' ) {
      errors[key] = formErrorMessages.required.replace(':field', fieldLabels[key]);
    } else if ( obj[key].length > stringMaxLength ) {
      errors[key] = formErrorMessages.max.replace(':field', fieldLabels[key]).replace(':max', stringMaxLength);
    }
  });

  return errors;
};

// Validación del campo `email` con formato correcto.
const validateEmail = email => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return { email: formErrorMessages.format.replace(':field', fieldLabels.email) };
  }

  if (email.length > stringMaxLength) {
    return { email: formErrorMessages.max.replace(':field', fieldLabels.email).replace(':max', stringMaxLength) };
  }

  return {};
};

// Validación de los campos de contraseña (password y password_confirmation) con longitud mínima y coincidencia.
const validatePassword = obj => {
  let errors = {};

  // Validar longitud mínima de la contraseña
  if ( obj.password &&  obj.password.length < passwordMinLength ) {
    errors = { password: formErrorMessages.min.replace(':field', fieldLabels.password).replace(':min', passwordMinLength) };
  }

  // Validar longitud mínima de la confirmación de la contraseña
  if ( obj.password_confirmation && obj.password_confirmation.length < passwordMinLength ) {
    errors = { ...errors, password_confirmation: formErrorMessages.min.replace(':field', fieldLabels.password_confirmation).replace(':min', passwordMinLength) };
  }

  // Validar si la contraseña y su confirmación coinciden
  if ( obj.password && obj.password_confirmation && obj.password !== obj.password_confirmation ) {
    errors = { ...errors, password: formErrorMessages.confirmed.replace(':field', fieldLabels.password) };
  }

  return errors;
};

// Validación del formulario de login (login form)
export const validateLoginForm = values => {
  let errors = {};

  errors = { ...errors, ...validateRequired(values) };

  if ( !errors.email ) {
    errors = { ...errors, ...validateEmail(values.email) };
  }

  if ( !errors.password ) {
    errors = { ...errors, ...validatePassword({ password: values.password }) };
  }

  return errors;
};

// Validación del formulario de registro (register form)
export const validateRegisterForm = values => {
  let errors = {};

  errors = { ...errors, ...validateRequired(values) };

  if ( !errors.email ) {
    errors = { ...errors, ...validateEmail(values.email) };
  }

  if ( !errors.password ) {
    errors = { ...errors, ...validatePassword({ password: values.password }) };
  }

  if ( !errors.password_confirmation ) {
    errors = { ...errors, ...validatePassword({ password_confirmation: values.password_confirmation }) };
  }

  if ( !errors.password && !errors.password_confirmation ) {
    errors = { ...errors, ...validatePassword(values) };
  }

  return errors;
};

// Validación del formulario de contraseña olvidada (forgot password form)
export const validateForgotPasswordForm = values => {
  let errors = {};

  errors = { ...errors, ...validateRequired(values) };

  if ( !errors.email ) {
    errors = { ...errors, ...validateEmail(values.email) };
  }

  return errors;
};

// Validación del formulario de restablecimiento de contraseña (password reset form)
export const validatePasswordResetForm = values => {
  let errors = {};

  errors = { ...errors, ...validateRequired(values) };

  if ( !errors.password ) {
    errors = { ...errors, ...validatePassword({ password: values.password }) };
  }

  if ( !errors.password_confirmation ) {
    errors = { ...errors, ...validatePassword({ password_confirmation: values.password_confirmation }) };
  }

  if ( !errors.password && !errors.password_confirmation ) {
    errors = { ...errors, ...validatePassword(values) };
  }

  return errors;
};